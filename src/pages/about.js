import React from 'react'
import { Link, graphql } from 'gatsby'
import {
  Button,
  HeaderLogo,
  HeadingXL,
  Image,
  Layout,
  SEO,
  TextBody,
} from '../components'

export default function About({data}) {
  return (
    <>
      <SEO title="About" />
      <HeaderLogo />
      <Layout>
        <HeadingXL>About Me</HeadingXL>
        <Image fluid={data.RandomPhoto.childImageSharp.fluid} />
        <TextBody>
          What is there to say about me?
          <br />
          <br />
          I majored in English (haha) and graduated from college in 2008... literally, the worst
          year to graduate in the past 100 years. Surprising no one, I wasn&lsquo;t able to find a job
          right after college. I worked as a bank teller and sales associate at Best Buy before
          landing a job in Tech Support at a software company. I stayed there for 4 years and
          slowly learned more about software development and the web. I took night classes at my local
          community college for 3 years before landing my first job as a web developer.
          <br />
          <br />
          Although I built a career in tech, my passion for reading and writing never went away.
          I love reading fantasy and sci-fi novels and am currently working on a few writing
          projects. My most recent short story (The Shtriga) was published in 
          <Link href="https://www.amazon.com/dp/B093RP1C7G">Issue 78 of Leading Edge Magazine</Link>
          <br />
          <br />
          It is also available as a standalone novelette with custom art:
          <Link href="https://www.amazon.com/dp/B0CCR4QLZZ">The Shtriga</Link>
          <br />
          <br />
          I am available for freelance work, but find that I can&lsquo;t commit to more than 10 hours
          a week. If that works for you or you just want to chat about tech, feel free to reach out!
        </TextBody>
        <Button href="mailto:scott.batson&#64;imposter-syndrome.lol">Get in touch</Button>
      </Layout>
    </>
  )
}

export const data = graphql`
  query {
    RandomPhoto: file(relativePath: {eq: "assets/images/mac.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1400) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
