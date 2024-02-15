import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  getAssociatedUserList,
  confirmIsLeader,
} from '../../apis/api/associate';
import styled from 'styled-components';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import Image from '../../components/common/Image';
import NavigationBar from '../../components/common/NavigationBar';
import NavigateButton from '../../components/common/NavigateButton';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const MemberWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
`;

function ConnectCodeShow() {
  const [isLeader, setIsLeader] = useState(false);

  useEffect(() => {
    confirmIsLeader().then(response => {
      console.log(response);
      if (response.data) isLeader(true);
    });
  }, []);

  const { data } = useQuery({
    queryKey: ['associatedUserList'],
    queryFn: () => getAssociatedUserList(),
  });

  const navigate = useNavigate();

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            width="40px"
            height="40px"
            margin="0 0 0 -12px"
            src={process.env.PUBLIC_URL + '/images/left_arrow.svg'}
          ></Image>
        }
        onPrevious={() => navigate('/myPage')}
      ></NavigationBar>

      <Paragraph
        margin="0 0 20px 0"
        gap="5px"
        fontSize="35px"
        sentences={[<BoldText boldContent={'멤버'}></BoldText>]}
      ></Paragraph>

      {data?.map((user, index) => {
        return (
          <MemberWrapper key={index}>
            <Image
              width="60px"
              height="60px"
              margin="4px 0 0 0"
              src={
                user.profileImage ||
                process.env.PUBLIC_URL + '/images/profile_img.svg'
              }
            ></Image>
            {user.isRepresentative
              ? `${user.name} (대표)`
              : `${user.name} (멤버)`}
          </MemberWrapper>
        );
      })}

      {isLeader && (
        <NavigateButton onClick={() => navigate('/connectCode/show')}>
          멤버 추가하기
        </NavigateButton>
      )}
    </Wrapper>
  );
}

export default ConnectCodeShow;
