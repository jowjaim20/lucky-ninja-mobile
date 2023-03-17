import React, { useMemo } from "react";
interface ModifyArrayProps<T> {
  array: T[];
  replaceIndex: number;
  item: T;
}
const useModifyArray = <T extends {}>(props: ModifyArrayProps<T>) => {
  const { array, replaceIndex, item } = props;
  let newArray = useMemo(() => {
    if (replaceIndex === -1) {
      return [item, ...array];
    } else {
      const items = Array.from(array);
      items.splice(replaceIndex, 1);
      items.splice(replaceIndex, 0, item);

      return items;
    }
  }, [replaceIndex, item, array]);

  return { newArray };
};

export default useModifyArray;
