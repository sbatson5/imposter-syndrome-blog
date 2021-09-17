import React from "react"
import {Link} from "gatsby"
import styled from "styled-components"
import {FixedBar} from "../components"
import {BREAKPOINT} from "../utils/constants"
import {ArrowBack} from "../assets/icons"

const Icon = styled.img`
  height: 20px;
  max-width: 100%;
  max-height: 100%;
  width: 20px;

  @media (max-width: ${BREAKPOINT}px) {
    height: 15px;
    width: 15px;
  }
`

export function HeaderBack() {
  return (
    <FixedBar>
      <Link className="arrow-link" to="/">
        <Icon src={ArrowBack} alt="Back" />
      </Link>
    </FixedBar>
  )
}
