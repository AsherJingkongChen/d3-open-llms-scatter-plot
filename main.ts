import {
  appendDocument,
  compileSass,
  createDocument,
  fs,
  minifyHtml,
  readDocumentToString,
} from './src/lib';

// Specifying the parameters

import INPUT_TEXT_HTML from './asset/html/index.html' with { type: 'text' };
import INPUT_TEXT_SASS from './asset/sass/index.sass' with { type: 'text' };

const OUTPUT_DIR = 'dist';
const OUTPUT_FILE_HTML = `${OUTPUT_DIR}/index.html`;

try {
  // Building the HTML document.

  const document = createDocument(INPUT_TEXT_HTML);

  appendDocument(
    document,
    'head',
    `<style>${compileSass(INPUT_TEXT_SASS)}</style>`,
  );

  const outputTextHtml = minifyHtml(readDocumentToString(document));

  // Writing the output files.

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  Bun.write(OUTPUT_FILE_HTML, outputTextHtml);
} catch (error) {
  // Displaying the error at the console.

  if (error instanceof Error) {
    console.error(`${error.name}: ${error.message}`);
  }
}
