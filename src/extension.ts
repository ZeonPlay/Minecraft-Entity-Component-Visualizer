import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('minecraftEntityVisualizer.open', () => {
    const panel = vscode.window.createWebviewPanel(
      'minecraftEntityVisualizer',
      'Minecraft Entity Visualizer',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'assets'))]
      }
    );

    // Baca index.html dan ganti path agar kompatibel dengan webview
    const htmlPath = vscode.Uri.file(path.join(context.extensionPath, 'index.html'));
    let htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf8');

    // Ganti path relatif agar webview bisa akses file lokal
    const assetsUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'assets')));
    htmlContent = htmlContent.replace('./assets/', assetsUri.toString() + '/');

    panel.webview.html = htmlContent;
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}