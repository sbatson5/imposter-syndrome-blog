import React from 'react';
import {Link, graphql} from 'gatsby';
import styled from 'styled-components';
import {
  HeaderLogo,
  Layout,
  SEO,
  TextBody,
  TextDate,
  Spotlight,
  BlogHeading,
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
      <SEO title="Imposter Syndrome" />
      <HeaderLogo />
      <Layout>
        <Hero>
          <ImposterSyndromeHeader />
          <TextHome>
            Everyone deserves a blog and this is mine
          </TextHome>
        </Hero>
        {data.allMarkdownRemark.edges.map(({node}) => (
          <Link to={node.frontmatter.slug} className="custom-pointer" key={node.id}>
            <Post className="js-cursor-target">
              <BlogHeading>{node.frontmatter.title}</BlogHeading>
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
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
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
