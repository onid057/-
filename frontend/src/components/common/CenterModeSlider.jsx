import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import Image from './Image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledSlider = styled(Slider)`
  height: 100%;
  .slick-list {
    height: 100%;
    object-fit: cover;
    display: flex;
    align-items: center; // 이미지가 정방향이 아닐 경우 가운데 위치
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .slick-prev {
    left: 6px;
    z-index: 999;
  }
  .slick-next {
    right: 6px;
    z-index: 999;
  }
`;
function CenterModeSlider({ showImages }) {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '20px',
    slidesToShow: 1,
    speed: 500,
    arrows: false, // 좌,우 버튼
  };
  return (
    <StyledSlider {...settings}>
      {showImages.map((image, id) => (
        <div key={id}>
          <Image src={image} width={'254px'} height={'164px'}></Image>
        </div>
      ))}
    </StyledSlider>
  );
}

export default CenterModeSlider;
