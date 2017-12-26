// @flow
import Tner from './tner';
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

const defaultOpts = {
  type: types.SLIDE_UP,
  right: '50%',
  bottom: '50%',
  transitionTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  transitionDuration: '.2s',
  wallBackgroundColor: 'rgba(0,0,0,.65)'
};

export default class ApocModal {
  constructor(el = null, opts = defaultOpts) {
    if (el === null) {
      throw new Error('Required element');
    }
    this.opts = Object.assign({}, defaultOpts, opts);
    this.handleClose = this.close.bind(this);

    this.wall = new Tner(this.createWall());
    this.wall
      .from({
        zIndex: -9998,
        opacity: 0
      })
      .to({
        zIndex: 9998,
        opacity: 1
      });

    this.el = new Tner(this.initEl(el));
    const type = this.opts.type.replace(/-[a-z]/g, m =>
      m.slice(1).toUpperCase()
    );
    this.el.from(constants[type].from).to(constants[type].to);

    if (typeof this.opts.container === 'undefined') {
      this.opts.container = el.parentElement;
    }

    this.inited = true;
    this.opened = false;
    this.defaultStyle = Object.assign({}, el.style);
  }

  initEl<T: HTMLElement>(el: T): T {
    Object.assign(el.style, {
      display: '',
      position: 'fixed',
      bottom: this.opts.bottom,
      right: this.opts.right,
      webkitTransform: 'translate3d(50%, 50%, 0)',
      transform: 'translate3d(50%, 50%, 0)',
      opacity: 0,

      ...this.transitionDecls
    });
    return el;
  }

  createWall() {
    const wall = document.createElement('div');
    Object.assign(wall.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: this.opts.wallBackgroundColor,
      opacity: 0,
      zIndex: -9998,
      ...this.transitionDecls
    });
    wall.className = 'apoc-modal-wall';
    document.body.appendChild(wall);
    wall.addEventListener('click', this.handleClose);
    wall.addEventListener('transitionend', this.handleTransitionendForWall);
    return wall;
  }

  get transitionDecls() {
    return {
      wabkitTransitionTimingFunction: this.opts.transitionTimingFunction,
      transitionTimingFunction: this.opts.transitionTimingFunction,
      webkitTransitionDuration: this.opts.transitionDuration,
      transitionDuration: this.opts.transitionDuration
    };
  }

  get siblings() {
    const siblings = Array.prototype.slice
      .call(this.opts.container.children)
      .filter(el => el.getAttribute('data-apoc-modal-sibling') !== null);
    if (siblings.length === 0) {
      throw new Error(`
In 'push' or 'lid' type,
Required [data-apoc-modal-sibling] attr to sibling elements`);
    }
    return siblings;
  }

  isOpen() {
    return this.opened;
  }

  open(): Promise<void> {
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
    document.body.removeChild(this.wall.el);

    this.el.teardown();
    this.el.el.style = this.defaultStyle;
  }
}
