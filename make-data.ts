import {
  appendDocument,
  compileMd,
  createDocument,
  fs,
  readDocument,
  readTableElement,
} from './src/lib';

// Specifying the parameters

import OPEN_LLMS_README_MD from './asset/md/open-llms-readme.md' with { type: 'text' };

const OUTPUT_DIR = 'asset/json';
const OUTPUT_FILE_JSON = `${OUTPUT_DIR}/index.json`;

try {
  // Building the JSON file.

  const document = createDocument();
  appendDocument(document, 'body', compileMd(OPEN_LLMS_README_MD));
  const table = readTableElement(
    readDocument<HTMLTableElement>(document, 'table'),
  );
  const output = table.slice(1).map((row) => {
    const modelName = row[0];
    const releaseDate = row[1]
      ? new Date(row[1]).toLocaleDateString('zh-TW')
      : null;
    const parametersTexts = row[4]?.replace(' - ', ', ').split(', ') ?? [];
    const parameters = Number(parametersTexts[parametersTexts.length - 1]);
    return {
      'Model Name': modelName,
      'Release Date': releaseDate,
      'Parameters in Billion': parameters,
    };
  });
  const outputTextJson = JSON.stringify(output, null, 2) + '\n';

  // Writing the output files.

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  Bun.write(OUTPUT_FILE_JSON, outputTextJson);
} catch (error) {
  // Displaying the error at the console.

  if (error instanceof Error) {
    console.error(`${error.name}: ${error.message}`);
  }
}
