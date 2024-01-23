import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import Image from './Image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlide = styled.div`
  width: 100%;
  height: 100%;
`;

function SimpleSlider({ showImages }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // 좌,우 버튼
  };

  return (
    <Slider {...settings}>
      {showImages.map((image, id) => (
        <ImageSlide key={id}>
          <Image src={image} width={'100px'} height={'100px'}></Image>
        </ImageSlide>
      ))}
    </Slider>
  );
}

export default SimpleSlider;
