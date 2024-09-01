export const formatDate = (createdAtString) => {
  const createdAtDate = new Date(createdAtString);
  const year = createdAtDate.getFullYear();
  const month = String(createdAtDate.getMonth() + 1).padStart(2, '0');
  const day = String(createdAtDate.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};

export const daysAgoFunction = (mongodbTime) => {
  const createdAt = new Date(mongodbTime);
  const currentTime = new Date();
  const timeDifference = currentTime - createdAt;
  return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
};
