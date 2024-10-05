import * as sass from 'sass';

export function preprocessSassFile(file: string): string {
  return sass.compile(file).css;
}
