import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { Prisma, Product } from "@prisma/client";

export const createProduct = async (
  options: Prisma.ProductCreateArgs,
): Promise<{ success?: boolean; error?: string }> => {
  try {
    await prisma.product.create({
      ...options,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to create product", error);
    return { error: "Failed to create user" };
  }
};

export const findProducts = cache(
  async (
    options?: Prisma.ProductFindManyArgs,
  ): Promise<{ products: Product[]; error?: string }> => {
    try {
      const foundProducts = await prisma.product.findMany({ ...options });
      return { products: foundProducts };
    } catch (error) {
      console.error(`Failed to find products`, error);
      return { products: [], error: "Failed to fetch products" };
    }
  },
);

export const findUniqueProduct = cache(
  async (
    options: Prisma.ProductFindUniqueArgs,
  ): Promise<{ product?: Product; error?: string }> => {
    try {
      const foundProduct = await prisma.product.findUnique({
        ...options,
      });
      if (!foundProduct) return { error: "Product not found" };
      return { product: foundProduct };
    } catch (error) {
      console.error("Failed to find user", options, error);
      return { error: "Failed to fetch product" };
    }
  },
);

export const updateProduct = async (
  options: Prisma.ProductUpdateArgs,
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const updatedProduct = await prisma.product.update({
      ...options,
    });
    return { success: true };
  } catch (error) {
    console.log("Failed to update product", error);
    return { error: "Failed to update product" };
  }
};

export const deleteProduct = async (
  options: Prisma.ProductDeleteArgs,
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const deletedProduct = await prisma.product.delete({
      ...options,
    });
    if (!deletedProduct) return { error: "Product not found" };
    return { success: true };
  } catch (error) {
    console.log("Failed to delete product", error);
    return { error: "Failed to delete product" };
  }
};

export async function deleteProductByStripeProductId(
  stripeProductId: string,
): Promise<void> {
  await prisma.product.delete({ where: { stripeProductId } });
}
