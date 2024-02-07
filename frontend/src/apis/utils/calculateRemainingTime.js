const calculateRemainingTime = roomCreatedAt => {
  const createAt = new Date(roomCreatedAt);
  const currentTime = new Date();
  const expirationTime = new Date(createAt.getTime() + 24 * 60 * 60 * 1000);
  const diff = expirationTime - currentTime;
  const remainingHours = Math.floor(diff / (1000 * 60 * 60));
  const remaingMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${remainingHours}시간 ${remaingMinutes}분`;
};

export default calculateRemainingTime;
