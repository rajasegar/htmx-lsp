#!/usr/bin/env node

import {
  createConnection,
  TextDocuments,
  CompletionItem,
  CompletionItemKind,
  TextDocumentSyncKind,
  DidChangeConfigurationNotification,
  MarkupKind,
  Position,
  Hover,
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
      hoverProvider: true,
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
        kind: MarkupKind.Markdown, // 'plaintext' is also supported
        value: attr.documentation,
      },
    } as CompletionItem;
  });
});

function findAttributeDocumentation(attributeName: string): string | undefined {
  const attribute = htmlAttributes.find((attr) => attr.name === attributeName);
  return attribute ? attribute.documentation : undefined;
}

function getWordAtPosition(documentText: string, position: Position): string | null {
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
  const isHtmlAttribute = htmlAttributes.some((attr) => attr.name === currentWord);
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
      kind: MarkupKind.Markdown,
      value: documentation,
    },
    range: {
      start: _textDocumentPosition.position,
      end: Position.create(_textDocumentPosition.position.line, _textDocumentPosition.position.character + currentWord.length),
    }
  } as Hover;
});






connection.onCompletionResolve((item) => {
  // If you need to further customize the completion item, you can do it here.
  return item;
});

documents.listen(connection);
connection.listen();



