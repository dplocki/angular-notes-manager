import { ChangeDetector } from "./change-detector";
import { Note } from "./note";

describe('ChangeDetector', () => {
  it('create an instance', () => {
    const changeDetector = new ChangeDetector();

    expect(changeDetector).toBeTruthy();
  });

  describe('wasChanged', () => {
    it('should return true if Note text is empty', () => {
      const changeDetector = new ChangeDetector();

      changeDetector.setNote(new Note('', 1));

      const result = changeDetector.wasChanged();

      expect(result).toBeTrue();
    });

    it('should return false if Note text did not changed', () => {
      const changeDetector = new ChangeDetector();
      const note = new Note('abc', 1);

      changeDetector.setNote(note);

      note.text = 'abc';

      const result = changeDetector.wasChanged();

      expect(result).toBeFalse();
    });

    it('should return true if Note text changed', () => {
      const changeDetector = new ChangeDetector();
      const note = new Note('', 1);

      changeDetector.setNote(note);
      note.text = 'abc';

      const result = changeDetector.wasChanged();

      expect(result).toBeTrue();
    });
  });

});
