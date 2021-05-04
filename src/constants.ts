import { DynamicConstants } from "./types";

export let dynamicConstants: DynamicConstants;

export const loadDynamicConstants = async (): Promise<void> => {
  if (dynamicConstants) {
    return;
  }
  const response = await fetch("/config/config.json");
  dynamicConstants = await response.json();
};
