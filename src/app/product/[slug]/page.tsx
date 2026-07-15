import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '../../../services/products.service';
import ProductDetailsClient from '../../../components/product/ProductDetailsClient';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate SEO Metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | JEWEL',
      description: 'The requested luxury jewellery piece could not be found.',
    };
  }

  return {
    title: `${product.title} | House of Jewel`,
    description: `${product.description} Explore premium handcrafted ${product.category.toLowerCase()} at House of Jewel.`,
    openGraph: {
      title: `${product.title} | House of Jewel`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products (excluding current product and drafts)
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.id !== "SKU-005")
    .slice(0, 4);

  return (
    <ProductDetailsClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
