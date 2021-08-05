import { DynamicConstants } from "./types";

export const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

export let dynamicConstants: DynamicConstants;

export const loadDynamicConstants = async (): Promise<void> => {
  if (dynamicConstants) {
    return;
  }
  const response = await fetch("/config/config.json");
  dynamicConstants = await response.json();
};
