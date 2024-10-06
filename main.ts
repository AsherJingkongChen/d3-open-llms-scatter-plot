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
const OUTPUT_FILE_SVG = `${OUTPUT_DIR}/index.svg`;

try {
  const document = createDocument(INPUT_TEXT_HTML);

  appendDocument(
    document,
    'head',
    `<style>${compileSass(INPUT_TEXT_SASS)}</style>`,
  );

  const plot = createScatterPlot(INPUT_JSON, {
    x: "LLM's Release Date",
    y: "LLM's Parameters in Billion",
    label: "LLM's Name",
    colorDark: '#222',
    colorLight: '#eee',
    fontFamily: 'Calibri, sans-serif',
  });
  const plotTextSvg = readElementToString(plot);

  const outputTextHtml = minifyHtml(readDocumentToString(document));

  // Writing the output files.

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  Bun.write(OUTPUT_FILE_HTML, outputTextHtml);
  Bun.write(OUTPUT_FILE_SVG, plotTextSvg);
} catch (error) {
  // Displaying the error at the console.

  if (error instanceof Error) {
    console.error(`${error.name}: ${error.message}`);
  }
}
