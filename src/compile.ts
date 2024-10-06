import * as sass from 'sass';

export function compileSass(text: string): string {
  return sass.compileString(text, { syntax: 'indented' }).css;
}
