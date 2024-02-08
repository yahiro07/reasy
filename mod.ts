import { useEffect, useMemo, useState } from "preact/hooks";

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
  }, deps);

  const mutations = useMemo(() => {
    const keys = helpers.getObjectKeys(initialState);
    const setters = Object.fromEntries(
      keys.map((key) => {
        const setterKey = `set${helpers.capitalizeFirstLetter(key)}`;
        return [
          setterKey,
          (value: unknown) => {
            if (typeof value === "function") {
              const fn = value;
              setState((prev) => ({ ...prev, [key]: fn(prev[key]) }));
            } else {
              setState((prev) => ({ ...prev, [key]: value }));
            }
          },
        ];
      })
    );
    const set = (attrs: Partial<T>) =>
      setState((prev) => ({ ...prev, ...attrs }));

    return { ...setters, set } as IMutations<T>;
  }, [state]);

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
