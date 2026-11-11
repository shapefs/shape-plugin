# Shape in GitHub Copilot CLI

Install the Shape Files workflow plugin from Shape's public marketplace:

```sh
copilot plugin marketplace add shapefs/shape-plugin
copilot plugin install shape-files@shape-fs
```

The plugin includes the Shape Files skill and the hosted Shape MCP server at `https://shapefs.app/mcp`. Sign in through the client's OAuth flow, choose the intended workspace, and approve the capabilities needed for your task.

Check the installation with `copilot plugin list` and the server configuration with `copilot mcp get shape`. Ask Copilot to identify the connected workspace before working with its files. Review connections and revoke access in Shape's Connect page.

Package installation does not authorize access to a workspace. The plugin is available directly from this repository; inclusion in GitHub's curated plugin collection requires its own review.

[Shape setup](https://shapefs.com/connect) · [Support](https://shapefs.com/support) · [Privacy](https://shapefs.com/privacy) · [Terms](https://shapefs.com/terms)
