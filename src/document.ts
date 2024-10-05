export async function createDocument(html?: string): Promise<Document> {
  return typeof document === 'undefined'
    ? new (await import('jsdom')).JSDOM(html, {
        contentType: 'text/html',
      }).window.document
    : document;
}

export function readDocumentToHtml(document: Document): string {
  return `<!doctype html>\n${document.documentElement.outerHTML}`;
}

export function readDocument(
  document: Document,
  selector: string,
): string {
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
