export const slideLeft = {
  from: {
    webkitTransform: 'translate3d(-30%, 50%, 0)',
    transform: 'translate3d(-30%, 50%, 0)',
    zIndex: -9999,
    opacity: 0,
  },
  to: {
    webkitTransform: 'translate3d(50%, 50%, 0)',
    transform: 'translate3d(50%, 50%, 0)',
    zIndex: 9999,
    opacity: 1,
  },
};
