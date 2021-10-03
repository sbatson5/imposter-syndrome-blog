import styled from 'styled-components';
import { BREAKPOINT } from '../utils/constants';

export const SecondSquare = styled.div`
  height: 1900px;
  width: 1800px;
  margin-left: -1200px;
  background-color: #6666ff;
  position: absolute;
  transform: rotate(-10deg);
  opacity: 0.3;
  top: 2200px;
  left: 0;
  z-index: -1;

   @media (max-width: ${BREAKPOINT}px) {
    height: 1000px;
    width: 600px;
    margin-left: -300px;
  }
`;
