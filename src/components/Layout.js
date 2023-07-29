import React from "react"
import styled from "styled-components"
import {Footer, GlobalStyles} from "../components"
import {BREAKPOINT} from "../utils/constants"

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1400px;
  padding: 0 var(--sides-padding-desktop);

  @media (max-width: ${BREAKPOINT}px) {
    padding: 0 var(--sides-padding-mobile);
  }
`;

const FullContent = styled.main`
  margin: 0 auto;

  @media (max-width: ${BREAKPOINT}px) {
    width: 100%;
  }
`;

const Content = styled(FullContent)`
  max-width: 900px;
`;

export function Layout({children}) {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Content>{children}</Content>
        <Footer />
      </Wrapper>
    </>
  )
}

export function FullLayout({children}) {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <FullContent>{children}</FullContent>
        <Footer />
      </Wrapper>
    </>
  )
}
