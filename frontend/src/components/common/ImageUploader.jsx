import React from 'react';
import styled from 'styled-components';

const ImageUploaderWrapper = styled.div`
  width: 288px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

function ImageUploader({ setImageFile, fileInputRef, children }) {
  const handleImageChange = event => {
    const image = event.target.files[0];
    setImageFile(image);
  };

  return (
    <ImageUploaderWrapper>
      {children}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
    </ImageUploaderWrapper>
  );
}

export default ImageUploader;
