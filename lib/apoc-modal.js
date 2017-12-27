// @flow
import Tner from 'tner';
import * as constants from './constants';

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
  SPIN_REVERSE: 'spin-reverse',
};

export interface Options {
  type: $Values<typeof types>,
  right?: string,
  bottom?: string,
  transitionTimingFunction?: string,
  transitionDuration?: string,
  wallBackgroundColor?: string,
}

const defaultOpts: Options = {
  type: types.SLIDE_UP,
  right: '50%',
  bottom: '50%',
  transitionTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  transitionDuration: '.2s',
  wallBackgroundColor: 'rgba(0,0,0,.65)',
};

export default class ApocModal {
  static types = types;
  opts: Options;
  wall: Tner;
  el: Tner;
  inited: boolean;
  opened: boolean;
  defaultStyle: {[prop: string]: string};
  handleClose: () => void;

  constructor(el: HTMLElement | null = null, opts: Options = defaultOpts) {
    if (el === null) {
      throw new Error('Required element');
    }
    // $FlowFixMe
    this.opts = Object.assign({}, defaultOpts, opts);
    this.handleClose = this.close.bind(this);

    this.wall = new Tner(this.createWall());
    this.wall
      .from({
        zIndex: -9998,
        opacity: 0,
      })
      .to({
        zIndex: 9998,
        opacity: 1,
      });

    this.el = new Tner(this.initEl(el));
    const type = this.opts.type.replace(/-[a-z]/g, m =>
      m.slice(1).toUpperCase()
    );
    this.el.from(constants[type].from).to(constants[type].to);

    this.inited = true;
    this.opened = false;
    // $FlowFixMe
    this.defaultStyle = Object.assign({}, el.style);
  }

  initEl<T: HTMLElement>(el: T): T {
    // $FlowFixMe
    Object.assign(el.style, {
      display: '',
      position: 'fixed',
      bottom: this.opts.bottom,
      right: this.opts.right,
      zIndex: '-9999',
      webkitTransform: 'translate3d(50%, 50%, 0)',
      transform: 'translate3d(50%, 50%, 0)',
      opacity: '0',

      ...this.transitionDecls,
    });
    return el;
  }

  createWall() {
    const wall = document.createElement('div');
    // $FlowFixMe
    Object.assign(wall.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: this.opts.wallBackgroundColor,
      opacity: '0',
      zIndex: '-9998',
      ...this.transitionDecls,
    });
    wall.className = 'apoc-modal-wall';

    if (document.body !== null) {
      document.body.appendChild(wall);
    }
    wall.addEventListener('click', this.handleClose);
    return wall;
  }

  get transitionDecls(): any {
    return {
      wabkitTransitionTimingFunction: this.opts.transitionTimingFunction,
      transitionTimingFunction: this.opts.transitionTimingFunction,
      webkitTransitionDuration: this.opts.transitionDuration,
      transitionDuration: this.opts.transitionDuration,
    };
  }

  isOpen() {
    return this.opened;
  }

  open() {
    if (this.isOpen()) {
      return;
    }

    this.opened = true;

    this.wall.process();
    this.el.process();
  }

  close() {
    if (!this.isOpen()) {
      return;
    }

    this.opened = false;

    this.wall.reverse.process();
    this.el.reverse.process();
  }

  teardown() {
    if (this.isOpen()) {
      this.close();
    }

    if (!this.inited) {
      return;
    }

    this.inited = false;

    this.wall.teardown();
    this.wall.el.removeEventListener('click', this.handleClose);

    if (document.body !== null) {
      document.body.removeChild(this.wall.el);
    }

    this.el.teardown();
    this.el.el.style = this.defaultStyle;
  }
}
