import styled from 'styled-components';
import SimpleNotice from '../../components/common/SimpleNotice';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import HorizontalLine from '../../components/common/HorizontalLine';

import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMatchNotificationList } from '../../apis/api/notify';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 25px 13px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const SimpleNoticesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const temp = [
  {
    name: '강태연',
    majorCategory: '동네 동행',
    createdAt: '1시간 전',
    notificationId: 4,
  },
  {
    name: '김세리',
    majorCategory: '멀리 동행',
    createdAt: '2시간 전',
    notificationId: 5,
  },
];

function Notify() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    getMatchNotificationList(3).then(response => {
      console.log(response);
      setList(response.data);
    });
  }, []);

  return (
    <Wrapper>
      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="알림" normalContent="이"></BoldText>,
          '도착했어요',
        ]}
      ></Paragraph>

      <SimpleNoticesWrapper>
        {list.map((notice, index) => {
          return (
            <Fragment key={index}>
              <SimpleNotice
                name={notice.name}
                majorCategory={notice.majorCategory}
                createdAt={notice.createdAt}
                onClick={() =>
                  navigate(`/suggest-by-user/${notice.notificationId}`)
                }
              ></SimpleNotice>

              <HorizontalLine height={'2px'}></HorizontalLine>
            </Fragment>
          );
        })}
      </SimpleNoticesWrapper>
    </Wrapper>
  );
}

export default Notify;
