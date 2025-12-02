import { Metadata } from "next";
import JardinDAfrique from "./JardinClient";

export const metadata: Metadata = {
  title: "Jardin d'Afrique - Yassine Radhouani | Aga Khan Award 2022",
  description: "Discover Jardin d'Afrique, a sanctuary for missing migrants designed by Rachid Koraïchi, featuring Yassine Radhouani's artistic contributions. Winner of the Aga Khan Award for Architecture 2022.",
  alternates: {
    canonical: "https://www.yassineradhouani.me/jardin-d-afrique",
  },
};

export default function Page() {
  return <JardinDAfrique />;
}
