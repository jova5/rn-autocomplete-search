export const hexToRGBA = (hex: string | undefined, alpha: number) => {

  if (hex == undefined) return undefined;

  const hexToRgb = (hex: string) => {

    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `${r}, ${g}, ${b}`;
  };

  return `rgba(${hexToRgb(hex)}, ${alpha})`;
};

export type Data = {
  id: string,
  text: string
}
