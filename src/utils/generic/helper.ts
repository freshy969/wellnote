
export const random = (length = 5) => {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
};
