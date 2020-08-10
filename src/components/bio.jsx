import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

import {rhythm} from '../utils/typography';
import Social from './social';

const Bio = () => {
  const data = getBioData();

  const {author, social} = data.site.siteMetadata;
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <StyledImage fixed={data.avatar.childImageSharp.fixed} alt={author.name} />
      <p>
        <strong>{author.name}</strong>
        <br />
        {author.summary}
        <br />
        <Social social={social} />
      </p>
    </div>
  );
};

export default Bio;

const StyledImage = styled(Image)`
  display: block;
  width: 100px;
  height: 100px;
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  border-radius: 50%;
`;

const getBioData = () =>
  useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: {regex: "/profile-pic.png/"}) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            email
            instagram
            github
            linkedin
            strava
            twitter
          }
        }
      }
    }
  `);
