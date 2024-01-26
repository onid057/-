import React from 'react';
import styled from 'styled-components';
import SimpleSlider from './SimpleSlider';

const ImageUploaderWrapper = styled.div`
  width: 290px;
  height: 200px;
`;

const SliderWrapper = styled.div`
  width: 290px;
  height: 200px;
`;

function ImageUploader({
  showImages,
  setShowImages,
  fileInputRef,
  Children,
  onHandleFunc,
}) {
  const handleImageChange = event => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    if (imageLists) {
      // 여기에서 파일을 업로드하거나 다른 작업을 수행할 수 있다.
      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }

      // 최대 길이 3
      if (imageUrlLists.length > 3) {
        imageUrlLists = imageUrlLists.slice(0, 3);
      }

      // 이미지url 배열, 클릭했다는 것을 확인
      setShowImages(imageUrlLists);
    }
  };

  // X 버튼 클릭 시 이미지 삭제
  const handleDeleteImage = id => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <ImageUploaderWrapper>
      {Children}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        multiple
        onChange={handleImageChange}
      />
      {/* 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
      {/* <SliderWrapper>
        <SimpleSlider showImages={showImages}></SimpleSlider>
      </SliderWrapper> */}
    </ImageUploaderWrapper>
  );
}

export default ImageUploader;
