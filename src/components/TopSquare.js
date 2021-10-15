import styled from "styled-components"
import { BREAKPOINT } from "../utils/constants"

export const TopSquare = styled.div`
  height: 1900px;
  width: 0;

  left: 50%;
  transform: translateX(50%);

  background-color: #6666ff;
  position: absolute;

  opacity: 0.3;
  top: 0;
  z-index: -1;

  @media (max-width: ${BREAKPOINT}px) {
    height: 1000px;
    width: 600px;
    margin-right: -400px;
  }
`;
