import { styled } from 'styled-components';

import DeleteBoardModal from '../components/boards/DeleteBoardModal';
import UpdateCommentModal from '../components/boards/UpdateCommentModal';

import ZipsaMyPageMain from './zipsaMyPage/ZipsaMyPageMain';
import ZipsaProfileUpdate from './zipsaMyPage/ZipsaProfileUpdate';
import BoardsMain from './boards/BoardsMain';
import BoardsDetail from './boards/BoardsDetail';
import CreateBoard from './boards/CreateBoard';
import UpdateBoard from './boards/UpdateBoard';

const ComponentWrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 60px 16px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const H2title = styled.h2`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: #7e7e7e;
  font-size: large;
  font-weight: 300;
  color: white;
`;

function TestLee() {
  return (
    <>
      {/* 컴포넌트 확인 부분 */}
      <ComponentWrapper>
        <h1 style={{ fontWeight: 'bold' }}>수민쓰 테스트 페이지</h1>
        <hr style={{ marginBottom: '30px' }}></hr>

        {/* <DeleteBoardModal></DeleteBoardModal> */}
        {/* <UpdateCommentModal></UpdateCommentModal> */}
      </ComponentWrapper>

      {/* 페이지 확인 부분 */}
      <H2title>ZipsaList 만들기</H2title>
      {/* <ZipsaList></ZipsaList> */}

      <H2title>ZipsaMyPageMain 만들기</H2title>
      {/* <ZipsaMyPageMain></ZipsaMyPageMain> */}

      <H2title>ZipsaProfileUpdate 만들기</H2title>
      <ZipsaProfileUpdate></ZipsaProfileUpdate>

      <H2title>BoardsMain 만들기</H2title>
      <BoardsMain></BoardsMain>

      <H2title>BoardsDetail 만들기</H2title>
      {/* <BoardsDetail></BoardsDetail> */}

      <H2title>CreateBoard 만들기</H2title>
      {/* <CreateBoard></CreateBoard> */}

      <H2title>UpdateBoard 만들기</H2title>
      {/* <UpdateBoard></UpdateBoard> */}
    </>
  );
}

export default TestLee;
