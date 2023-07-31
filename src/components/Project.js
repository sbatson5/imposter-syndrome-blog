import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { HeadingL } from '../components';
import { BREAKPOINT, PROJECT_BREAKPOINT } from '../utils/constants';
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
  font-size: 18px;
  max-width: 45%;

  @media (max-width: ${PROJECT_BREAKPOINT}px) {
    max-width: 100%;
    width: 100%;
  }
`

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
    <Post className="js-cursor-target">
      <FlexAroundWrapper>
        <HeadingL className="custom-pointer" onClick={selectProject}>
          {node.title}
        </HeadingL>
        {!isSelected && <MoreButton className="custom-pointer" onClick={selectProject}>More</MoreButton>}
      </FlexAroundWrapper>
      <ContentWrapper style={{ height: '0', overflow: 'hidden' }} ref={sectionRef}>
        {displaySection &&
          <>
            {node.images[0] &&
              <MobileImageWrapper>
                <img src={node.images[0]} />
              </MobileImageWrapper>
            }

            <ProjectText dangerouslySetInnerHTML={{ __html: node.description }}></ProjectText>

            <ImageWrapper>
              {node.images.map((image, index) => <img key={`image-${index}`} src={image} style={{ marginBottom: '10px' }} />)}
              {node.videos.map((video, index) => <video key={`video-${index}`} src={video} autoPlay loop playsInline muted style={{ marginBottom: '10px' }} />)}
            </ImageWrapper>

            {node.videos[0] &&
              <MobileImageWrapper>
                <video src={node.videos[0]} autoPlay loop playsInline muted />
              </MobileImageWrapper>
            }
          </>
        }
      </ContentWrapper>
    </Post>
  )
};

export default Project;