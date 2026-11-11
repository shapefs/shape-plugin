import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const endpoint = "https://shapefs.app/mcp";
const jsonFiles: string[] = [];
const markdownFiles: string[] = [];

async function visit(directory: string): Promise<void> {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if ([".git", "node_modules", ".scratch"].includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await visit(path);
    else if (entry.isFile() && entry.name.endsWith(".json")) jsonFiles.push(path);
    else if (entry.isFile() && entry.name.endsWith(".md")) markdownFiles.push(path);
  }
}

function requireValue(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function reference(path: unknown, base: string): Promise<void> {
  requireValue(typeof path === "string" && path.length > 0, "Empty package file reference");
  requireValue(!isAbsolute(path) && !path.split("/").includes(".."), `Unsafe file reference: ${path}`);
  const target = resolve(base, path);
  requireValue(!relative(root, target).startsWith(".."), `Reference leaves the repository: ${path}`);
  await stat(target);
}

function checkSecrets(value: unknown, path: string): void {
  if (!value || typeof value !== "object") return;
  for (const [key, entry] of Object.entries(value)) {
    requireValue(!/^(access_token|refresh_token|password|client_secret|clientSecret|apiKey)$/i.test(key), `${path}: credential field ${key} belongs outside the package`);
    requireValue(!(key.toLowerCase() === "authorization" && typeof entry === "string"), `${path}: authorization headers belong outside the package`);
    checkSecrets(entry, path);
  }
}

await visit(root);
for (const path of jsonFiles.sort()) {
  const label = relative(root, path);
  const value = JSON.parse(await readFile(path, "utf8"));
  requireValue(value && typeof value === "object" && !Array.isArray(value), `${label}: expected an object`);
  checkSecrets(value, label);

  if (label.endsWith("plugin.json") || label === "gemini-extension.json") {
    requireValue(typeof value.name === "string" && /^[a-z0-9][a-z0-9-]*$/.test(value.name), `${label}: invalid plugin name`);
    requireValue(typeof value.version === "string" && /^\d+\.\d+\.\d+(?:[-+][a-zA-Z0-9.-]+)?$/.test(value.version), `${label}: invalid version`);
  }

  if (label === ".cursor-plugin/plugin.json") {
    await reference(value.logo, root);
    await reference(value.mcpServers, root);
  }
  if (label === "openai/plugin.json") {
    requireValue(value.description && typeof value.description === "string", `${label}: missing description`);
  }
  if (label === "server.json") {
    requireValue(typeof value.name === "string" && value.name.includes("/"), `${label}: missing registry namespace`);
    requireValue(Array.isArray(value.remotes) && value.remotes.some((remote: { type?: string; url?: string }) => remote.type === "streamable-http" && remote.url === endpoint), `${label}: missing Shape remote endpoint`);
  }

  if (label.endsWith("mcp.json") || label === "gemini-extension.json") {
    const servers = value.mcpServers ?? value.servers;
    requireValue(servers?.shape, `${label}: missing Shape MCP configuration`);
    requireValue((servers.shape.url ?? servers.shape.httpUrl) === endpoint, `${label}: unexpected MCP endpoint`);
  }
}

for (const path of markdownFiles) {
  const text = await readFile(path, "utf8");
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const href = match[1].replace(/^<|>$/g, "");
    if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(href)) continue;
    const target = resolve(dirname(path), decodeURIComponent(href.split("#")[0]));
    requireValue(!relative(root, target).startsWith(".."), `${relative(root, path)}: link leaves the repository`);
    await stat(target);
  }
}

console.log(`Validated ${jsonFiles.length} JSON files, ${markdownFiles.length} Markdown files, package references and credential exclusions.`);
