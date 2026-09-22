import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
  // https://<studioHost>.sanity.studio
  studioHost: process.env.SANITY_STUDIO_HOST ?? "bluewhalestack",
  deployment: { appId: "ty2k9aw3mzi8aw10sww8n95y" },
  autoUpdates: true,
});
