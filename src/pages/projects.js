import React, { useState } from 'react';
import styled from 'styled-components';
import {
  HeaderLogo,
  HeadingXL,
  FullLayout,
  SEO,
  Spotlight,
} from '../components';
import { BREAKPOINT } from '../utils/constants';
import 'prismjs/themes/prism-tomorrow.css';

import Project from '../components/Project';
import projectData from '../utils/projects';

const Hero = styled.div`
  margin-bottom: 10vh;
`;

const TextHome = styled.p`
  color: var(--dark-color-light);
  display: block;
  font-size: 22px;
  line-height: 1.6;
  margin-bottom: 10vh;
  margin-left: auto;
  margin-right: auto;
  max-width: 28em;
  text-align: center;

  @media (max-width: ${BREAKPOINT}px) {
    font-size: 19px;
    margin-bottom: 7vh;
  }
`
export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectProject = (index) => {
    if (index === selectedIndex) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <>
      <Spotlight />
      <SEO title="Projects" />
      <HeaderLogo />
      <FullLayout>
        <Hero>
          <HeadingXL>Projects</HeadingXL>
          <TextHome>
            I&lsquo;ve lead projects for tech giants like Netflix to small startups moving at break-neck speed.
            Whether it&lsquo;s React, Vue, Ember, RoR, Elixir or a custom framework, I have worked across the stack.
          </TextHome>
        </Hero>
        {projectData.map((node, index) => (
          <Project node={node} key={index} isSelected={index === selectedIndex} selectProject={() => selectProject(index)} />
        ))}
      </FullLayout>
    </>
  )
};
