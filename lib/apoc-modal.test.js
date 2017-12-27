import {JSDOM} from 'jsdom';
import ApocModal from './apoc-modal';

describe('ApocModal', () => {
  let window;
  let modal;

  beforeEach(() => {
    window = new JSDOM(`<!DOCTYPE html><div id="foo"></div>`).window;
    modal = new ApocModal(window.document.getElementById('foo'), {
      type: ApocModal.types.SLIDE_BOTTOM
    });
  });

  test('types', () => {
    const types = {
      SIMPLE: 'simple',
      SLIDE_UP: 'slide-up',
      SLIDE_RIGHT: 'slide-right',
      SLIDE_BOTTOM: 'slide-bottom',
      SLIDE_LEFT: 'slide-left',
      FOCUS: 'focus',
      PEEK: 'peek',
      FLIP: 'flip',
      FLIP_X: 'flip-x',
      SPIN: 'spin',
      SPIN_REVERSE: 'spin-reverse'
    };

    expect(ApocModal.types).toEqual(types);
  });

  test('opts', () => {
    expect(modal.opts.type).toEqual('slide-bottom');
  });
});
