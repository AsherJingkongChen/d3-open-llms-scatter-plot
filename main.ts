import {
  appendDocument,
  compileSass,
  createDocument,
  createScatterPlot,
  fs,
  minifyHtml,
  readDocumentToString,
  readElementToString,
} from './src/lib';

// Specifying the parameters

import INPUT_TEXT_HTML from './asset/html/index.html' with { type: 'text' };
import INPUT_TEXT_SASS from './asset/sass/index.sass' with { type: 'text' };
import INPUT_JSON from './asset/json/index.json' with { type: 'json' };

const OUTPUT_DIR = 'dist';
const OUTPUT_FILE_HTML = `${OUTPUT_DIR}/index.html`;

try {
  const document = createDocument(INPUT_TEXT_HTML);

  appendDocument(
    document,
    'head',
    `<style>${compileSass(INPUT_TEXT_SASS)}</style>`,
  );

  const scatterPlot = createScatterPlot(INPUT_JSON, {
    label: "LLM's Name",
    x: "LLM's Release Date",
    y: "LLM's Parameters in Billion",
    title: "Open LLM's Parameters in Billion versus Release Date",
    colorDark: '#222',
    colorLight: '#eee',
    fontFamily: 'Calibri, sans-serif',
  });
  appendDocument(
    document,
    '.block-0-1 .plot',
    readElementToString(scatterPlot),
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
