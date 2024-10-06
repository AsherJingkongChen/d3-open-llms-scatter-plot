import { JSDOM } from 'jsdom';

export function createDocument(html?: string): Document {
  const doc = new JSDOM(html, {
    contentType: 'text/html',
  }).window.document;
  if (typeof document === 'undefined') {
    global.document = doc;
  }
  return doc;
}

export function readDocumentToHtml(document: Document): string {
  return `<!doctype html>\n${document.documentElement.outerHTML}`;
}

export function readDocument(document: Document, selector: string): string {
  const element = document.querySelector(selector);
  return element ? element.outerHTML : '';
}

export function writeDocument(
  document: Document,
  selector: string,
  html: string,
): void {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = html;
  }
}

export function appendDocument(
  document: Document,
  selector: string,
  html: string,
): void {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML += html;
  }
}
