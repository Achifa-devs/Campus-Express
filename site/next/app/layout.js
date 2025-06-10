"use server"

import App from "./App";
import './globals.css'; 
import { cookies } from "next/headers";

const maxAge = 90 * 24 * 60 * 60; 
 
// export async function setNewCookie(data,role) {
//   let cookieStore = cookies();
//   const expires = new Date();
//   let result = cookieStore.set(role === 0 ? 'user_secret' : 'user_secret', data, {expires: expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000))});
//   return JSON.stringify(result);
// }

export async function generateMetadata({ params }) {
  const slug = params?.slug;

  if (!slug) {
    return {
      title: 'Campus Sphere Nigeria | Online Marketplace For Campus Students',
    };
  }
  const data = await res.json();

  const imageUrl = 'https://www.campussphere.net/api/logo';

  return {
    title: `Campus Sphere Nigeria | Online Marketplace For Campus Students`,
    alternates: {
      canonical: `https://www.campussphere.net`
    },
    url: `https://www.campussphere.net`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `Campus Sphere Nigeria | Online Marketplace For Campus Students`,
      description: `Enjoy Free Commerce From The Comfort Of Your Lodge.`,
      url: `https://www.campussphere.net`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Campus Sphere Nigeria | Online Marketplace For Campus Students`,
      url: `https://www.campussphere.net`,
      description: `Enjoy Free Commerce From The Comfort Of Your Lodge.`,
      images: [imageUrl],
    },
  };
}


export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="facebook-domain-verification" content="98x6w3kel0z4gmv2ofg7bcoybfckmg" />

        <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" as="style" onload="this.rel='stylesheet'" />
        <noscript>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
        </noscript>

        <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
          crossorigin="anonymous"></script>

        <script defer src="https://www.googletagmanager.com/gtag/js?id=AW-11150712607"></script>
        {/* <script>
          window?.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments) }
          gtag('js', new Date());
          gtag('config', 'AW-11150712607');
        </script> */}

        <script defer src="https://js.pusher.com/7.2/pusher.min.js"></script>
       
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.campussphere.net/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.campussphere.net/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        </script>

      </head>
      <body style={{ overflowX: 'hidden', background: '#f9f9f9' }}>
        <div className="overlay">
          <div className="loader">
          </div>
        </div>
        {
          <App>
            {children}
          </App>
        }
      </body>
    </html>
  );
}
 
