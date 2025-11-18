// import { verifyAccess, type ApiData } from 'flags';
// import { testingFeatureFlag } from '@/lib/flags';

// export async function GET(request: Request) {
//   // Verify access from Vercel Toolbar
//   const access = await verifyAccess(request.headers.get('Authorization'));

//   if (!access) {
//     return Response.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   // Prepare flag definitions for the Toolbar
//   const apiData: ApiData = {
//     definitions: {
//       testingFeature: testingFeatureFlag,
//     },
//   };

//   // Return the flags discovery response
//   return Response.json(apiData);
// }
import { getProviderData, createFlagsDiscoveryEndpoint } from "flags/next";
import * as flags from "@/lib/flags";

// This function handles the authorization check for you
export const GET = createFlagsDiscoveryEndpoint(async (request) => {
  // your previous logic in here to gather your feature flags
  const apiData = await getProviderData(flags);

  // return the ApiData directly, without a NextResponse.json object.
  return apiData;
});
