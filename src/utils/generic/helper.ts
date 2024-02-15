
export const random = () => {
  return [...Array(5)].map(() => Math.random().toString(36)[2]).join("");
};
