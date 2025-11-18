"use server";

import { newFlag } from "./lib/flags";

export async function getFlagValue() {
  const flagValue = await newFlag();
  return flagValue;
}
