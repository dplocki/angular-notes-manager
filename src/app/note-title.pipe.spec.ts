import { NoteTitlePipe } from './note-title.pipe';
import { newNote, newString } from './shared/testing/generators';

describe('NoteTitlePipe', () => {

  it('create an instance', () => {
    const pipe = new NoteTitlePipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {

    function callTransform(inMessage: string, expectedMessage: string) {
      const pipe = new NoteTitlePipe();
      const note = newNote().setText(inMessage).make();
      const result = pipe.transform(note);

      expect(result).toBe(expectedMessage);
    }

    it('for not undefined should return empty string', () => callTransform(undefined as unknown as string, ''));

    it('for white characters should return empty string', () => {
      callTransform('                \n            ', '')
    });

    it('for simple case should return the text of the note', () => {
      const lessThan20 = newString(16);
      callTransform(lessThan20, lessThan20)
    });

    it('for too long text return the trimed', () => {
      const part1 = newString(20);
      const part2 = newString(10);

      callTransform(part1 + part2, part1 + '...');
    });

    it('for new line should be removed before ', () => {
      const part1 = newString(7);
      const part2 = newString(6);

      callTransform(`${part1}\n${part2}`, `${part1}${part2}`);
    });

  });

});
