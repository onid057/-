import { useQuery } from '@tanstack/react-query';
import { getSimpleUserInfo } from '../../apis/api/userMyPage';
import styled from 'styled-components';
import Notice from '../../components/common/Notice';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import NavigateButton from '../../components/common/NavigateButton';
import MenuBar from '../../components/common/MenuBar';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 20px 16px 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const HeadWrapper = styled.div`
  width: 100%;
  min-height: 509px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

function UserMyPage() {
  const { data } = useQuery({
    queryKey: ['simpleUserInfo'],
    queryFn: () => getSimpleUserInfo(),
  });
  const navigate = useNavigate();

  return (
    <Wrapper>
      <HeadWrapper>
        <Notice
          upper={[
            <ImageWrapper>
              <Image
                src={
                  data?.profileImage ||
                  process.env.PUBLIC_URL + '/images/profile_img.svg'
                }
                width={'60px'}
                height={'60px'}
              ></Image>
            </ImageWrapper>,
            <Paragraph
              gap={'20px'}
              fontSize={'13px'}
              sentences={[
                <BoldText
                  fontSize={'20px'}
                  boldContent={data?.name}
                  normalContent={' 사용자님'}
                ></BoldText>,
                '내 정보 수정하기',
              ]}
            ></Paragraph>,
          ]}
          nextPage={'/UserProfileUpdate'}
        ></Notice>
        <Notice
          upper={[
            <Image
              src={process.env.PUBLIC_URL + '/images/family.svg'}
              width={'30px'}
              height={'30px'}
              margin={'4px 0 0 0'}
            ></Image>,
            <ContentWrapper>
              <BoldText
                fontSize={'20px'}
                boldContent={
                  data?.isAffiliated ? '멤버 확인하기' : '계정 연동하기'
                }
              ></BoldText>
              <Image
                src={process.env.PUBLIC_URL + '/images/right_arrow.svg'}
                width={'24px'}
                height={'24px'}
              ></Image>
            </ContentWrapper>,
          ]}
          nextPage={data?.isAffiliated ? '/connectMember' : '/connectOption'}
        ></Notice>

        <NavigateButton
          onClick={() => {
            navigate('/userActivityHistory');
          }}
        >
          사용 내역 보기
        </NavigateButton>
        <NavigateButton
          onClick={() => {
            navigate('/userBoardList');
          }}
        >
          작성한 게시물 확인하기
        </NavigateButton>
        <NavigateButton
          onClick={() => {
            navigate('/paymentRegistration');
          }}
        >
          간편 결제 수단 등록하기
        </NavigateButton>
        <NavigateButton
          onClick={() => {
            return data?.isZipsa ? undefined : navigate('/applyZipsa');
          }}
          disabled={data?.isZipsa}
        >
          집사 되기
        </NavigateButton>
        <NavigateButton
          onClick={() => {
            navigate('/passwordUpdate');
          }}
        >
          비밀번호 변경하기
        </NavigateButton>
      </HeadWrapper>
      <MenuBar currentMenu="USER" isWorked={false}></MenuBar>
    </Wrapper>
  );
}

export default UserMyPage;
