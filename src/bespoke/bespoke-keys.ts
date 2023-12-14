export default function(options?: { document?: Document, direction?: 'horizontal' | 'vertical'}) {
    return function(deck) {
      var isHorizontal = options?.direction !== 'vertical';
  
      (options?.document || document).addEventListener('keydown', function(e) {
        if (e.which == 34 || // PAGE DOWN
          (e.which == 32 && !e.shiftKey) || // SPACE WITHOUT SHIFT
          (isHorizontal && e.which == 39) || // RIGHT
          (!isHorizontal && e.which == 40) // DOWN
        ) { deck.next(); }
  
        if (e.which == 33 || // PAGE UP
          (e.which == 32 && e.shiftKey) || // SPACE + SHIFT
          (isHorizontal && e.which == 37) || // LEFT
          (!isHorizontal && e.which == 38) // UP
        ) { deck.prev(); }
      });
    };
  };