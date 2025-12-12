import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import AuthContextProvider from "./AuthContext/AuthContext";
import { Analytics } from "@vercel/analytics/next";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Head>
        {/* Basic Metadata */}
        <title>
          Eco-Friendly Luxury Villas in Sarjapur | The Chimes by Raise Infra
        </title>
        <meta
          name="description"
          content="Discover The Chimes in Sarjapur—green-certified luxury villas with solar power, mud-brick cooling, vastu design, and premium amenities across 6.5 acres."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Eco-Friendly Luxury Villas in Sarjapur | The Chimes by Raise Infra"
        />
        <meta
          property="og:description"
          content="Discover The Chimes in Sarjapur—green-certified luxury villas with solar power, mud-brick cooling, vastu design, and premium amenities across 6.5 acres."
        />
        <meta property="og:image" content="/assets/Website.webp" />
        <meta property="og:url" content="https://www.raiseinfra.in" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Eco-Friendly Luxury Villas in Sarjapur | The Chimes by Raise Infra"
        />
        <meta
          name="twitter:description"
          content="Discover The Chimes in Sarjapur—green-certified luxury villas."
        />
        <meta name="twitter:image" content="/assets/Website.webp" />
      </Head>

      <Analytics />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
