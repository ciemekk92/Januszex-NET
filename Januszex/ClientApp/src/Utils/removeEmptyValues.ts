export const removeEmptyValues = (candidateObj: {
  [x: string]: Unrestricted;
}) => {
  Object.keys(candidateObj).forEach((key: string) => {
    if (candidateObj[key] === '' || candidateObj === null) {
      delete candidateObj[key];
    }
  });

  return candidateObj;
};
