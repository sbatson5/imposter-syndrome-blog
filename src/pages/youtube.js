import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import {
  HeaderLogo,
  HeadingXL,
  HeadingL,
  Layout,
  SEO,
  TextBody,
  Spotlight,
} from '../components';
import { BREAKPOINT } from '../utils/constants';
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

  @media (max-width: ${BREAKPOINT}px) {
    display: block;
  }
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
      description: 'This became one of my most viewed videos and I think that is because Ember Data is so intimidating for a lot of new developers. There\'s a lot of terminology thrown around, and I try to walk through a lot of it with practical examples.',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=BT3bx5Dv1y8',
      id: 'BT3bx5Dv1y8',
      title: 'Ember-CLI Tutorial - Getting started with Ember 2.4',
      description: 'This is a quick(ish) walkthrough of creating an app with Ember-CLI using Ember 2.4.  I cover Pod structure versus non-pod structure, some ES6 syntax, routes and controllers',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=HEyFyM3FL2g',
      id: 'HEyFyM3FL2g',
      title: 'Ember - Working with Components',
      description: 'Components are intregal in all JS frameworks and Ember is no exception. However, they work much differently in Ember than things like React or Vue.',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=UuOhsf2R_b4',
      id: 'UuOhsf2R_b4',
      title: 'Ember-CLI Tutorial - Helpers & Utils',
      description: 'Helpers and very unique to Ember and it isn\'t always clear when to use them or why they are useful. I walk through how to create them and when to use them and some lesser known tidbits.',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=u6wFoO_TwLc',
      id: 'u6wFoO_TwLc',
      title: 'Ember-CLI Tutorial - Computed Properties',
      description: 'Computed properties are powerful but can get pretty confusing fast. In this video, I cover the basics of computed properties including default getters, setters, alias, mapBy and more!',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=yD6cuo9WuoU',
      id: 'yD6cuo9WuoU',
      title: 'Ember-CLI Tutorial - The Run Loop',
      description: 'I go over what the Ember Run loop does in the background for us, prioritizing our code to run more efficiently.  Then I go over some cases where we can use some of the internal run loop methods to make our lives easier.',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=LtOAbva-S7Q',
      id: 'LtOAbva-S7Q',
      title: 'Ember-CLI Tutorial - Working with Services part 1',
      description: 'In this video, I cover the basics of working with Services. I cover how to stub a session, redirect users if they are not logged in and direct them back once they have completed logging in.  I also go over why services are important as we move away from controllers.',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=2x59kcI6lGY',
      id: 'LtOAbva-S7Q',
      title: 'Ember-CLI Tutorial - Working with Services part 2',
      description: 'In Part 2, I go over a slightly more advanced example of an Ember Service. In part 1, I covered storing a transition when a user attempts to access a route without logging in.  In this video, I go over how we can log a user out after remaining inactive for too long and how we can test this properly.',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=eIaVvx7udfE',
      id: 'eIaVvx7udfE',
      title: 'Ember-CLI Tutorial - Mixins',
      description: 'I cover how to use Mixins within in your Ember app and how they differ from extending objects.',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=bhJ6YzBIoWo',
      id: 'bhJ6YzBIoWo',
      title: 'Creating an Ember Addon',
      description: 'In this video, I go over creating a simple ember addon for adding Wistia videos in an ember application.',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=OYmrxMp8rcA',
      id: 'OYmrxMp8rcA',
      title: 'Ember without jQuery',
      description: 'In this video, I go over how to update an existing ember app to not use jQuery whatsoever. With only a few steps, you can reduce your app size and not feel tied down by jQuery anymore',
      category: 'ember'
    },
    {
      url: 'https://www.youtube.com/watch?v=YONCNJuLBP8',
      id: 'YONCNJuLBP8',
      title: 'Google OAuth2 with Ember.js',
      description: 'I go over how to add Google authentication in your Ember app with OAuth2.  This video covers the basic flow of an OAuth2 app, which can be applied to more than just Google.',
      category: 'ember'
    },
  ];

  return (
    <>
      <Spotlight />
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
