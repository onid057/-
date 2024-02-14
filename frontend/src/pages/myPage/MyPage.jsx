import { useUserInfo } from '../../hooks/useUserInfo';
import UserMyPage from '../userMyPage/UserMyPage';
import ZipsaMyPageMain from '../zipsaMyPage/ZipsaMyPageMain';

function MyPage() {
  const userState = useUserInfo(state => state.userState);
  return userState === 'USER' ? <UserMyPage /> : <ZipsaMyPageMain />;
}

export default MyPage;
