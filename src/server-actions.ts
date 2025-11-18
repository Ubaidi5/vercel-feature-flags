"use server";

import { newFlag } from "./lib/flags";
import { createClient } from "@vercel/edge-config";

const edgeConfig = process.env.EDGE_CONFIG
  ? createClient(process.env.EDGE_CONFIG)
  : null;

export async function getFlagValue(userEmail?: string) {
  const flagValue = await newFlag();
  
  // If flag is not enabled or no email provided, return false
  if (!flagValue || !userEmail) {
    return false;
  }
  
  // Get email domains from edge config
  if (!edgeConfig) {
    return false;
  }
  
  const emailDomains = await edgeConfig.get<string[]>("email-domains");
  if (!emailDomains || emailDomains.length === 0) {
    return false;
  }
  
  // Check if user's email domain matches any allowed domain
  const userDomain = userEmail.split("@")[1];
  return emailDomains.includes(userDomain);
}
