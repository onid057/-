import axios from '../utils/instance';

// 고객 예약 확인
const getReservationListByUser = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `users/reservations`,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 고객 예약 상세정보 확인
const getReservationDetailInfoByUser = async roomId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/users/reservations/${roomId}`,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 홈 화면에 띄울 현재 진행 중이거나 가장 빠른 시일 내에 이뤄질 예약 내역
const getFirstReservation = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `/users/reservations/first`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getReservationListByUser,
  getReservationDetailInfoByUser,
  getFirstReservation,
};
