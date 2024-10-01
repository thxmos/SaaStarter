import { cache } from "react";
import { authCheck } from "./auth-check";
import { prisma } from "@/lib/prisma";

export const createProduct = async (data: any) => {
  try {
    authCheck();
    const createdProduct = await prisma.product.create({
      data,
    });
    return createdProduct;
  } catch (error) {
    console.error("Failed to create product", error);
    return { error: "Failed to create product" };
  }
};

export const findProducts = cache(async () => {
  try {
    authCheck();
    const foundProducts = await prisma.product.findMany();
    return foundProducts;
  } catch (error) {
    console.error(`Failed to find products`, error);
    return { error: "Failed to fetch products" };
  }
});

export const findProductById = cache(async (productId: string) => {
  try {
    authCheck();
    const foundProduct = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!foundProduct) return { error: "Product not found" };
    return foundProduct;
  } catch (error) {
    console.error(`Failed to find user with id ${productId}`, error);
    return { error: "Failed to fetch product" };
  }
});

export const updateProduct = async (productId: string, data: any) => {
  try {
    authCheck();
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data,
    });
    if (!updatedProduct) return { error: "Product not found" };
    return updatedProduct;
  } catch (error) {
    console.log("Failed to update product", error);
    return { error: "Failed to update product" };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    authCheck();
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });
    if (!deletedProduct) return { error: "Product not found" };
    return deletedProduct;
  } catch (error) {
    console.log("Failed to delete product", error);
    return { error: "Failed to delete product" };
  }
};
