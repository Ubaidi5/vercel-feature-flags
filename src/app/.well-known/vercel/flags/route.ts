import { getProviderData, createFlagsDiscoveryEndpoint } from "flags/next";
import * as flags from "@/lib/flags";

// This endpoint is used by Vercel Toolbar to discover your flags
export const GET = createFlagsDiscoveryEndpoint(() => getProviderData(flags));

