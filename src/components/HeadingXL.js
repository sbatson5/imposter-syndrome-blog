import styled from 'styled-components';
import { BREAKPOINT, MOBILE_BREAKPOINT } from '../utils/constants';

export const HeadingXL = styled.h1`
  color: black;
  display: block;
  font-size: 60px;
  letter-spacing: -2px;
  line-height: 1.2;
  margin: 0 auto 5vh auto;
  text-align: center;
  -webkit-background-clip: text;

  @media (max-width: ${BREAKPOINT}px) {
    font-size: 45px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 30px;
  }
`
