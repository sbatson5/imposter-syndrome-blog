import styled from "styled-components"
import {BREAKPOINT} from "../utils/constants"

export const TextBody = styled.div`
  color: var(--dark-color-light);
  display: block;
  letter-spacing: -0.003em;
  line-height: 1.5;
  margin: 0 5% 3vh 0;

  @media (max-width: ${BREAKPOINT}px) {
    margin: 0 0 3vh 0;
  }
`
