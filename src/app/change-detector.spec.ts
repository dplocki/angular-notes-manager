import { ChangeDetector } from "./change-detector";
import { makeNote, makeString } from "./shared/testing/generators";

describe('ChangeDetector', () => {

  const makeChangeDetector = () => new ChangeDetector();

  it('create an instance', () => {
    const changeDetector = makeChangeDetector();

    expect(changeDetector).toBeTruthy();
  });

  describe('wasChanged', () => {

    it('should return true if Note text is empty', () => {
      const changeDetector = makeChangeDetector();
      const note = makeNote().setText('').make();

      changeDetector.setNote(note);
      const result = changeDetector.wasChanged();

      expect(result).toBeTrue();
    });

    it('should return false if Note text did not changed', () => {
      const changeDetector = makeChangeDetector();
      const textOfNote = makeString();
      const note = makeNote().setText(textOfNote).make();

      changeDetector.setNote(note);
      note.text = textOfNote;
      const result = changeDetector.wasChanged();

      expect(result).toBeFalse();
    });

    it('should return true if Note text changed', () => {
      const changeDetector = makeChangeDetector();
      const note = makeNote().make();

      changeDetector.setNote(note);
      note.text += makeString();
      const result = changeDetector.wasChanged();

      expect(result).toBeTrue();
    });

  });

});
