# Shape for Cline

Shape's hosted MCP server lets Cline find, read, save and organize files in an authorized Shape workspace. A Shape account and workspace are required. Sign-in uses OAuth; no API key is required or included.

## Connect in the Cline extension

1. Open **MCP Servers → Remote Servers** in Cline.
2. Use **Shape** as the server name and `https://shapefs.app/mcp` as the URL.
3. Select **Streamable HTTP** and add the server.
4. Complete OAuth in the browser. Sign in to Shape, choose your workspace and approve the capabilities Cline needs.

If you use **Configure MCP Servers** to edit the JSON instead, merge this configuration with your existing servers:

```json
{
  "mcpServers": {
    "shape": {
      "type": "streamableHttp",
      "url": "https://shapefs.app/mcp",
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

The same configuration is available in [mcp.json](./mcp.json). Keep tokens and passwords out of configuration files and issue reports.

## Connect in Cline CLI

With Cline CLI installed and a model provider authenticated, run:

```sh
cline mcp add shape https://shapefs.app/mcp --transport http --yes
```

Run `cline mcp`, choose **Authorize OAuth**, and select **shape**. Complete the browser flow by signing in to Shape, choosing your workspace and approving capabilities. Cline's model-provider sign-in and Shape's workspace authorization are separate steps.

## Verify the connection

Ask Cline to list the folders in your Shape workspace. Confirm the workspace name and approved capabilities before requesting changes. Then try finding a brand-guidelines file and summarizing its contents.

Read, Contribute, Organize and recoverable Trash are separate capabilities. Publishing an image needs separate Owner permission. Agents cannot permanently delete files, invite members or change billing. See the [package README](../README.md) for limits and [Shape support](https://shapefs.com/support) for help.
