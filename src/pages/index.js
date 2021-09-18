import React from "react"
import {Link, graphql} from "gatsby"
import styled from "styled-components"
import {
  HeaderLogo,
  HeadingXL,
  HeadingL,
  Layout,
  SEO,
  TextBody,
  TextDate,
} from "../components";
import { BREAKPOINT } from "../utils/constants";
import setupCursor from "../utils/setup-cursor";
import 'prismjs/themes/prism-tomorrow.css';
import { useEffect } from "react";

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

const textAboutMe = [
  'I\'m a software engineer and writer but am not particularly good at either',
  'I\'m just a boy, standing in front of a blank screen, asking it to love him',
  'I\'m my mother\'s favorite Scott.  ...Well, favorite after Scott Bakula',
  'If you like tech and writing and reading about tech and writing then... you\'re probably me...'
];

const randomNumber = Math.floor(Math.random() * textAboutMe.length);

export default function Home({data}) {
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
      <SEO title="Home" />
      <HeaderLogo />
      <Layout>
        <Hero>
          <HeadingXL>Imposter-Syndrome.lol</HeadingXL>
          <TextHome>
            hi
          </TextHome>
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
          excerpt
        }
      }
    }
  }
`
