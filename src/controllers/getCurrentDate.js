const getCurrentDate = (currentDate) => {
  return `${new Date(Number(currentDate)).getDate()}.${
    new Date(Number(currentDate)).getUTCMonth() + 1
  }.${new Date(Number(currentDate)).getFullYear()}`;
};

export default getCurrentDate;
