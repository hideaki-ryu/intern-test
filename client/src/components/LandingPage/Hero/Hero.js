import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, MainHeading } from "../../../globalStyles";
import {
  HeroImage,
  HeroSection,
  HeroText,
  ButtonWrapper,
  HeroButton,
} from "./HeroStyles";

const Hero = () => {
  return (
    <HeroSection>
      <HeroImage src="../../assets/background.jpg" />
      <Container>
        <MainHeading>Serpent</MainHeading>
        <HeroText>
        We are Creative Technology Solution Provider
        </HeroText>
        <ButtonWrapper>
          <Link to="/">
            <Button>Get Started</Button>
          </Link>
          <HeroButton>Find More</HeroButton>
        </ButtonWrapper>
      </Container>
    </HeroSection>
  );
};

export default Hero;
