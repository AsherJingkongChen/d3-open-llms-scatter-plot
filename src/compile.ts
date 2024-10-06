import * as sass from 'sass';
import { marked } from 'marked';

export function compileSass(text: string): string {
  return sass.compileString(text, { syntax: 'indented' }).css;
}

export function compileMd(text: string): string {
  return marked(text, { async: false, gfm: true });
}
