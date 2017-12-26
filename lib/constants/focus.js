export const focus = {
  from: {
    filter: 'blur(2px)',
    webkitTransform: 'translate3d(50%, 50%, 0) scale(1.5)',
    transform: 'translate3d(50%, 50%, 0) scale(1.5)',
    zIndex: -9999,
    opacity: 0,
  },
  to: {
    filter: 'blur(0)',
    webkitTransform: 'translate3d(50%, 50%, 0) scale(1)',
    transform: 'translate3d(50%, 50%, 0) scale(1)',
    zIndex: 9999,
    opacity: 1,
  },
};
