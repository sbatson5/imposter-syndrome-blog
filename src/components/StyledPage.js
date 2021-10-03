import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { TopSquare, SecondSquare } from '.';

const StyledPage = ({ children }) => {
  const [docHeight, setDocHeight] = useState(0);
  const squareRef = useRef(null);

  const animateSquareIn = () => {
    const element = squareRef.current;
    const layout = document.querySelector('.Layout__Content-knJmYi');

    gsap.to(layout, {
      delay: 0.25,
      duration: 0.75,
      opacity: 1,
    });

    gsap.to(element, {
      duration: 0.1,
      width: '1800px'
    });

    gsap.to(element, {
      duration: 1,
      rotate: '20deg',
      transform: 'translateX(0%)',
    });
  };

  const animateSquareOut = () => {
    const element = squareRef.current;
    const layout = document.querySelector('.Layout__Content-knJmYi');

    gsap.to(element, {
      duration: 0.75,
      transform: 'rotate(0deg)',
      ease: "power2.in"
    });

    gsap.to(element, {
      delay: 0.25,
      duration: 0.75,
      x: -4000,
      ease: "power2.in"
    });

    gsap.to(layout, {
      duration: 0.75,
      opacity: 0,
    });
  }

  const overwriteLink = (e) => {
    console.log(e.target.parentElement);
    e.preventDefault();
    animateSquareOut();

    function iterateToParentAnchor(parent) {
      if (parent.nodeName === 'A') {
        window.location = parent.href;
      } else {
        return iterateToParentAnchor(parent.parentElement);
      }
    }

    setTimeout(() => {
      iterateToParentAnchor(e.target);
    }, 2250)
  };

  const setupLinkOverrides = () => {
    const allLinks = document.querySelectorAll('a');

    allLinks.forEach((link) => {
      link.addEventListener('click', overwriteLink);
    })
  };

  useEffect(() => {
    animateSquareIn();
    setDocHeight(document.body.scrollHeight);
    setupLinkOverrides();
  }, []);

  return (
    <>
      <TopSquare ref={squareRef} />
      {docHeight > 4000 && <SecondSquare />}
      {children}
    </>
  )
};

export default StyledPage;