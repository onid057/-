import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 288px;
  margin: 0 auto;
  padding: 10px 16px;
  border-radius: 25px;
  background-color: white;
`;

const Header = styled.div`
  width: 256px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: absolute;
  bottom: -10px;
  right: -10px;
  z-index: 999;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
`;

const ContentWrapper = styled.div`
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: height 0.5s ease;
`;

const Contents = styled.div``;

function Accordian({ title, content }) {
  const parentRef = useRef(null);
  const childRef = useRef(null);

  const [isCollapse, setIsCollapse] = useState(false);

  const parentRefHeight = parentRef.current?.style.height ?? '0px';
  const imageUrl =
    parentRefHeight === '0px'
      ? `${process.env.PUBLIC_URL}/images/down_arrow_no_tail.svg`
      : `${process.env.PUBLIC_URL}/images/up_arrow_no_tail.svg`;

  const handleTitleClick = event => {
    event.stopPropagation();
    if (parentRef.current === null || childRef.current === null) {
      return;
    }

    if (parentRef.current.clientHeight > 0) {
      parentRef.current.style.height = '0';
    } else {
      parentRef.current.style.height = `${childRef.current.clientHeight}px`;
    }
    setIsCollapse(!isCollapse);
  };
  return (
    <Wrapper>
      <Header onClick={handleTitleClick}>
        {title}
        <ImageWrapper $imageUrl={imageUrl}></ImageWrapper>
      </Header>
      <ContentWrapper ref={parentRef}>
        <Contents ref={childRef}>{content}</Contents>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Accordian;
