import {createGlobalStyle} from "styled-components"
import * as font from "../assets/fonts"
import {BREAKPOINT} from "../utils/constants"

export const GlobalStyles = createGlobalStyle`
  :root {
    --accent-color: hsl(339, 100%, 55%);
    --dark-color: hsl(0, 0%, 15%);
    --dark-color-light: hsla(0, 0%, 15%, 0.9);
    --dark-color-lighter: hsla(00, 0%, 15%, 0.7);
    --light-color: hsl(0, 0%, 99%);
    --light-color-translucent: hsla(0, 0%, 99%, 0.92);
    --sides-padding-desktop: 3%;
    --sides-padding-mobile: 5%;
  }

  @font-face {
    font-display: block;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    src: url('${font.InterRegular}') format("woff2");
  }

  @font-face {
    font-display: block;
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    src: url('${font.InterBold}') format("woff2");
  }

  @font-face {
    font-display: block;
    font-family: "IBMPlexMono";
    font-style: normal;
    font-weight: 400;
    src: url('${font.IBMPlexMono400}') format("woff2");
  }

  @font-face {
    font-display: block;
    font-family: "IBMPlexMono";
    font-style: normal;
    font-weight: 700;
    src: url('${font.IBMPlexMono700}') format("woff2");
  }

  body {
    background-color: var(--light-color);
    color: var(--dark-color);
    font-family: 'Inter', sans-serif;
    font-size: 22px;
    font-weight: 400;
    height: 100%;
    padding-top: 20vh;

  @media (max-width: ${BREAKPOINT}px) {
      padding-top: 15vh;
    }
  }

  .cursor {
    pointer-events: none;
  }

  .cursor__ball {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -1;

    circle {
      fill: hsl(240,100%,70%, 0.8);
    }
}

  div a {
    text-decoration: none;
    color: inherit;
    -webkit-tap-highlight-color: hsla(0, 0%, 0%, 0);
    -webkit-tap-highlight-color: transparent;
  }

  h2 {
    font-size: 2em;
    letter-spacing: -1px;
  }

  /* CSS Reset */

  /* Box sizing rules */
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  /* Set core body defaults */
  body {
    line-height: 1.5;
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  blockquote {
    font-style: italic;
    margin: 0;
    padding: 0 40px;
    margin-top: 40px;
    border-left: 2px solid;
    border-color: gray;
  }

  blockquote p {
    font-weight: 600;
  }

  aside {
    color: #888;
    font-size: 80%;
    font-style: italic;
  }

  /* Remove list styles on ul, ol elements with a class attribute */
  ul[class],
  ol[class] {
    list-style: none;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* A elements that don't have a class get default styles */
  .blog-post a:not([class]) {
    text-decoration: underline;
  }

  .blog-post img {
     margin: auto;
    margin-bottom: 50px;
  }

  h1::selection,
  p::selection,
  h2::selection,
  .TextBody-DPQTQ::selection, 
  .TextBody-DPQTQ p::selection, 
  .TextBody-DPQTQ a:not([class])::selection, 
  .TextBody-DPQTQ li::selection {
    background: hsl(240,100%,70%);
    color: #fff;
  }

  .embedVideo-container {
    display: flex;
    justify-content: space-around;
  }

  /* Make images easier to work with */
  img {
    display: block;
    max-width: 100%;
  }

  .arrow-link {
    height: 80px;
    width: 80px;
    padding: 20px;
    border: 2px black solid;
    border-radius: 50%;

    @media (max-width: ${BREAKPOINT}px) {
      padding: 15px;
    }
  }

  /* Natural flow and rhythm in articles by default */
  article > * + * {
    margin-top: 1em;
  }

  /* Inherit fonts for inputs and buttons */
  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`
