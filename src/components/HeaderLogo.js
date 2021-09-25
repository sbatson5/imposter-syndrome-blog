import React, { useEffect, useRef } from "react"
import gsap from 'gsap';
import {Link} from "gatsby"
import styled from "styled-components"
import {FixedBar} from "../components"
import {BREAKPOINT} from "../utils/constants"

const HeaderWrapper = styled(FixedBar)`
  justify-content: space-between;
`

const Logo = styled.p`
  font-size: 32px;
  font-weight: 700;

  @media (max-width: ${BREAKPOINT}px) {
    font-size: 28px;
  }
`

export function HeaderLogo() {
  const logoRef = useRef(null);

  const loopAnimation = () => {
    const element = logoRef.current;
    gsap.to(element, {
      duration: 10,
      color: '#6666ff',
      onComplete: () => {
        gsap.to(element, {
          duration: 10,
          color: '#000',
          onComplete: loopAnimation
        });
      }
    });
  };

  useEffect(() => {
    if (logoRef.current) {
      loopAnimation();
    }
  }, [logoRef.current])

  return (
    <HeaderWrapper>
      <Logo ref={logoRef}>I-S.lol</Logo>
      <div>
        <Link to="/about">
          <p>About</p>
        </Link>
      </div>
    </HeaderWrapper>
  )
}
