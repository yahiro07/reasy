import { useEffect, useMemo, useState } from "react";

export type IMutations<T> = {
  [K in keyof T as `set${Capitalize<K & string>}`]: (
    value: T[K] | ((prev: T[K]) => T[K])
  ) => void;
} & {
  set(value: Partial<T>): void;
};

export function useReasyState<T extends Record<string, unknown>>(
  initialState: T,
  deps: unknown[] = []
): [T, IMutations<T>] {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (initialState !== state) {
      setState(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const mutations = useMemo(() => {
    const keys = helpers.getObjectKeys(state);
    const setters = Object.fromEntries(
      keys.map((key) => {
        const setterKey = `set${helpers.capitalizeFirstLetter(key)}`;
        return [
          setterKey,
          (value: unknown) => {
            if (typeof value === "function") {
              const fn = value;
              setState((prev: any) => ({ ...prev, [key]: fn(prev[key]) }));
            } else {
              setState((prev: any) => ({ ...prev, [key]: value }));
            }
          },
        ];
      })
    );
    const set = (attrs: Partial<T>) =>
      setState((prev: any) => ({ ...prev, ...attrs }));

    return { ...setters, set } as IMutations<T>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, mutations];
}

const helpers = {
  getObjectKeys<T extends Record<string, unknown>>(
    obj: T
  ): Extract<keyof T, string>[] {
    return Object.keys(obj) as Extract<keyof T, string>[];
  },
  capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  },
};
