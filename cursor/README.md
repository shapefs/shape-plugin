# Shape for Cursor

Connect Cursor to your Shape workspace through the hosted MCP server at `https://shapefs.app/mcp`. A Shape account and workspace are required. Sign-in uses OAuth; no API key belongs in the configuration.

## Install from this repository

1. Open Cursor's **Customize** view and select **Plugins**.
2. Choose **Add → From GitHub Repository**.
3. Enter `https://github.com/shapefs/shape-plugin` and import the marketplace.
4. Find **shape** in the imported **shape-fs** marketplace and add it.
5. In **Customize → MCPs**, connect the Shape server. Complete the browser sign-in, choose your workspace and approve the capabilities you want Cursor to have.

This repository includes a Cursor marketplace manifest and one Shape plugin. A public repository is installable independently of Cursor Marketplace approval.

## Connect as a custom MCP server

You can also use **Customize → MCPs → New MCP Server** and enter `https://shapefs.app/mcp`, or merge the following entry into your Cursor MCP configuration:

```json
{
  "mcpServers": {
    "shape": {
      "url": "https://shapefs.app/mcp"
    }
  }
}
```

After OAuth, ask Cursor to list the folders in your Shape workspace. Confirm the workspace name before requesting changes. Read, Contribute, Organize and recoverable Trash are separate capabilities. Publishing an image needs separate Owner permission.

See the [package README](../README.md) for supported workflows and limits, or contact [Shape support](https://shapefs.com/support).
