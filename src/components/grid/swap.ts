export const swap = <T>(list: T[], idx: number, targetIdx: number): T[] => {
  const n_list = [...list];
  const item = list[idx];
  n_list.splice(idx, 1);
  n_list.splice(targetIdx, 0, item);
  return n_list;
};
