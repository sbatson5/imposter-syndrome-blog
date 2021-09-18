import gsap from 'gsap';

function setupCursor() {
  console.log('setting up cursor');
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
    console.log(e);
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

  // Only add listener if on homepage
  if (cursor && hoverables) {
    for (let i = 0; i < hoverables.length; i++) {
      hoverables[i].addEventListener('mousemove', onMouseMove);
      hoverables[i].addEventListener('mouseenter', onMouseHover);
      hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
    }
  }
}

export default setupCursor;