export const flipX = {
  from: {
    webkitTransform: 'translate3d(50%, 50%, 0) rotateX(90deg)',
    transform: 'translate3d(50%, 50%, 0) rotateX(90deg)',
    zIndex: -9999,
    opacity: 0,
  },
  to: {
    webkitTransform: 'translate3d(50%, 50%, 0) rotateX(0)',
    transform: 'translate3d(50%, 50%, 0) rotateX(0)',
    zIndex: 9999,
    opacity: 1,
  },
};
