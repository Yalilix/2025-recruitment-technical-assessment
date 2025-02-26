export const getImagesWebp = (format) => {
  const importImages = import.meta.glob('../assets/*.webp', { eager: true });
  return Object.entries(importImages).map(([_, module]) => module.default);
};

export const getRoomAvailableColors = ({ numRooms }) => {
  if (numRooms === 0) {
    return 'bg-red-400';
  } else if (numRooms < 5) {
    return 'bg-orange-400';
  } else {
    return 'bg-green-600';
  }
};
