import { JSDOM } from 'jsdom';

// Create operations

export function createDocument(html?: string): Document {
  const options = { contentType: 'text/html' };
  const { document } = new JSDOM(html, options).window;
  if (typeof global.document === 'undefined') {
    global.document = document;
  }
  return document;
}

// Read operations

export function readDocument<E extends Element = Element>(
  document: Document,
  selector: string,
): E | undefined {
  return (document.querySelector(selector) as E) ?? undefined;
}

export function readDocumentToString(document: Document): string {
  return `<!DOCTYPE html>${document.documentElement.outerHTML}`;
}

export function readElement<E extends Element = Element>(
  element: Element | undefined,
  selector: string,
): E | undefined {
  return (element?.querySelector(selector) as E) ?? undefined;
}

export function readElementAll<E extends Element = Element>(
  element: Element | undefined,
  selector: string,
): E[] {
  return Array.from(element?.querySelectorAll(selector) ?? []);
}

export function readElementToString(element?: Element): string {
  return element?.outerHTML ?? '';
}

export function readTableElement(table?: HTMLTableElement) {
  return Array.from(table?.rows ?? [], (row) =>
    Array.from(row.cells, (cell) => cell.textContent),
  );
}

// Write operations

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

export function writeElement(
  element: Element | undefined,
  selector: string,
  html: string,
): void {
  element = element?.querySelector(selector) ?? undefined;
  if (element) {
    element.innerHTML = html;
  }
}

// Append operations

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

export function appendElement(
  element: Element | undefined,
  selector: string,
  html: string,
): void {
  element = element?.querySelector(selector) ?? undefined;
  if (element) {
    element.innerHTML += html;
  }
}
