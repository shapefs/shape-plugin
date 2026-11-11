# Package layout

This repository contains client packages and registry metadata for Shape's hosted MCP server. Each package uses `https://shapefs.app/mcp` and OAuth discovery.

| Client or registry | Manifest or configuration |
| --- | --- |
| Cursor | `.cursor-plugin/plugin.json` and `mcp.json` |
| Claude workflow plugin | `claude/.claude-plugin/plugin.json`, `claude/.mcp.json` and `claude/skills/` |
| Claude marketplace | `.claude-plugin/marketplace.json` |
| GitHub Copilot CLI | The `shape-files` plugin from the same Claude marketplace |
| Gemini CLI | `gemini-extension.json` |
| Cline | `cline/mcp.json` |
| Official MCP Registry | `server.json` |
| OpenAI | `openai/plugin.json` and `openai/mcp.json` |

The root client packages share branding and the hosted endpoint. The Claude workflow plugin is a self-contained package under `claude/`; it contains only its manifest, MCP configuration, skill, icon, README and license. Its skill, icon and license match the shared copies. The `openai/` directory is a separate, portable Agent Plugins package with an explicit archive file list.

To produce the OpenAI ZIP from this repository:

```sh
cd openai
zip -X shape-openai-1.0.0.zip plugin.json mcp.json README.md LICENSE assets/icon.png
```

The archive contains no credentials or application source. The prepared review scenarios require a separately populated demo workspace and real client testing. A walkthrough URL and private reviewer credentials must be supplied before submission. Public repository availability is not marketplace approval.

## Validate package files

Run `bun run check` before publishing a change. It parses the JSON files, checks local package references and verifies that MCP configuration uses Shape's endpoint without embedded credentials. Use each client's own validator and perform an installation and OAuth test before claiming compatibility or submitting its listing.
