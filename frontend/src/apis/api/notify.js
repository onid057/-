import axios from '../utils/instance';

// 고객이나 집사로부터 온 알림 리스트
const getMatchNotificationList = async userId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/users/${userId}/notifications`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 집사가 확인하는 매칭 제안 알림 상세
const getMatchNotificationByUser = async notificationId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/notifications/${notificationId}/zipsa`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 집사가 고객의 제안 거절
const rejectSuggestionByUser = async notificationId => {
  try {
    const response = await axios({
      method: 'delete',
      url: `/notifications/${notificationId}/rejection`,
      mode: 'cors',
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getMatchNotificationList,
  getMatchNotificationByUser,
  rejectSuggestionByUser,
};
