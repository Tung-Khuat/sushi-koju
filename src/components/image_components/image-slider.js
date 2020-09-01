import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Slider = styled.div`
  background-image: url(${({currentImage}) => currentImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-color: grey;
  width: 100%;
  height: 100%;
`

export default function ImageSlider ({children, imagesArray}) {
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    imagesArray && setCurrentImage(imagesArray[0])
  }, [imagesArray])

  return (
    <Slider currentImage={currentImage}>
      {children}
    </Slider>
  )
}