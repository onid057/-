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

export { makeRoom };
