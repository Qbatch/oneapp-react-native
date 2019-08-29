export const getImageUrl = ({ imageUrl }) => {
  return imageUrl ? `https://images-na.ssl-images-amazon.com/images/I/${imageUrl}` : false;
};
