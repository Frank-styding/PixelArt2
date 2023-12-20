import { useState } from "react";

export const useSizes = (width: number, count: number) => {
  const [sizes, setList] = useState<number[]>(new Array(count).fill(width));
  const setSize = (idx: number, size: number) => {
    const n_list = [...sizes];
    n_list[idx] = size;
    setList(n_list);
  };
  const getSize = (idx: number) => {
    return sizes[idx];
  };

  const getSum = (idx?: number) => {
    let n_list = sizes;
    if (idx !== undefined) {
      n_list = sizes.slice(0, idx);
    }

    if (sizes.length == 0) {
      return 0;
    }

    const result = n_list.reduce((pre, value) => pre + value, 0);

    if (isNaN(result)) {
      return 0;
    }

    return result;
  };

  return { getSize, getSum, setSize, sizes };
};
