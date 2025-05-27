export const dynamic = "force-dynamic";
export const revalidate = 0;

import ProductPageClient from "./product"; // Client component
import Head from "next/head";

export async function generateMetadata({ params }) {
  const slug = params?.slug;

  if (!slug) {
    return { title: "Default Product" };
  }

  try {
    const res = await fetch(
      `https://www.campussphere.net/api/store/products/details?slug=${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch product data");

    const {data} = await res.json();
    const product = data

    console.log('product: ', product)
    if (!product || Object.keys(product).length === 0) {
      return { title: "Product Not Found" };
    }

    const isImg = ["jpg", "jpeg", "png", "gif", "webp"].includes(
      product?.thumbnail_id?.split(".").pop()?.toLowerCase()
    );
    const thumbnail = product?.thumbnail_id || slug;
    const videoUrl = product?.thumbnail_id; // If video is applicable

    const formattedTitle = `${product?.title || slug} - ₦${new Intl.NumberFormat(
      "en-US"
    ).format(product?.price)} (${product?.others?.condition || ""})`;

    return {
      title: formattedTitle,
      alternates: {
        canonical: `https://www.campussphere.net/store/product/${product?.product_id}`,
      },
      url: `https://www.campussphere.net/store/product/${product?.product_id}`,
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: formattedTitle,
        description: product?.description || "",
        url: `https://www.campussphere.net/store/product/${product?.product_id}`,
        type: isImg ? "website" : "video.other",
        ...(isImg
          ? {
              images: [{ url: thumbnail, width: 1200, height: 630 }],
            }
          : {
              videos: [
                {
                  url: videoUrl,
                  secure_url: videoUrl,  // 👈 Add this for HTTPS
                  width: 1280,
                  height: 720,
                  type: "video/mp4",
                },
              ],
            }),
      },
      twitter: {
        card: isImg ? "summary_large_image" : "player",
        title: formattedTitle,
        description: product?.description || "",
        ...(isImg
          ? { images: [thumbnail] }
          : { 
              player: videoUrl, 
              playerStream: videoUrl, // Direct MP4 link
              playerStreamContentType: "video/mp4",
              playerWidth: 1280,
              playerHeight: 720
            }
          ),
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return { title: "Product Details - Campus Sphere" };
  }
}

export default async function ProductPage({ params }) {
  const { slug } = params;
  let product = null;

  if (!slug) {
    return <div>Error: No product slug provided.</div>;
  }

  try {
    const res = await fetch(
      `https://www.campussphere.net/api/store/products/details?slug=${slug}`, 
      { cache: "no-store" }
    );

    
    if (!res.ok) throw new Error("Failed to fetch product");

    product = await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div>Error loading product. Please try again later.</div>;
  }
  // console.log(product?.data)

  return <ProductPageClient slug={slug} product={product?.data} />; 
}
   