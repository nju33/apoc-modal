// @flow
const delay = (ms: number = 15): Promise<void> => {
  return new Promise(r => setTimeout(r, ms));
}

const instantify = async (el: HTMLElement): (() => Promise<void>) => {
  const defaultTransition: string = getComputedStyle(el).transition;

  await delay();
  Object.assign(el.style, {
    webkitTransition: null,
    transition: null,
  });
  await delay();

  return async () => {
    await delay();
    Object.assign(el.style, {
      webkitTransition: defaultTransition,
      transition: defaultTransition,
    });
    await delay();
  };
}

export default class Tner {
  el: HTMLELement;
  _from: any;
  _to: any;

  constructor(el: HTMLElement) {
    this.el = el;

    this.el.addEventListener('transitionend', this._handleTransitionend);
  }

  _handleTransitionend = () => {
    Object.assign(this.el.style, {
      webkitBackfaceVisibility: '',
      backfaceVisibility: '',
      willChange: '',
    });
  }

  get _optimization() {
    return {
      webkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      willChange: this._willChangeProps.join(', '),
    };
  }

  get _willChangeProps(): string[] {
    return Object.keys(this._from);
  }

  from(from: any): this {
    this._from = from;
    return this;
  }

  to(to: any): this {
    this._to = to;
    return this;
  }

  _delay(ms: number = 0): Promise<void> {
    return delay(ms);
  }

  get reverse() {
    const tner = new Tner(this.el);
    return tner.from(this._to).to(this._from);
  }

  async process(): Promise<void> {
    const pRestore = await instantify(this.el);
    Object.assign(this.el.style, this._optimisation, this._from);
    await pRestore();

    Object.assign(this.el.style, this._optimisation, this._to);
    await this._delay();
  }

  teardown() {
    this.el.removeEventListener('transitionend', this._handleTransitionend);
  }
}
