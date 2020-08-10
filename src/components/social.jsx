import React from 'react';
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaStrava,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';
import styled from 'styled-components';

function Social(props) {
  const {social} = props;

  return (
    <StyledDiv>
      {getSocialLink(FaEnvelope, `mailto:${social.email}`)}
      {getSocialLink(FaGithub, `https://github.com/${social.github}/`)}
      {getSocialLink(FaLinkedin, `https://linkedin.com/${social.linkedin}/`)}
      {getSocialLink(FaInstagram, `https://instagram.com/${social.instagram}/`)}
      {getSocialLink(FaStrava, `https://www.strava.com/athletes/${social.strava}/`)}
      {getSocialLink(FaTwitter, `https://twitter.com/${social.twitter}/`)}
    </StyledDiv>
  );
}

export default Social;

const StyledDiv = styled('div')`
  margin: 10px 0;
`;
const StyledLink = styled('a')`
  margin-right: 20px;
  color: #000;
  box-shadow: none;
`;

const getStyledSocialIcon = (Icon) => styled(Icon)`
  font-size: 20px;
`;
const getSocialLink = (Icon, link) => {
  const StyledIcon = getStyledSocialIcon(Icon);

  return (
    <StyledLink href={link}>
      <StyledIcon />
    </StyledLink>
  );
};
