import React from 'react'
import { Link, graphql } from 'gatsby'
import {
  Button,
  HeaderBack,
  HeadingXL,
  Image,
  Layout,
  SEO,
  TextBody,
} from '../components'

export default function Foo({data}) {
  return (
    <>
      <SEO title="Foo" />
      <HeaderBack />
      <Layout>
        <HeadingXL>Writing</HeadingXL>
        <Image fluid={data.RandomPhoto.childImageSharp.fluid} />
        <TextBody>
          What is there to say about me?
          <br />
          <br />
          I majored in English (haha) and graduated from college in 2008... literally, the worst
          year to graduate in the past 100 years. Surprising no one, I wasn&lsquo;t able to find a job
          right after college. I worked as a bank teller, sales associate at Best Buy before
          landing a job in Tech Support at a software company. I stayed there for 4 years and
          slowly learned more about software development. I took night classes at my local
          community college for 3 years before landing my first job as a web developer.
          <br />
          <br />
          Although I built a career in tech, my passion for reading and writing never went away.
          I love reading fantasy and sci-fi novels and am currently working on a few writing
          projects. My most recent short story (The Shtriga) was published in 
          <Link href="https://www.amazon.com/dp/B093RP1C7G">Issue 78 of Leading Edge Magazine</Link>
        </TextBody>
        <Button href="mailto:scott.batson&#64;imposter-syndrome.lol">Get in touch</Button>
      </Layout>
    </>
  )
}

export const data = graphql`
  query {
    RandomPhoto: file(relativePath: {eq: "assets/images/home-office.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1400) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
