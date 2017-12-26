export const spin = {
  from: {
    webkitTransform: 'translate3d(50%, 50%, 0) rotateZ(540deg) scale(.4)',
    transform: 'translate3d(50%, 50%, 0) rotateZ(540deg) scale(.4)',
    zIndex: -9999,
    opacity: 0,
  },
  to: {
    webkitTransform: 'translate3d(50%, 50%, 0) rotateZ(0) scale(1)',
    transform: 'translate3d(50%, 50%, 0) rotateZ(0) scale(1)',
    zIndex: 9999,
    opacity: 1,
  },
};
