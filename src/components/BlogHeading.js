import styled from "styled-components"
import {BREAKPOINT} from "../utils/constants"

export const BlogHeading = styled.h1`
  display: block;
  font-size: 40px;
  letter-spacing: -1px;
  line-height: 1.2;
  margin-bottom: 2.5vh;

  @media (max-width: ${BREAKPOINT}px) {
    font-size: 25px;
  }
`
