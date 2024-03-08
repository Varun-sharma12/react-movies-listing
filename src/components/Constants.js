//This file contains the constants used in various files
export const key = "adc45703";
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);