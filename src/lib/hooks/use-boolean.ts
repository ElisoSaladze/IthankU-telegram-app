import { useCallback, useEffect, useMemo, useState } from 'react';

export type UseBooleanOutput = {
  isTrue: boolean;
  isFalse: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  setValue: (value: boolean) => void;
};

export const useBoolean = (initialValue?: boolean): UseBooleanOutput => {
  const [isTrue, setIsTrue] = useState(initialValue ?? false);

  useEffect(() => {
    setIsTrue(initialValue ?? false);
  }, [initialValue]);

  const setTrue = useCallback(() => {
    setIsTrue(true);
  }, []);

  const setFalse = useCallback(() => {
    setIsTrue(false);
  }, []);

  const setValue = useCallback((value: boolean) => {
    setIsTrue(value);
  }, []);

  const toggle = useCallback(() => {
    setIsTrue((previousIsTrue) => !previousIsTrue);
  }, []);

  return useMemo(() => {
    return {
      isTrue,
      isFalse: !isTrue,
      setTrue,
      setFalse,
      setValue,
      toggle,
    };
  }, [isTrue, setFalse, setTrue, setValue, toggle]);
};
