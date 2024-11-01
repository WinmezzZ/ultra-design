import { createPaletteFromNameValue } from "tints.dev";

export function usePrimaryColor(color?: string) {
  if (!color) return;
  const rgbToHex = (c: string) => c.match(/\d+/g)!.map(x=>(+x).toString(16).padStart(2,'0')).join('')
  const hexColor = color.startsWith('#') ? color.replace('#', '') : rgbToHex(color);
  const output = createPaletteFromNameValue('primary', hexColor);
  return output;
}