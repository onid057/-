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
      url: '/rooms',
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
const getUserRoomList = async userId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/users/${userId}/rooms`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 공개방 상세 페이지 조회
const getRoomDetailInfo = async roomId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/rooms/${roomId}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 사용자기준, 공개방 상세페이지에서 해당 방에 등록된 요청리스트 조회
const getZipsaListFromDetailInfo = async roomId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/rooms/${roomId}/notifications`,
    });
    return response.data.data.roomNotificationList;
  } catch (error) {
    console.log(error);
  }
};

// 사용자기준, 공개방 상세페이지에서 해당 방의 요청리스트 중 집사 요청 수락
const acceptZipsaRequest = async notificationId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/notifications/${notificationId}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 집사기준, 사용자들이 생성한 모든 방 목록 보여주기
const getZipsaRoomList = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `/helpers/rooms?page=1&size=100`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 집사기준, 공개방 참가신청하기
const applyForRoom = async (roomId, zipsaId) => {
  try {
    const response = await axios({
      method: 'post',
      url: `/helpers/participation`,
      data: {
        roomId,
        zipsaId,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  makeRoom,
  acceptZipsaRequest,
  getUserRoomList,
  getZipsaRoomList,
  getRoomDetailInfo,
  getZipsaListFromDetailInfo,
  applyForRoom,
};
