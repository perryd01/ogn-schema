import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "helloworld-sample" is now active!'
  );

  const target = vscode.ConfigurationTarget.WorkspaceFolder;
  vscode.workspace.getConfiguration().update("files.associations", {
    "*.ogn": "json",
  });

  const schemaUri = vscode.Uri.file(
    path.join(context.extensionPath, "src", "schema", "ogn.schema.json")
  );
  const schemaContent = fs.readFileSync(schemaUri.fsPath, "utf-8");
  vscode.workspace.registerTextDocumentContentProvider("ogn-schema-extension", {
    provideTextDocumentContent(uri: vscode.Uri): string {
      return schemaContent;
    },
  });
  const ognSchema = {
    fileMatch: ["*.ogn"],
    url: "ogn-schema-extension://ogn.schema.json",
  };
  vscode.workspace
    .getConfiguration("json")
    .update("schemas", [ognSchema], vscode.ConfigurationTarget.Workspace);
}
