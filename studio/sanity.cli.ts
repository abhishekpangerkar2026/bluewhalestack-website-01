import { defineCliConfig } from "sanity/cli";
import path from "node:path";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
  // https://<studioHost>.sanity.studio
  studioHost: process.env.SANITY_STUDIO_HOST ?? "bluewhalestack",
  deployment: { appId: "ty2k9aw3mzi8aw10sww8n95y" },
  autoUpdates: true,
  // the schema is compiled from ../content/cms (shared with the website)
  vite: (config) => ({ ...config, server: { ...config.server, fs: { ...config.server?.fs, allow: [path.resolve(__dirname), path.resolve(__dirname, "..")] } } }),
});
