import { cache } from "react";
import { authCheck } from "./auth-check";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createProduct = async (options: Prisma.ProductCreateArgs) => {
  try {
    authCheck();
    const createdProduct = await prisma.product.create({
      ...options,
    });
    return createdProduct;
  } catch (error) {
    console.error("Failed to create product", error);
    return { error: "Failed to create product" };
  }
};

export const findProducts = cache(
  async (options: Prisma.ProductFindManyArgs) => {
    try {
      authCheck();
      const foundProducts = await prisma.product.findMany({ ...options });
      return foundProducts;
    } catch (error) {
      console.error(`Failed to find products`, error);
      return { error: "Failed to fetch products" };
    }
  },
);

export const findUniqueProduct = cache(
  async (options: Prisma.ProductFindUniqueArgs) => {
    try {
      authCheck();
      const foundProduct = await prisma.product.findUnique({
        ...options,
      });
      if (!foundProduct) return { error: "Product not found" };
      return foundProduct;
    } catch (error) {
      console.error("Failed to find user", options, error);
      return { error: "Failed to fetch product" };
    }
  },
);

export const updateProduct = async (options: Prisma.ProductUpdateArgs) => {
  try {
    authCheck();
    const updatedProduct = await prisma.product.update({
      ...options,
    });
    if (!updatedProduct) return { error: "Product not found" };
    return updatedProduct;
  } catch (error) {
    console.log("Failed to update product", error);
    return { error: "Failed to update product" };
  }
};

export const deleteProduct = async (options: Prisma.ProductDeleteArgs) => {
  try {
    authCheck();
    const deletedProduct = await prisma.product.delete({
      ...options,
    });
    if (!deletedProduct) return { error: "Product not found" };
    return deletedProduct;
  } catch (error) {
    console.log("Failed to delete product", error);
    return { error: "Failed to delete product" };
  }
};
