import { useEffect, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化后设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 清理副作用，每次在上一个useEffect处理完后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// export const useArray = <v>(array: v[]) => {
//   const [value, setValue] = useState(array);
//   // 清空数据
//   const clear = () => {
//     setValue([])
//   }
//   // 按下标清除数据
//   const removeIndex = (currentIndex: number) => {
//     let arr = [...value];
//     arr.splice(currentIndex, 1);
//     setValue([...arr])
//   }
//   // 添加数据
//   const add = (item: v) => {
//     let arr = [...value];
//     arr.push(item);
//     setValue([...arr])
//   }

//   return {
//     value,
//     clear,
//     removeIndex,
//     add
//   }

// }

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  }
}
