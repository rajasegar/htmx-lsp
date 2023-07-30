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
            hoverProvider: true,
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
                kind: node_1.MarkupKind.Markdown,
                value: attr.documentation,
            },
        };
    });
});
function findAttributeDocumentation(attributeName) {
    const attribute = attributes_1.default.find((attr) => attr.name === attributeName);
    return attribute ? attribute.documentation : undefined;
}
function getWordAtPosition(documentText, position) {
    const offset = documentText.indexOf(documentText[documentText.length * position.line + position.character]);
    if (offset === -1) {
        return null;
    }
    let start = offset;
    let end = offset;
    // Move the start index to the beginning of the word
    while (start > 0 && /\w/.test(documentText[start - 1])) {
        start--;
    }
    // Move the end index to the end of the word
    while (end < documentText.length - 1 && /\w/.test(documentText[end + 1])) {
        end++;
    }
    return documentText.substring(start, end + 1);
}
connection.onHover((_textDocumentPosition) => {
    const document = documents.get(_textDocumentPosition.textDocument.uri);
    if (!document) {
        return null;
    }
    const documentText = document.getText();
    const currentWord = getWordAtPosition(documentText, _textDocumentPosition.position);
    if (!currentWord) {
        return null;
    }
    // Check if the current word is a valid HTML attribute
    const isHtmlAttribute = attributes_1.default.some((attr) => attr.name === currentWord);
    if (!isHtmlAttribute) {
        return null;
    }
    // Find the documentation for the current attribute
    const documentation = findAttributeDocumentation(currentWord);
    if (!documentation) {
        return null;
    }
    // Prepare the hover response
    return {
        contents: {
            kind: node_1.MarkupKind.Markdown,
            value: documentation,
        },
        range: {
            start: _textDocumentPosition.position,
            end: node_1.Position.create(_textDocumentPosition.position.line, _textDocumentPosition.position.character + currentWord.length),
        }
    };
});
connection.onCompletionResolve((item) => {
    // If you need to further customize the completion item, you can do it here.
    return item;
});
documents.listen(connection);
connection.listen();
//# sourceMappingURL=server.js.map