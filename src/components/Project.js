import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { HeadingL } from '../components';
import { BREAKPOINT, PROJECT_BREAKPOINT } from '../utils/constants';
import 'prismjs/themes/prism-tomorrow.css';
import gsap from 'gsap';

const SKILL_COLORS_MAP = {
  'React Native': '#4682b4',
  'Swift': '#ff6347',
  'PWA': '#2e8b57',
  'Vue': '#20b2aa',
  'NativeScript': '#66cdaa',
  'Ember': '#E04E39',
  'Ruby on Rails': '#CC0000',
  'Elixir Phoenix': '#9370db',
  'Firebase': '#ffd700',
  'Cloud Functions': '#e6e6fa',
  'Web Components': '#f08080',
  'Django': '#808000',
  'Google API': '#008b8b',
  'Geolocation': '#00008b',
  'Twilio': '#ff8c00'
};

const ProjectHeader = styled.div`
  display: inline;
  margin-right: 20px;

  @media (max-width: ${PROJECT_BREAKPOINT}px) {
    display: block;
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

  @media (max-width: ${PROJECT_BREAKPOINT}px) {
    display: none;
  }
`;

const ProjectText = styled.p`
  font-size: 18px;
  max-width: 45%;

  @media (max-width: ${PROJECT_BREAKPOINT}px) {
    max-width: 100%;
    width: 100%;
  }
`

const Skill = styled.span`
  display: inline-block;
  font-size: 18px;
  margin-right: 14px;
  border: 2px solid;
  vertical-align: middle;
  border-radius: 20px;
  padding: 2px 10px;
  font-weight: 400;

  @media (max-width: ${PROJECT_BREAKPOINT}px) {
    font-size: 14px;
  }
`;

const Post = styled.div`
  border-bottom: 1px solid lightgray;

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

const ContentWrapper = styled(FlexAroundWrapper)`
  @media (max-width: ${PROJECT_BREAKPOINT}px) {
    flex-direction: column;
  }
`;

const MobileImageWrapper = styled.div`
  display: none;

  img, video {
    width: 100%;
  }

  @media (max-width: ${PROJECT_BREAKPOINT}px) {
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

  @media (max-width: ${PROJECT_BREAKPOINT}px) {
    display: none;
  }
`;

const Project = ({ project, isSelected = false, selectProject }) => {
  const sectionRef = useRef();

  const [displaySection, setDisplaySection] = useState(isSelected);

  useEffect(() => {
    if (isSelected) {
      setDisplaySection(true);
      gsap.to(sectionRef.current, {
        delay: 0,
        duration: 0.4,
        height: 'auto'
      });
    } else {
      gsap.to(sectionRef.current, {
        delay: 0,
        duration: 0.4,
        height: '0',
        onComplete: () => setDisplaySection(false)
      });
    }
  }, [isSelected]);

  return (
    <Post className="js-cursor-target">
      <FlexAroundWrapper>
        <HeadingL>
          <ProjectHeader className="custom-pointer" onClick={selectProject}>
            {project.title}
          </ProjectHeader>
          {project?.skills.map(skill => {
            return (<Skill key={`${project.title}-${skill}`} style={{ borderColor: SKILL_COLORS_MAP[skill] }} >{skill}</Skill>);
          })}
        </HeadingL>
        {!isSelected && <MoreButton className="custom-pointer" onClick={selectProject}>More</MoreButton>}
      </FlexAroundWrapper>
      <ContentWrapper style={{ height: '0', overflow: 'hidden' }} ref={sectionRef}>
        {displaySection &&
          <>
            {project.images[0] &&
              <MobileImageWrapper>
                <img src={project.images[0]} />
              </MobileImageWrapper>
            }

            <ProjectText dangerouslySetInnerHTML={{ __html: project.description }}></ProjectText>

            <ImageWrapper>
              {project.images.map((image, index) => <img key={`image-${index}`} src={image} style={{ marginBottom: '10px' }} />)}
              {project.videos.map((video, index) => <video key={`video-${index}`} src={video} autoPlay loop playsInline muted style={{ marginBottom: '10px' }} />)}
            </ImageWrapper>

            {project.videos[0] &&
              <MobileImageWrapper>
                <video src={project.videos[0]} autoPlay loop playsInline muted />
              </MobileImageWrapper>
            }
          </>
        }
      </ContentWrapper>
    </Post>
  )
};

export default Project;