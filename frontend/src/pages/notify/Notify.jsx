import styled from 'styled-components';
import SimpleNotice from '../../components/common/SimpleNotice';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import HorizontalLine from '../../components/common/HorizontalLine';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';

import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getMatchNotificationList,
  deleteNotification,
} from '../../apis/api/notify';
import { calculateRemainDate } from '../../utils/time';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px 25px;
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
const TextWrapper = styled.div`
  margin: 0 auto;
  color: #d9d9d9;
`;

function Notify() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    getMatchNotificationList().then(response => {
      console.log(response);
      setList(response.data);
    });
  }, []);

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
        onPrevious={() => navigate('/')}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="알림" normalContent="이"></BoldText>,
          '도착했어요!',
        ]}
        margin="0 0 20px 0"
      ></Paragraph>

      {list?.length === 0 ? (
        <TextWrapper>알림이 없습니다.</TextWrapper>
      ) : (
        <SimpleNoticesWrapper>
          {list.map((notice, index) => {
            return (
              <Fragment key={index}>
                <SimpleNotice
                  mode={notice.type}
                  status={notice.status}
                  name={notice.name}
                  majorCategory={notice.majorCategory}
                  createdAt={calculateRemainDate(notice.createdAt)}
                  onClick={async () => {
                    await deleteNotification(notice.notificationId).then(
                      response => console.log(response),
                    );
                    notice.status === 'CONFIRM'
                      ? navigate(`/reportDetail/${notice.roomId}`)
                      : notice.type === 'ZIPSA'
                        ? navigate(`/suggest-by-user/${notice.notificationId}`)
                        : navigate(`/rooms/detail/${notice.roomId}`);
                  }}
                ></SimpleNotice>

                <HorizontalLine height={'2px'}></HorizontalLine>
              </Fragment>
            );
          })}
        </SimpleNoticesWrapper>
      )}
    </Wrapper>
  );
}

export default Notify;
