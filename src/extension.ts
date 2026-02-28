import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

let railsTerminal: vscode.Terminal | undefined;

function startRailsServer(workspaceRoot: string) {
  const binRails = path.join(workspaceRoot, "bin", "rails");
  const command = fs.existsSync(binRails)
    ? "bin/rails server"
    : "bundle exec rails server";

  if (railsTerminal && !railsTerminal.exitStatus) {
    railsTerminal.sendText("\x03", false); // send Ctrl+C to stop server
  } else {
    railsTerminal?.dispose();

    const shell = process.env.SHELL || "/bin/zsh";
    railsTerminal = vscode.window.createTerminal({
      name: "Rails Server",
      shellPath: shell,
      shellArgs: ["-li"],
      cwd: workspaceRoot,
    });
  }

  railsTerminal.sendText(command);

  railsTerminal.show();
}

function isRailsProject(workspaceRoot: string): boolean {
  const gemfilePath = path.join(workspaceRoot, "Gemfile");
  if (!fs.existsSync(gemfilePath)) {
    return false;
  }

  const content = fs.readFileSync(gemfilePath, "utf-8");
  return /['"]rails['"]/.test(content);
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.onDidCloseTerminal((t) => {
      if (t === railsTerminal) {
        railsTerminal = undefined;
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("rails-terminal.re-start", () => {
      const folder = vscode.workspace.workspaceFolders?.[0];
      if (!folder) {
        vscode.window.showErrorMessage("No workspace folder open.");
        return;
      }
      startRailsServer(folder.uri.fsPath);
    })
  );

  // Auto-start if this is a Rails project
  const folder = vscode.workspace.workspaceFolders?.[0];
  if (folder && isRailsProject(folder.uri.fsPath)) {
    startRailsServer(folder.uri.fsPath);
  }
}

export function deactivate() {
  railsTerminal = undefined;
}
