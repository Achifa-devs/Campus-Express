"use server"

import App from "./App";
import './globals.css'; 
import { cookies } from "next/headers";
import StructuredData from './StructuredData'

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
  let data = [];
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Campus Sphere",
    "url": "https://www.campussphere.net/",
    "potentialAction": [{
      "@type": "LoginAction",
      "target": "https://www.campussphere.net/login",
      "name": "Login"
    }, {
      "@type": "CreateAccountAction",
      "target": "https://www.campussphere.net/signup",
      "name": "Sign Up"
    }]
  };

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

  (async function getData() {  // Added async here
    try {
      const res = await fetch(`https://www.campussphere.net/api/products/category?category=${btoa('trends')}&limit=${25}`, {
        headers: {
            'Gender': window.localStorage.getItem('cs-gender') 
        }
      })
  
      let jsonData = await res.json();  // Added await here
      if(jsonData.bool){
        const productData = jsonData.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "name": item.title,
            "image": item.thumbnail_id,
            "url": `https://www.campussphere.net/store/product/${item?.product_id}`,
            "offers": {
              "@type": "Offer",
              "price": item?.price,
              "priceCurrency": "NGN"
            }
          }
        }));
        data=(productData);
      }
    } catch (error) {
      console.log(error)
    }
  })();

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

        <StructuredData data={websiteSchema} />
        <StructuredData data={categorySchema} />
        {/* Add product schema when data is available */}
        {data.length > 0 && (
          <StructuredData data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": data
          }} />
        )}

        <script defer src="https://js.pusher.com/7.2/pusher.min.js"></script>
       
        

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
 
