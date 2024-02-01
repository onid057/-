import React from 'react';
import styled from 'styled-components';

const ImageUploaderWrapper = styled.div`
  width: 294px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

function ImageUploader({ showImages, setShowImages, fileInputRef, children }) {
  const handleImageChange = event => {
    const imageLists = event.target.files;
    let imageUrlLists = [];

    if (imageLists) {
      // 여기에서 파일을 업로드하거나 다른 작업을 수행할 수 있다.
      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }

      // 최대 길이 3
      if (imageUrlLists.length > 3) {
        console.log(imageUrlLists);
        alert('사진은 최대 3개까지 첨부 가능합니다.');
        imageUrlLists = imageUrlLists.slice(0, 3);
      }

      // 이미지url 배열, 클릭했다는 것을 확인
      setShowImages(imageUrlLists);
    }
  };

  return (
    <ImageUploaderWrapper>
      {children}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        multiple
        onChange={handleImageChange}
      />
    </ImageUploaderWrapper>
  );
}

export default ImageUploader;
