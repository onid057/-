import axios from '../utils/instance';

// SSE 구독
const subscribeSSE = async userId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/sse/${userId}`,
      headers: { Accept: 'text/event-stream' },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { subscribeSSE };
