"use server";

import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { Prisma, Product } from "@prisma/client";

export const createProduct = async (
  options: Prisma.ProductCreateArgs,
): Promise<{ success?: boolean; product?: Product; error?: string }> => {
  try {
    const createdProduct = await prisma.product.create({
      ...options,
    });
    return { success: true, product: createdProduct };
  } catch (error) {
    console.error("Failed to create product", error);
    return { error: "Failed to create product" };
  }
};

export const findProducts = cache(
  async (
    options?: Prisma.ProductFindManyArgs,
  ): Promise<{ success?: boolean; products?: Product[]; error?: string }> => {
    try {
      const foundProducts = await prisma.product.findMany({ ...options });
      return { success: true, products: foundProducts };
    } catch (error) {
      console.error(`Failed to find products`, error);
      return { error: "Failed to fetch products" };
    }
  },
);

export const findUniqueProduct = cache(
  async (
    options: Prisma.ProductFindUniqueArgs,
  ): Promise<{ success?: boolean; product?: Product; error?: string }> => {
    try {
      const foundProduct = await prisma.product.findUnique({
        ...options,
      });
      if (!foundProduct) return { error: "Product not found" };
      return {
        success: true,
        product: foundProduct,
      };
    } catch (error) {
      console.error("Failed to find product with options", options, error);
      return { error: "Failed to fetch product" };
    }
  },
);

export const updateProduct = async (
  options: Prisma.ProductUpdateArgs,
): Promise<{ success?: boolean; product?: Product; error?: string }> => {
  try {
    const updatedProduct = await prisma.product.update({
      ...options,
    });
    return { success: true, product: updatedProduct };
  } catch (error) {
    console.error("Failed to update product", error);
    return { error: "Failed to update product" };
  }
};

export const deleteProduct = async (
  options: Prisma.ProductDeleteArgs,
): Promise<{ success?: boolean; product?: Product; error?: string }> => {
  try {
    const deletedProduct = await prisma.product.delete({ ...options });
    return { success: true, product: deletedProduct };
  } catch (error) {
    console.error("Failed to delete product", error);
    return { error: "Failed to delete product" };
  }
};
