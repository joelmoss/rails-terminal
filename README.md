# Rails Terminal

A VS Code extension that automatically starts a Rails server in a persistent integrated terminal when you open a Rails project.

## Features

- **Auto-start** — Detects Rails projects (by checking the `Gemfile` for `rails`) and starts the server automatically on workspace open
- **Persistent terminal** — Reuses an existing "Rails Server" terminal if one is already running
- **Smart command selection** — Uses `bin/rails server` when available, falls back to `bundle exec rails server`
- **Manual trigger** — Start the server via the command palette: "Rails Terminal: Start Server"

## Usage

Install the extension and open a Rails project. The server starts automatically.

To start or show the server manually, open the command palette (`Cmd+Shift+P`) and run **Rails Terminal: Start Server**.

## Requirements

- VS Code 1.74.0 or later

## Development

```sh
npm install
npm run compile
```

Use `npm run watch` for continuous compilation during development.

If you always want this extension to be enabled and loaded from the repo, just create a symlink to it in your VS Code extensions directory:

```sh
ln -s /actual/path/to/claude-terminal ~/.vscode/extensions/claude-terminal
```

## License

MIT
