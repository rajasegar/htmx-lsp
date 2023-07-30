#!/usr/bin/env node

import {
  createConnection,
  TextDocuments,
  CompletionItem,
  CompletionItemKind,
  TextDocumentSyncKind,
  DidChangeConfigurationNotification,
} from 'vscode-languageserver/node';
import { TextDocument } from "vscode-languageserver-textdocument";
import htmlAttributes from './attributes';


const connection = createConnection(process.stdin, process.stdout);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability: boolean = false;


connection.onInitialize(() => {
  // const capabilities = params.capabilities;

  // Check if the client supports configuration
  // hasConfigurationCapability = capabilities.workspace && !!capabilities.workspace.configuration;

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: true,
      },
    },
  };
});

connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    // Register for all configuration changes.
    connection.client.register(
      DidChangeConfigurationNotification.type,
      undefined
    );
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event) => {
      connection.console.log("Workspace folder change event received.");
    });
  }
});


connection.onCompletion((_textDocumentPosition) => {
  // For simplicity, this example returns the same completion items for all positions.
  return htmlAttributes.map((attr) => {
    return {
      label: attr.name,
      kind: CompletionItemKind.Text,
      data: 1,
      documentation: {
        kind: 'markdown', // 'plaintext' is also supported
        value: attr.documentation,
      },
    } as CompletionItem;
  });
});



connection.onCompletionResolve((item) => {
  // If you need to further customize the completion item, you can do it here.
  return item;
});

documents.listen(connection);
connection.listen();



