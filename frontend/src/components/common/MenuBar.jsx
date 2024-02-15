import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Image from './Image';

const Wrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  width: 320px;
  height: 59px;
  display: flex;
  margin-top: 20px;
  margin-left: -16px;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 25px 25px 0 0;
  font-size: 11px;
  font-weight: 400;
  z-index: 9999;
  padding: 0 20px;
`;

const MenuWrapper = styled.div`
  width: 41px;
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${props => (props.selected ? '#000000' : '#a7acb4')};
`;

function MenuBar({ currentMenu, isWorked, disabled }) {
  const navigate = useNavigate();

  const homeImageURL =
    process.env.PUBLIC_URL +
    (currentMenu === 'HOME' ? '/images/selected_home.svg' : '/images/home.svg');
  const directoryImageURL =
    process.env.PUBLIC_URL +
    (currentMenu === 'POST'
      ? '/images/selected_directory.svg'
      : '/images/directory.svg');
  const searchImageURL =
    process.env.PUBLIC_URL +
    (currentMenu === 'SEARCH'
      ? '/images/selected_search.svg'
      : '/images/search.svg');
  const reservationImageURL =
    process.env.PUBLIC_URL +
    (currentMenu === 'RESERVE'
      ? '/images/selected_reservation.svg'
      : '/images/reservation.svg');
  const userImageURL =
    process.env.PUBLIC_URL +
    (currentMenu === 'USER' ? '/images/selected_user.svg' : '/images/user.svg');

  return (
    <Wrapper>
      <MenuWrapper selected={currentMenu === 'HOME'}>
        <Image
          src={homeImageURL}
          width="28px"
          height="29px"
          onClick={() => navigate('/')}
        ></Image>
        홈
      </MenuWrapper>

      <MenuWrapper selected={currentMenu === 'POST'}>
        <Image
          src={directoryImageURL}
          width="32px"
          height="24px"
          margin="2px 0 0 0"
          onClick={disabled ? undefined : () => navigate('/boards')}
        ></Image>
        게시판
      </MenuWrapper>

      {!isWorked && (
        <MenuWrapper selected={currentMenu === 'SEARCH'}>
          <Image
            src={searchImageURL}
            width="28px"
            height="28px"
            onClick={disabled ? undefined : () => navigate('/matchOption')}
          ></Image>
          집사찾기
        </MenuWrapper>
      )}

      <MenuWrapper selected={currentMenu === 'RESERVE'}>
        <Image
          src={reservationImageURL}
          width="27px"
          height="27px"
          onClick={disabled ? undefined : () => navigate('/reserve')}
        ></Image>
        예약
      </MenuWrapper>

      <MenuWrapper selected={currentMenu === 'USER'}>
        <Image
          src={userImageURL}
          width="24px"
          height="27px"
          onClick={disabled ? undefined : () => navigate('/myPage')}
        ></Image>
        사용자
      </MenuWrapper>
    </Wrapper>
  );
}

export default MenuBar;
