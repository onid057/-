import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
        <div key={id}>
          <img src={image} alt={id} />
        </div>
      ))}
    </Slider>
  );
}

export default SimpleSlider;
