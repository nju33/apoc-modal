(() => {
  [
    'simple',
    'slide-up',
    'slide-bottom',
    'slide-right',
    'slide-left',
    'focus',
    'flip',
    'flip-x',
    'peek',
    'spin',
    'spin-reverse',
    // 'push',
    // 'lid',
    // 'door',
    // 'waterfall',
    // 'waterfallReverse'
  ].forEach(type => {
    let s;
    if (type === 'slide-up') {
      s = new ApocModal(document.getElementById(type), {
        type,
        bottom: '200px'
      });
    } else {
      s = new ApocModal(document.getElementById(type), {
        type,
      });
    }

    document.getElementById(type + '-trigger').addEventListener('click', () => {
      if (s.isOpen()) {
        s.close();
      } else {
        s.open();
      }
    });
  });
})();
