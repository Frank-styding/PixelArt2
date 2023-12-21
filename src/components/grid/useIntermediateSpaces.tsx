import { useState } from "react";

export const useIntermediateSpaces = (width: number, count: number) => {
  const [spaces, setSpaces] = useState<number[]>(new Array(count).fill(width));
  const setSpace = (idx: number, size: number) => {
    const n_list = [...spaces];
    n_list[idx] = size;
    setSpaces(n_list);
  };
  const getSpace = (idx: number) => {
    return spaces[idx];
  };

  const getSumOfSpaces = (idx?: number) => {
    let n_list = spaces;
    if (idx !== undefined) {
      n_list = spaces.slice(0, idx);
    }

    if (spaces.length == 0) {
      return 0;
    }

    const result = n_list.reduce((pre, value) => pre + value, 0);

    if (isNaN(result)) {
      return 0;
    }

    return result;
  };

  const insertItem = () => {
    const n_list = [...spaces, width];
    setSpaces(n_list);
  };

  return {
    getSpace,
    getSumOfSpaces,
    setSpace,
    spaces,
    insertItem,
  };
};
