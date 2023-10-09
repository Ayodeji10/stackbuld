export const getDate = (string: string) => {
  return `${new Date(string).toString().substring(0, 15)}, 
    ${new Date(string).toString().substring(16, 21)}
    ${
      Number(new Date(string).toString().substring(16, 18)) >= 12 ? "pm" : "am"
    }`;
};
