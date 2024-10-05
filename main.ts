import {
  createDocument,
  readDocumentToHtml,
  fs,
  preprocessSassFile,
  minifyHtml,
  appendDocument,
} from './src/lib';

// Specifying the parameters

import INPUT_FILE_HTML from './asset/html/index.html';
import INPUT_FILE_SASS from './asset/sass/index.sass';
const OUTPUT_DIR = 'dist';
const OUTPUT_FILE_HTML = `${OUTPUT_DIR}/index.html`;

try {
  // Building the HTML document.

  const document = await createDocument(await Bun.file(INPUT_FILE_HTML).text());

  appendDocument(
    document,
    'head',
    `<style>${preprocessSassFile(INPUT_FILE_SASS)}</style>`,
  );

  // Writing the output files.

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  Bun.write(OUTPUT_FILE_HTML, minifyHtml(readDocumentToHtml(document)));
} catch (error) {
  // Displaying the error at the console.

  if (error instanceof Error) {
    console.error(`${error.name}: ${error.message}`);
  }
}
