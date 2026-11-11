# Shape Files for Claude

Shape Files combines Shape's hosted MCP connection with a workflow skill for finding sources, saving precise revisions, organizing project files and handing work back with an original file link.

Publisher: Work In Progress LLC, doing business as Shape FS. The `shapefs` GitHub organization and [shapefs.com](https://shapefs.com) are the same publisher behind the existing [Shape directory connector](https://claude.ai/directory/shape). Shape Files is its workflow plugin.

For Claude Code, add the public marketplace and install the plugin:

```sh
claude plugin marketplace add shapefs/shape-plugin
claude plugin install shape-files@shape-fs
```

Start Claude Code and use `/mcp` to authorize the Shape connection. Complete the browser sign-in, choose your workspace and approve the capabilities you want. No API key is needed. Invoke `/shape-files:shape-files` or ask to work with files in Shape.

You need a Shape account and workspace. The plugin has no local executable, hooks, bundled credentials or application source. File operations use Shape's remote MCP server at `https://shapefs.app/mcp`. Review or revoke the connection from Shape → Connect.

Claude's directory connector and this workflow plugin are separate installable items. Installing from this repository does not establish directory approval.

[Setup](https://shapefs.com/connect) · [Support](https://shapefs.com/support) · [Privacy](https://shapefs.com/privacy) · [Terms](https://shapefs.com/terms)
