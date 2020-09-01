import React from 'react';
import styled from 'styled-components';
import { AbsCenter } from '../styled-components/basic-components';
import ImageSlider from '../components/image_components/image-slider';
import MainNav from '../components/navigation/main-nav';

const LandingSection = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 700px;
  background: ${(props)=>props.background || props.theme.lightest};
  color: ${(props)=>props.color || props.theme.darkest};
`
const bannerImages = [
    './images/sushi-banner1.jpg',
    './images/sushi-banner2.jpg',
    './images/sushi-banner3.jpg',
    './images/sushi-banner4.jpg',
    './images/sushi-banner5.jpg',
]

export default function Landing() {
    return(
        <LandingSection sectionId="home">
            <ImageSlider imagesArray={bannerImages}>
                <MainNav hasCart hasLogo />
            </ImageSlider>
        </LandingSection>
    )
};