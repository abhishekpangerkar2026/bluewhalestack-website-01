import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";

// The brand guidelines call for "a clean geometric sans" on screen (Calibri
// is the print face). Plus Jakarta Sans carries the whole hierarchy; the mono
// is kept only for code samples in the docs.
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans-src",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-src",
  display: "swap",
});

/** The class names that switch the CSS font variables on — also copied into the builder's preview frame. */
export const fontClass = `${jakarta.variable} ${plexMono.variable}`;
