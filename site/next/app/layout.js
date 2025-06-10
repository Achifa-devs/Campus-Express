"use server"

import App from "./App";
import './globals.css'; 
import { cookies } from "next/headers";
import StructuredData from './StructuredData'

export async function generateMetadata() {
  const imageUrl = 'https://www.campussphere.net/api/logo';

  return {
    title: 'Campus Sphere Nigeria | Online Marketplace For Campus Students',
    description: 'Enjoy Free Commerce From The Comfort Of Your Lodge.',
    alternates: {
      canonical: 'https://www.campussphere.net'
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Campus Sphere Nigeria | Online Marketplace For Campus Students',
      description: 'Enjoy Free Commerce From The Comfort Of Your Lodge.',
      url: 'https://www.campussphere.net',
      type: 'website',
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Campus Sphere Nigeria | Online Marketplace For Campus Students',
      description: 'Enjoy Free Commerce From The Comfort Of Your Lodge.',
      images: [imageUrl],
    },
  };
}

export default async function RootLayout({ children }) {
  const categories = [
    { uri: '/store/category/Lodge & Accomodation', title: 'Lodge & Accomodation' },
    { uri: '/store/category/Services', title: 'Services' },
    { uri: '/store/category/Appliances', title: 'Appliances' },
    { uri: '/store/category/Mobile Phones', title: 'Mobile Phones' },
    { uri: '/store/category/Laptops', title: 'Laptops' },
    { uri: '/store/category/Fashion & Clothing', title: 'Fashion & Clothing' },
    { uri: '/store/category/Study Materials', title: 'Study Materials' },
    { uri: '/store/', title: 'Explore More' },
  ];

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Campus Sphere",
    "url": "https://www.campussphere.net/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.campussphere.net/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Category schema
  const categorySchema = {
    "@context": "https://schema.org", 
    "@type": "ItemList",
    "name": "Product Categories",
    "description": "Browse products by category on Campus Sphere",
    "url": "https://www.campussphere.net/store/",
    "numberOfItems": categories.length,
    "itemListElement": categories.map((category, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "WebPage",
        "name": category.title,
        "url": `https://www.campussphere.net${category.uri}` 
      }
    }))
  };

  // Fetch product schema
  let productSchema = null;
  try {
    const res = await fetch(`https://www.campussphere.net/api/json-ld`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
 
    // First check if response is OK
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    // Then verify content type is JSON
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid content type received');
    }

    const { bool, data } = await res.json();
    if (bool) productSchema = data;
  } catch (error) {
    console.error("Error fetching product schema:", error.message);
    // You might want to log this to an error tracking service
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="facebook-domain-verification" content="98x6w3kel0z4gmv2ofg7bcoybfckmg" />

        {/* Bootstrap CSS */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <StructuredData data={websiteSchema} />
        <StructuredData data={categorySchema} />
        {productSchema && <StructuredData data={productSchema} />}

        {/* External Scripts */}
        <script 
          defer 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" 
          crossOrigin="anonymous"
        ></script>
      </head>
      <body style={{ overflowX: 'hidden', background: '#f9f9f9' }}>
        <div className="overlay">
          <div className="loader"></div>
        </div>
        <App>
          {children}
        </App>
      </body>
    </html>
  );
}