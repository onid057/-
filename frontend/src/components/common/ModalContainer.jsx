import styled from 'styled-components';
import React from 'react';
import { createPortal } from 'react-dom';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
`;

function ModalContainer({ children }) {
  return createPortal(
    <ModalWrapper>{children}</ModalWrapper>,
    document.getElementById('modal'),
  );
}

export default ModalContainer;
