import gsap from 'gsap';

function setupCursor() {
  const userAgent = window.navigator.userAgent;

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    return;
  }

  const cursor = document.querySelector('.js-cursor');
  const hoverables = document.querySelectorAll('.js-cursor-target');

  // Move the cursor
  function onMouseMove(e) {
    gsap.to(cursor, {
      duration: 0.3,
      x: e.pageX - 15,
      y: e.pageY - 15,
    });
  }

  // Hover an element
  function onMouseHover(e) {
    gsap.to(cursor, {
      duration: 0,
      x: e.pageX - 15,
      y: e.pageY - 15,
    });

    gsap.to(cursor, {
      duration: 0.3,
      opacity: 1,
      scale: 5,
    });
  }

  function onMouseHoverOut() {
    gsap.to(cursor, {
      duration: 0.1,
      scale: 0,
    });
  }

  if (cursor && hoverables) {
    hoverables.forEach((hov) => {
      hov.addEventListener('mousemove', onMouseMove);
      hov.addEventListener('mouseenter', onMouseHover);
      hov.addEventListener('mouseleave', onMouseHoverOut);
    });
  }
}

export default setupCursor;