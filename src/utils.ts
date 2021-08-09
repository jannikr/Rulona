import React from "react";

export const setInputValue = (
  value: string,
  ref: React.MutableRefObject<HTMLInputElement | undefined>
): void => {
  if (!ref.current) return;
  const prototype = Object.getPrototypeOf(ref.current);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    "value"
  )?.set;
  prototypeValueSetter?.call(ref.current, value);
  ref.current.dispatchEvent(new Event("input", { bubbles: true }));
};

export const rootStyles = getComputedStyle(document.documentElement);
