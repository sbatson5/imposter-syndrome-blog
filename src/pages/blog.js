import React from 'react';
import {Link, graphql} from 'gatsby';
import styled from 'styled-components';
import {
  HeaderLogo,
  HeadingL,
  Layout,
  SEO,
  TextBody,
  TextDate,
  Spotlight,
} from '../components';
import ImposterSyndromeHeader from '../components/ImposterSyndromHeader';
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
`

export default function Home({data}) {
  return (
    <>
      <Spotlight />
      <SEO title="Home" />
      <HeaderLogo />
      <Layout>
        <Hero>
          <ImposterSyndromeHeader />
          <TextHome>Tech Blog</TextHome>
        </Hero>
        {data.allMarkdownRemark.edges.map(({node}) => (
          <Link to={node.frontmatter.slug} key={node.id}>
            <Post className="js-cursor-target">
              <HeadingL>{node.frontmatter.title}</HeadingL>
              <TextBody>{node.frontmatter.description}</TextBody>
              <TextDate>{node.frontmatter.date}</TextDate>
            </Post>
          </Link>
        ))}
      </Layout>
    </>
  )
}

export const data = graphql`
  query {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(blog)/"  }}, sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            slug
          }
        }
      }
    }
  }
`
