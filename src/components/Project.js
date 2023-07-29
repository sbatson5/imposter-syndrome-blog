import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { HeadingL } from '../components';
import { BREAKPOINT } from '../utils/constants';
import 'prismjs/themes/prism-tomorrow.css';
import gsap from 'gsap';

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

  a {
    box-shadow: inset 0 -1px 0 0 hsl(240,100%,70%, 1);
  }

  @media (max-width: ${BREAKPOINT}px) {
    max-width: 100%;
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

const Project = ({ node, isSelected = false, selectProject }) => {
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
    <Post onClick={selectProject} className="js-cursor-target">
      <FlexAroundWrapper>
        <HeadingL>
          {node.title}
        </HeadingL>
        {!isSelected && <MoreButton onClick={selectProject}>More</MoreButton>}
      </FlexAroundWrapper>
      <FlexAroundWrapper style={{ height: '0', overflow: 'hidden' }} ref={sectionRef}>
        {displaySection &&
          <>
            {node.images[0] &&
              <MobileImageWrapper>
                <img src={node.images[0]} />
              </MobileImageWrapper>
            }

            <ProjectText dangerouslySetInnerHTML={{ __html: node.description }}></ProjectText>

            <ImageWrapper>
              {node.images.map((image, index) => <img key={`image-${index}`} src={image} />)}
              {node.videos.map((video, index) => <video key={`video-${index}`} src={video} autoPlay loop playsInline muted />)}
            </ImageWrapper>

            {node.videos[0] &&
              <MobileImageWrapper>
                <video src={node.videos[0]} autoPlay loop playsInline muted />
              </MobileImageWrapper>
            }
          </>
        }
      </FlexAroundWrapper>
    </Post>
  )
};

export default Project;