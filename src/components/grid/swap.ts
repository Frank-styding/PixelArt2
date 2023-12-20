export const swap = <T>(list: T[], idx: number, targetIdx: number): T[] => {
  const _list = [...list];
  const item = _list[idx];
  _list.splice(idx, 1);
  _list.splice(targetIdx, 0, item);
  return _list;
};
