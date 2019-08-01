// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.supremeGetter",
    function() {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Searching for pubspec.yaml files...🧐"
      );

      vscode.workspace.findFiles("**/*pubspec.yaml").then(files => {
        if (files.length > 0 && vscode.workspace.workspaceFolders[0]) {
          const folderName = vscode.workspace.workspaceFolders[0].name;
          vscode.window.showWarningMessage(
            `Getting the packages for ${files.length}  files...🤓`
          );
          files.forEach(file => {
            let filePath = file.path.split(`${folderName}/`)[1];

            asyncGetPackage(file).then(result => {
              if (result != 0) {
                vscode.window.showWarningMessage(
                  `${filePath}  failed getting the packages 👎`
                );
              }
            });
          });
        } else {
          vscode.window.showErrorMessage(
            "couldn't find any pubspec.yaml file!🤔"
          );
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
async function asyncGetPackage(uri) {
  return await vscode.commands.executeCommand("dart.getPackages", uri);
}
module.exports = {
  activate,
  deactivate
};
