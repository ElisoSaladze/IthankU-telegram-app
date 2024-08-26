/* eslint-disable @typescript-eslint/no-explicit-any */
type Cast<X, Y> = X extends Y ? X : Y;

type Function_ = (...args: any[]) => any[];

type KeyConfig = {
  [k: string]: Function_ | KeyConfig | unknown;
};

type CacheKeyHelperType<T extends KeyConfig, P extends string[] = []> = {
  [k in keyof T]: T[k] extends (...args: any[]) => any[]
    ? {
        toKey: () => [...P, k];
        toKeyWithArgs: (
          ...args: Parameters<T[k]>
        ) => [...P, k, ...ReturnType<T[k]>];
      }
    : T[k] extends KeyConfig
    ? CacheKeyHelperType<Cast<T[k], KeyConfig>, Cast<[...P, k], string[]>> & {
        toKey: () => [...P, k];
      }
    : { toKey: () => [...P, k] };
};

export const buildModuleCacheKey = <T extends KeyConfig>(
  keyConfig: T,
  prefix: string[] = []
): CacheKeyHelperType<T> => {
  const keyFunction = (name: string) => [...prefix, name];
  const toolObject = {} as KeyConfig;

  for (const k of Object.keys(keyConfig)) {
    const v = keyConfig[k];
    if (typeof v === "function") {
      toolObject[k] = {
        toKey: () => keyFunction(k),
        toKeyWithArgs: (...args: unknown[]) => [
          ...keyFunction(k),
          ...v(...args),
        ],
      };
    } else if (v instanceof Object) {
      toolObject[k] = {
        toKey: () => keyFunction(k),
        ...buildModuleCacheKey(v as KeyConfig, keyFunction(k)),
      };
    } else {
      toolObject[k] = {
        toKey: () => keyFunction(k),
      };
    }
  }

  return toolObject as CacheKeyHelperType<T>;
};
