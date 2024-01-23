import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import Image from './Image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlide = styled.div`
  width: 260px;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomDotWrapper = styled.div`
  position: absolute;
  bottom: 0px; /* 원하는 위치로 조절 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SimpleSlider({ showImages }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // 좌,우 버튼
    appendDots: dots => <CustomDotWrapper>{dots}</CustomDotWrapper>,
  };

  return (
    <Slider {...settings}>
      {showImages.map((image, id) => (
        <ImageSlide key={id}>
          <Image src={image} width={'240px'} height={'240px'}></Image>
        </ImageSlide>
      ))}
    </Slider>
  );
}

export default SimpleSlider;
