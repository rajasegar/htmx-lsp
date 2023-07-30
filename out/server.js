#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const attributes_1 = require("./attributes");
const connection = (0, node_1.createConnection)(process.stdin, process.stdout);
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
connection.onInitialize(() => {
    // const capabilities = params.capabilities;
    // Check if the client supports configuration
    // hasConfigurationCapability = capabilities.workspace && !!capabilities.workspace.configuration;
    return {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
            },
        },
    };
});
connection.onInitialized(() => {
    if (hasConfigurationCapability) {
        // Register for all configuration changes.
        connection.client.register(node_1.DidChangeConfigurationNotification.type, undefined);
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders((_event) => {
            connection.console.log("Workspace folder change event received.");
        });
    }
});
connection.onCompletion((_textDocumentPosition) => {
    // For simplicity, this example returns the same completion items for all positions.
    return attributes_1.default.map((attr) => {
        return {
            label: attr.name,
            kind: node_1.CompletionItemKind.Text,
            data: 1,
            documentation: {
                kind: 'markdown',
                value: attr.documentation,
            },
        };
    });
});
connection.onCompletionResolve((item) => {
    // If you need to further customize the completion item, you can do it here.
    return item;
});
documents.listen(connection);
connection.listen();
//# sourceMappingURL=server.js.map