import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import {
  HeaderLogo,
  HeadingXL,
  HeadingL,
  FullLayout,
  SEO,
  TextBody,
  Spotlight,
  Image,
} from '../components';
import { BREAKPOINT } from '../utils/constants';
import 'prismjs/themes/prism-tomorrow.css';

import threadableImage from '../assets/images/projects/threadable.png';
import covidImage from '../assets/images/projects/covid.png';
import allPassImage from '../assets/images/projects/allPass.jpg';
import moveImage from '../assets/images/projects/move.png';
import beaconVideo from '../assets/videos/projects/beacon.mp4';
import pbsVideo from '../assets/videos/projects/pbs.mp4';
import mdaVideo from '../assets/videos/projects/mda.mp4';

const Hero = styled.div`
  margin-bottom: 20vh;

  @media (max-width: ${BREAKPOINT}px) {
    margin-bottom: 15vh;
  }
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  display: block;
  font-size: 22px;
  line-height: 1.6;
  text-align: center;
  text-transform: uppercase;
`;

const ProjectText = styled.p`
  max-width: 45%;
`

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
const Post = styled.div`
  border-bottom: 1px solid lightgray;
  margin-bottom: 50px;

  @media (max-width: ${BREAKPOINT}px) {
    padding-left: 0;
  }
`;

const FlexAroundWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 5px;
  justify-content: space-between;

  @media (max-width: ${BREAKPOINT}px) {
    display: block;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 5px;
  max-width: 500px;
  overflow: hidden;

  img, video {
    width: 100%;
  }
`;

const Project = ({ node, isSelected = false, selectProject }) => {
  return (
    <Post onClick={selectProject} className="js-cursor-target">
      <FlexAroundWrapper>
        <HeadingL>
          {node.title}
        </HeadingL>
        {!isSelected && <MoreButton onClick={selectProject}>More</MoreButton>}
      </FlexAroundWrapper>
      {isSelected && 
        <FlexAroundWrapper>
          <ProjectText dangerouslySetInnerHTML={{ __html: node.description }}></ProjectText>
          <ImageWrapper>
            {node.image ? <img src={node.image} /> : <video src={node.video} autoPlay loop playsInline muted />}
          </ImageWrapper>
        </FlexAroundWrapper>
      }
    </Post>
  )
};

const projectData = [
  {
    title: 'Threadable',
    description: `Threadable began as a branding contract. The new startup us to create a design prototype, but
    after hearing what they were trying to build, I created a simple React Native app to prove out the concept: 
    A social e-reader. They were so wowed, they continued to work with us for 3 more years as we built the native app, 
    backend, conducted user interviews and more.
    <br />
    <br />
    We grew the platform from an idea to an app with more than 6,000 users. When React Native wasn't enough, I wrote features
    in Objective-C and built our e-reader in Swift. We built a scalable backend in Ruby on Rails that serves as the API for the
    native app, web app, and internal admin tool.`,
    image: threadableImage
  },
  {
    title: 'COVID Protocols',
    description: `In early March, just as the outbreak took hold and hospitals around the world started overflowing with 
    patients, the medical community faced a big problem: They didn’t know the best way to treat COVID-19. Best practices 
    changed daily as we learned more about the Novel Coronavirus. And different circumstances called for entirely different 
    approaches.
    <br />
    <br />
    To keep up, doctors needed a reliable source of truth that evolved at the speed of the spread. And they needed it fast. 
    One of the biggest hurdles was that doctors didn't want to learn a CMS. They knew how to work with Google Docs. Using
    the Google Docs APIs, we exported the content to JSON and used that to dynamically built out components in the native app.
    All doctors had to do was click a button in Google Docs -- using a special action we wrote via Google Plugins.`,
    image: covidImage
  },
  {
    title: 'Beacon Passport',
    description: 'this is a thing',
    image: allPassImage
  },
  {
    title: 'PBS NewsHour',
    description: 'News stuff',
    video: pbsVideo
  },
  {
    title: 'Moms Demand Action',
    description: 'MDA Stuff',
    video: mdaVideo
  },
  {
    title: 'Netflix - Prodicle Move',
    link: 'https://variety.com/2018/digital/news/netflix-move-app-production-technology-1202720581/',
    description: 'something <b>something</b>',
    image: moveImage,
  }
];

export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState();

  const selectProject = (index) => {
    setSelectedIndex(index);
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
