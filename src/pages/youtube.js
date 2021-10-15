import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import {
  HeaderLogo,
  HeadingXL,
  HeadingL,
  Layout,
  SEO,
  TextBody,
} from '../components';
import { BREAKPOINT } from '../utils/constants';
import setupCursor from '../utils/setup-cursor';
import 'prismjs/themes/prism-tomorrow.css';

const Hero = styled.div`
  margin-bottom: 20vh;

  @media (max-width: ${BREAKPOINT}px) {
    margin-bottom: 15vh;
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

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 5px;
`;

export default function Youtube() {

  const data = [
    {
      url: 'https://www.youtube.com/watch?v=X9AggnaEXrM',
      id: 'X9AggnaEXrM',
      title: 'Build a JSON API with Elixir / Phoenix in under an hour',
      description: 'I walk through how to build a RESTful, JSON API with Elixir and Phoenix and deploy it to heroku. I walk through contexts, migrations and the basics of elixir.',
      category: 'elixir'
    },
    {
      url: 'https://www.youtube.com/watch?v=Le4WwYheg8M',
      id: 'Le4WwYheg8M',
      title: 'Elixir Phoenix - Query Params & Pattern Matching',
      description: 'In this video, I continue working on the Phoenix API built in my last tutorial, adding the ability to filter records via query-params.  I also go over the basics of pattern matching.',
      category: 'elixir'
    },
    {
      url: 'https://www.youtube.com/watch?v=ljLxZw-XStw',
      id: 'ljLxZw-XStw',
      title: 'Ember-CLI Tutorial - Working with Ember Data and external API\'s',
      description: 'Stuff',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=HEyFyM3FL2g',
      id: 'HEyFyM3FL2g',
      title: 'Ember - Working with Components',
      description: 'Stuff',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=UuOhsf2R_b4',
      id: 'UuOhsf2R_b4',
      title: 'Ember-CLI Tutorial - Helpers & Utils',
      description: 'Stuff',
      category: 'ember'
    },
  ];

  useEffect(() => {
    setupCursor();
  }, []);

  return (
    <>
      <div className="cursor">
        <div className="cursor__ball js-cursor">
          <svg height="30" width="30">
            <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
          </svg>
        </div>
      </div>
      <SEO title="YouTube" />
      <HeaderLogo />
      <Layout>
        <Hero>
          <HeadingXL>Imposter-Syndrome.lol</HeadingXL>
          <TextHome>My programming YouTube videos</TextHome>
        </Hero>
        {data.map((node) => (
          <Link to={node.url} key={node.id} className="js-cursor-target">
            <Post>
              <HeadingL>{node.title}</HeadingL>
              <FlexWrapper>
                <img style={{ opacity: 0.8 }} src={`https://i.ytimg.com/vi/${node.id}/mqdefault.jpg`} />
                <TextBody style={{ paddingLeft: '20px' }}>{node.description}</TextBody>
              </FlexWrapper>
            </Post>
          </Link>
        ))}
      </Layout>
    </>
  )
}
