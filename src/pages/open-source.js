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

export default function OpenSource() {

  const data = [
    {
      url: 'https://github.com/Upstatement/firestore-jest-mock',
      title: 'Firestore Jest Mock',
      description: 'A library for writing test assertions against Google\'s Firestore. This grew out of a custom solution for a client project and we decided to open source it. It now gets over 7000 downloads every week.'
    },
    {
      url: 'https://github.com/poteto/ember-cli-flash',
      title: 'Ember CLI Flash',
      description: 'Simple, highly configurable flash messages for ember-cli. Maintained this library for a few years as the main contributor, while it was steadily getting 30,000 downloads each week'
    },
    {
      url: 'https://github.com/emberjs/guides',
      title: 'Ember Guides',
      description: 'Deprecated: was one of the top contributors to the old version of the Ember Guides website before version 3 was release and the guides website was rebuilt'
    },
    {
      url: 'https://github.com/emberjs/data',
      title: 'Ember Data',
      description: 'Data persistence library for Ember. Ships with ember and is used by thousands of developers around the world'
    },
    {
      url: 'https://github.com/craftcms/cms',
      title: 'Craft CMS',
      description: 'Popular PHP CMS framework. I am not a big CMS user, but I had to use Craft for a client project and was able to get in a few PRs related to building custom addons'
    },
    {
      url: 'https://github.com/react-native-webview/react-native-webview',
      title: 'React Native WebView',
      description: 'Library used for rendering webviews within React Native projects. Implemented a feature for custom context menus when highlighting text.'
    },
    {
      url: 'https://github.com/gaoxiaoliangz/epub-parser',
      title: 'Epub Parser',
      description: 'JavaScript library for parsing Epub files. Implemented a feature for parsing xhtml table of contents, which is the new standard.'
    },
    {
      url: 'https://github.com/sbatson5/ember-wistia',
      title: 'Ember Wistia',
      description: 'A simple Ember component library for embedding Wistia videos and leveraging their player API'
    }
  ];

  return (
    <>
      <Spotlight />
      <SEO title="Open Source" />
      <HeaderLogo />
      <Layout>
        <Hero>
          <HeadingXL>Open Source Projects</HeadingXL>
          <TextHome>Here are some contributions I&lsquo;ve made to various open source projects. Certainly not all of them, but these are some of the ones I&lsquo;m most proud of.</TextHome>
        </Hero>
        {data.map((node) => (
          <Link to={node.url} key={node.url} className="js-cursor-target">
            <Post>
              <HeadingL>{node.title}</HeadingL>
              <TextBody>{node.description}</TextBody>
            </Post>
          </Link>
        ))}
      </Layout>
    </>
  )
}
