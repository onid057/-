import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Notice from '../../components/common/Notice';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import BoardsTags from '../../components/boards/BoardsTags';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-weight: 300;
  white-space: pre-wrap;
`;

// 가로스크롤 구현 위한 div
const TagWrapper = styled.div`
  width: 500px;
  margin-bottom: 20px;
  display: flex;
  gap: 8px;
  overflow: scroll;
  /* background: #f0d9ff; */
  overflow: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CreateNewBox = styled.div`
  cursor: pointer;
  width: 100%;
  height: 70px;
  margin-bottom: 20px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  background-color: white;
  font-size: 20px;
  font-weight: 300;
`;

const SmallText = styled.div`
  font-size: 15px;
  font-weight: 200;
  text-align: end;
`;

// 전체 리스트 조회 API
// API 나오면 더 봐야 할듯여

function BoardsMain() {
  // 게시판 태그 목록
  const boradTags = [
    '맛집 추천',
    '동네 소식',
    '집사 후기',
    '모임 모집',
    '생활정보',
    '일상',
    '공공소식',
  ];

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            src={`${process.env.PUBLIC_URL}/images/keyboard_arrow_left.svg`}
            width={'40px'}
            height={'40px'}
            margin={'0 0 0 -12px'}
          ></Image>
        }
      ></NavigationBar>

      <CreateNewBox>
        <Image
          src={process.env.PUBLIC_URL + '/images/pencil.svg'}
          width={'40px'}
          height={'40px'}
          margin={'0 -40px 0 0'}
        ></Image>
        <span>새 게시물 작성하기</span>
        <Image
          src={process.env.PUBLIC_URL + '/images/right_arrow.svg'}
          width={'24px'}
          height={'24px'}
          margin={'0'}
        ></Image>
      </CreateNewBox>

      <TagWrapper>
        {boradTags.map((tag, idx) => (
          <BoardsTags key={idx} mode={'LARGE'} tagName={tag}></BoardsTags>
        ))}
      </TagWrapper>

      {/* API 받아서 map 돌기 */}
      <Notice
        upper={[
          <boradTags mode={'SMALL'} tagName={'집사 후기'}></boradTags>,
          <BoldText
            fontSize={'18px'}
            boldContent={'이 서비스 진짜 짱이예요'}
            normalContent={null}
          ></BoldText>,
        ]}
        lower={['김세리', '1일전', '조회수']}
        // 해당 게시물의 상세 페이지로 이동
        nextPage={''}
        padding={'20px 12px'}
      ></Notice>

      <Notice></Notice>
    </Wrapper>
  );
}

export default BoardsMain;
