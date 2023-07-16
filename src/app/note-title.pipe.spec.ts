import { Note } from './note';
import { NoteTitlePipe } from './note-title.pipe';

describe('NoteTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new NoteTitlePipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {

    function callTransform(inMessage: string, expectedMessage: string) {
      return () => {
        const pipe = new NoteTitlePipe();
        const result = pipe.transform(new Note(inMessage, 12));

        expect(result).toBe(expectedMessage);
      }
    }

    it('for not undefined should return empty string', callTransform(undefined as unknown as string, ''));
    it('for white characters should return empty string', callTransform('                \n            ', ''));
    it('for simple case should return the text of the note', callTransform('aasaasasasasa', 'aasaasasasasa'));
    it('for too long text return the trimed', callTransform('123456789012345678901234567890', '12345678901234567890...'));
    it('for new line should be removed before ', callTransform('aasaa\nsasasasa', 'aasaasasasasa'));
  });
});
