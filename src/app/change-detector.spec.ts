import { ChangeDetector } from "./change-detector";
import { makeNote, makeString } from "./shared/testing/generators";

describe('ChangeDetector', () => {

  it('create an instance', () => {
    const changeDetector = new ChangeDetector();

    expect(changeDetector).toBeTruthy();
  });

  describe('wasChanged', () => {
    it('should return true if Note text is empty', () => {
      const changeDetector = new ChangeDetector();
      const note = makeNote().setTextGenerator(() => '').make();

      changeDetector.setNote(note);
      const result = changeDetector.wasChanged();

      expect(result).toBeTrue();
    });

    it('should return false if Note text did not changed', () => {
      const textOfNote = makeString();
      const changeDetector = new ChangeDetector();
      const note = makeNote().setTextGenerator(() => textOfNote).make();

      changeDetector.setNote(note);
      note.text = textOfNote;
      const result = changeDetector.wasChanged();

      expect(result).toBeFalse();
    });

    it('should return true if Note text changed', () => {
      const changeDetector = new ChangeDetector();
      const note = makeNote().make();

      changeDetector.setNote(note);
      note.text += makeString();
      const result = changeDetector.wasChanged();

      expect(result).toBeTrue();
    });
  });

});
