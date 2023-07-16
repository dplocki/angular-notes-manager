const inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function makeString(length: number): string {
  return [...Array(length).keys()]
    .map(() => inOptions.charAt(Math.floor(Math.random() * inOptions.length)))
    .join('');
}
