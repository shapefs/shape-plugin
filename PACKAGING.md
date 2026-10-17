# Package layout

The root is the Cursor plugin. The openai/ directory is the source of the OpenAI upload package; its plugin.json is a portable Agent Plugins manifest. Both use Shape's hosted MCP server and OAuth discovery.

To produce the OpenAI ZIP from this repository:

```sh
cd openai
zip -X shape-openai-1.0.0.zip plugin.json mcp.json README.md LICENSE assets/icon.png
```

The archive contains no credentials or application source. The prepared review scenarios require a separately populated demo workspace and real client testing. A walkthrough URL and private reviewer credentials must be supplied before submission. Public repository availability is not marketplace approval.
