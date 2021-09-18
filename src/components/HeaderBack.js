import React, { useEffect, useRef } from "react"
import gsap from 'gsap';
import {Link} from "gatsby"
import {FixedBar} from "../components"

const transitionDuraction = 0.5;

export function HeaderBack() {
  const linkWrapper = useRef(null);
  const gEl = useRef(null);

  useEffect(() => {
    if (linkWrapper.current) {
      const element = linkWrapper.current;

      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          duration: transitionDuraction,
          backgroundColor: '#6666ff',
          border: '2px #6666ff solid'
        });

        gsap.to(gEl.current, {
          duration: transitionDuraction,
          fill: 'white'
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          duration: transitionDuraction,
          backgroundColor: 'white',
          border: '2px black solid'
        });

        gsap.to(gEl.current, {
          duration: 0.3,
          fill: 'black'
        });
      });
    }
  }, [linkWrapper]);

  return (
    <FixedBar>
      <Link className="arrow-link" to="/" ref={linkWrapper}>
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 408 408" xmlSpace="preserve">
          <g fill="black" ref={gEl}>
            <g id="arrow-back">
              <path d="M408,178.5H96.9L239.7,35.7L204,0L0,204l204,204l35.7-35.7L96.9,229.5H408V178.5z" />
            </g>
          </g>
        </svg>
      </Link>
    </FixedBar>
  )
}
