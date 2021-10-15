import React, { useEffect, useRef } from "react"
import gsap from 'gsap';
import {Link} from "gatsby"
import styled from "styled-components"
import {
  FixedBar,
  BackButton,
} from "../components"
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
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;

  a {
    padding-right: 20px;
  }
`;

export function HeaderLogo() {
  const logoRef = useRef(null);

  const isOnHome = window?.location?.pathname === '/';

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
      {isOnHome ? <Logo ref={logoRef}>I-S.lol</Logo> : <BackButton />}
      <FlexWrapper>
        <Link className="nav-link" to="/" activeClassName="active-link">
          <span>Blog</span>
        </Link>
        <Link className="nav-link" to="/youtube" activeClassName="active-link">
          <span>YouTube</span>
        </Link>
        <Link className="nav-link" to="/about" activeClassName="active-link">
          <span>About</span>
        </Link>
      </FlexWrapper>
    </HeaderWrapper>
  )
}
