// src/app/page.tsx
import { Metadata } from "next";
import { getMetadata } from "./metadata";
import HomeClient from "./HomeClient";

export const metadata: Metadata = getMetadata();

export default function HomePage() {
  return <HomeClient />;
}
