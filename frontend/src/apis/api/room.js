import axios from '../utils/instance';

// createRoomFunnel에서 얻은 정보를 토대로 공개방 생성
const makeRoom = async (
  userId,
  subCategoryId,
  title,
  content,
  place,
  estimateDuration,
  roomCreatedAt,
  expectationStartedAt,
  expectationEndedAt,
  expectationPay,
) => {
  try {
    const response = await axios({
      method: 'post',
      url: '/rooms/',
      data: {
        userId,
        subCategoryId,
        title,
        content,
        place,
        estimateDuration,
        roomCreatedAt,
        expectationStartedAt,
        expectationEndedAt,
        expectationPay,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 사용자 본인이 생성한 방 목록 구하기
const getUserRoomList = async () =>
  // 데이터 input 기입하기
  {
    try {
      const response = await axios({
        method: 'get',
        url: '/주소입력하기!',
        data: {
          userId,
          subCategoryId,
          title,
          content,
          place,
          estimateDuration,
          roomCreatedAt,
          expectationStartedAt,
          expectationEndedAt,
          expectationPay,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

// 집사기준, 사용자들이 생성한 모든 방 목록 보여주기
const getZipsaRoomList = async () =>
  // 데이터 input 기입하기
  {
    try {
      const response = await axios({
        method: 'get',
        url: '/주소입력하기!',
        data: {
          userId,
          subCategoryId,
          title,
          content,
          place,
          estimateDuration,
          roomCreatedAt,
          expectationStartedAt,
          expectationEndedAt,
          expectationPay,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export { makeRoom, getUserRoomList, getZipsaRoomList };
