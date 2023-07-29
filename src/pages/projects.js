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
import mdaImage from '../assets/images/projects/mda.png';
import beaconVideo from '../assets/videos/projects/beacon.mp4';
import pbsVideo from '../assets/videos/projects/pbs.mp4';
import mdaVideo from '../assets/videos/projects/mda.mp4';
import sogVideo from '../assets/videos/projects/sog.mp4';
import covidVideo from '../assets/videos/projects/covid.mp4';

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

  @media (max-width: ${BREAKPOINT}px) {
    max-width: 100%;
  }
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

const MobileImageWrapper = styled.div`
  display: none;

  img, video {
    width: 100%;
  }

  @media (max-width: ${BREAKPOINT}px) {
    display: block;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 500px;
  overflow: hidden;

  img, video {
    width: 100%;
  }

  @media (max-width: ${BREAKPOINT}px) {
    display: none;
  }
`;

{/* <blockquote>
  "Hi all, I’m Mark, a Chief Resident [...]. During the peak of the pandemic in 2020 I was a daily visitor of the
  CovidProtocols website which served as a huge help to myself and my colleges during such a stressful time when
  ‘best practices’ were evolving so rapidly. I really appreciate the amazing work your team provided in helping
  BWH efficiently deliver and disseminate their content."
</blockquote> */}

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
          {node.images[0] && 
            <MobileImageWrapper>
              <img src={node.images[0]} />
            </MobileImageWrapper>
          }

          <ProjectText dangerouslySetInnerHTML={{ __html: node.description }}></ProjectText>

          <ImageWrapper>
            {node.images.map((image) => <img src={image} />)}
            {node.videos.map((video) => <video src={video} autoPlay loop playsInline muted />)}
          </ImageWrapper>

          {node.videos[0] && 
            <MobileImageWrapper>
              <video src={node.videos[0]} autoPlay loop playsInline muted />
            </MobileImageWrapper>
          }
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
    images: [threadableImage],
    videos: []
  },
  {
    title: 'COVID Protocols',
    description: `In early March, just as the outbreak took hold and hospitals around the world started overflowing with 
    patients, the medical community faced a big problem: They didn’t know the best way to treat COVID-19. Best practices 
    changed daily as we learned more about the Novel Coronavirus. And different circumstances called for entirely different 
    approaches.
    <br />
    <br />
    <blockquote>
      There was massive urgency to get quality information out to the people saving lives. Upstatement designed an amazing 
      product with lightning turn around that allowed us to edit with over 100 authors simultaneously.
      <br />
      <br />
      - <strong>Dr. C. Lee Cohen</strong>, Pulmonary and Critical-care Fellow at Brigham and Women’s Hospital
    </blockquote>
    <br />
    <br />
    To keep up, doctors needed a reliable source of truth that evolved at the speed of the spread. And they needed it fast. 
    One of the biggest hurdles was that doctors didn't want to learn a CMS. They knew how to work with Google Docs. Using
    the Google Docs APIs, we exported the content to JSON and used that to dynamically built out components in the native app.
    All doctors had to do was click a button in Google Docs -- using a special action we wrote via Google Plugins.
    <br />
    <br />`,
    images: [covidImage],
    videos: [covidVideo]
  },
  {
    title: 'Beacon Passport',
    description: `Beacon Capital Partners manages high-end office space across the country and is known for giving its 
    tenants best-in-class treatment. So our back-to-work app had to deliver an exceptional product experience — and do it 
    fast. Within a matter of weeks, Upstatement rapidly designed, prototyped, built, tested, and launched Passport, an 
    app that keeps tenants safe while delivering on Beacon's brand promise.
    <br />
    <br />
    <blockquote>
      From start to finish, the team was an absolute pleasure to work with and had a best-in-class product up and running 
      for us in a matter of weeks.
      <br />
      - <strong>Simon Yeo</strong>, Beacon Capital Partners
    </blockquote>
    <br />
    <br />
    This was the company's first React Native project and my second native app. I lead a team of three engineers and one
    designer to create an app that generated QR codes for safety checkpoints and send proximity notifications when a user
    approached their office building.
    `,
    images: [allPassImage],
    videos: [beaconVideo]
  },
  {
    title: 'PBS NewsHour',
    description: 'News stuff',
    images: [],
    videos: [pbsVideo]
  },
  {
    title: 'Moms Demand Action',
    description: 'MDA Stuff',
    images: [mdaImage],
    videos: [mdaVideo]
  },
  {
    title: 'Netflix - Prodicle Move',
    link: 'https://variety.com/2018/digital/news/netflix-move-app-production-technology-1202720581/',
    description: 'something <b>something</b>',
    images: [moveImage],
    videos: []
  },
  {
    title: 'Society of Grownups',
    description: `
    Here is the first paragraph
    <br />
    <br />
    <blockquote>
      Scott is a very thoughtful and deliberate programmer. He only writes very clean code that is easy to read 
      and follow. He writes extensive and meaningful tests, making sure to account for various scenarios. I had 
      the good fortune to pair with Scott on multiple projects in both Ember and Elixir. He was a great teacher 
      as I was learning Ember and was always able to give me a detailed answer and explain things clearly. Scott 
      is always ready to help. He's one of the best people with whom I've had 
      the good fortune to work.
      <br />
      - <strong>Tarin McAdoo Comer</strong>, Senior Fullstack Engineer
    </blockquote>
    <br />
    <br />

    `,
    images: [],
    videos: [sogVideo],
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
