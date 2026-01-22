import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import AuthContextProvider from "./AuthContext/AuthContext";
import { Analytics } from "@vercel/analytics/next";
import PersistentAudio from "./components/PersistentAudio";
import PersistentPopupTimer from "./components/PersistentPopupTimer";
import Navbar from "./components/Navbar";
import FooterSection from "./components/FooterSection";

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

      <Script id="zsiqchat" strategy="afterInteractive">
        {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
      </Script>
      <Script
        id="zsiqscript"
        src="https://salesiq.zohopublic.in/widget?wc=siq2d93279f2cff52979471aee22d180a8d7c16ab776be0df21414da77bc4a373b4"
        strategy="afterInteractive"
      />

      <Analytics />
      <PersistentAudio />
      <PersistentPopupTimer />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <FooterSection />
      </div>
    </AuthContextProvider>
  );
}
