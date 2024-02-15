import styled from 'styled-components';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { deleteOneArticle } from '../../apis/api/board';
import ModalContainer from '../common/ModalContainer';

const Wrapper = styled.div`
  width: 300px;
  height: auto;
  padding: 30px 16px 25px;
  position: relative;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  box-shadow: 0px 5px 15px 1px lightgray;
  background-color: white;
  border-radius: 25px;
  white-space: pre-wrap;
`;

const TitleText = styled.div`
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
  word-break: keep-all;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 15px;
`;

function Modal({
  title,
  onClickLeft,
  leftButtonMode,
  leftButtonContent,
  onClickRight,
  rightButtonMode,
  rightButtonContent,
}) {
  return (
    <ModalContainer>
      <Wrapper>
        <TitleText>{title}</TitleText>
        <ButtonWrapper>
          <Button
            onClick={onClickLeft}
            mode={leftButtonMode ? leftButtonMode : 'THIN_GRAY'}
            children={leftButtonContent ? leftButtonContent : '취소'}
          ></Button>
          <Button
            onClick={onClickRight}
            mode={rightButtonMode ? rightButtonMode : 'THIN_BLUE'}
            children={rightButtonContent ? rightButtonContent : '삭제'}
          ></Button>
        </ButtonWrapper>
      </Wrapper>
    </ModalContainer>
  );
}

export default Modal;
