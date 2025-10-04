"use server";

import App from "./App";
import "./globals.css";
import StructuredData from "./StructuredData";

export async function generateMetadata() {
  const imageUrl = "https://www.campussphere.net/api/logo";

  return {
    title: "Campus Sphere Nigeria | Online Marketplace For Campus Students",
    description: "Enjoy Free Commerce From The Comfort Of Your Lodge.",
    alternates: { canonical: "https://www.campussphere.net" },
    robots: { index: true, follow: true },
    openGraph: {
      title: "Campus Sphere Nigeria | Online Marketplace For Campus Students",
      description: "Enjoy Free Commerce From The Comfort Of Your Lodge.",
      url: "https://www.campussphere.net",
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Campus Sphere Nigeria | Online Marketplace For Campus Students",
      description: "Enjoy Free Commerce From The Comfort Of Your Lodge.",
      images: [imageUrl],
    },
  };
}

const productSchema = await fetch("https://www.campussphere.net/api/json-ld", {
    next: { revalidate: 3600 },
  })
    .then(res => res.ok ? res.json() : null)
    .then(data => data?.success ? data.data : null)
    .catch(() => null);


export default async function RootLayout({ children }) {
  const categories = [
    { uri: "/store/category/Lodge & Apartments", title: "Lodge & Accommodation" },
    { uri: "/store/category/Services", title: "Services" },
    { uri: "/store/category/Appliances", title: "Appliances" },
    { uri: "/store/category/Mobile Phones", title: "Mobile Phones" },
    { uri: "/store/category/Laptops & Desktops", title: "Laptops & Desktops" },
    { uri: "/store/category/Fashion", title: "Fashion & Clothing" },
    { uri: "/store/", title: "Explore More" },
  ];

  // ✅ WebSite + Navigation Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Campus Sphere",
    url: "https://www.campussphere.net/",
    description: "Sign up, sign in, sell your products, or buy the latest products on campus.",
    hasPart: [
      {
        "@type": "SiteNavigationElement",
        "name": "Sign Up",
        "url": "https://www.campussphere.net/signup"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Sign In",
        "url": "https://www.campussphere.net/login"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Sell Your Products",
        "url": "https://www.campussphere.net/vendor/shop"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Buy Latest Products",
        "url": "https://www.campussphere.net/store"
      },
      // Add categories
      ...categories.slice(0, 5).map(cat => ({
        "@type": "SiteNavigationElement",
        "name": cat.title,
        "url": `https://www.campussphere.net${cat.uri}`
      })),
      {
        "@type": "SiteNavigationElement",
        "name": "Explore More",
        "url": "https://www.campussphere.net/store/"
      }
    ]
  };

  // // ✅ Category schema
  // const categorySchema = {
  //   "@context": "https://schema.org",
  //   "@type": "ItemList",
  //   name: "Product Categories",
  //   description: "Browse products by category on Campus Sphere",
  //   url: "https://www.campussphere.net/store/",
  //   numberOfItems: categories.length,
  //   itemListElement: categories.map((category, index) => ({
  //     "@type": "ListItem",
  //     position: index + 1,
  //     item: {
  //       "@type": "WebPage",
  //       name: category.title,
  //       url: `https://www.campussphere.net${category.uri}`,
  //     },
  //   })),
  // };

  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="facebook-domain-verification" content="98x6w3kel0z4gmv2ofg7bcoybfckmg" />

        {/* Bootstrap via CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <StructuredData data={websiteSchema} />
        {productSchema && <StructuredData data={productSchema} />}
      </head>
      <body style={{ overflowX: "hidden", background: "#f9f9f9" }}>
        <div className="overlay">
          <div className="loader"></div>
        </div>
        <App>{children}</App>

        {/* Bootstrap JS bundle */}
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
