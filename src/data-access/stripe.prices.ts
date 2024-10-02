import { cache } from "react";
import { authCheck } from "./auth-check";
import { prisma } from "@/lib/prisma";
import { Price, Prisma } from "@prisma/client";

export const createPrice = async (
  options: Prisma.PriceCreateArgs,
): Promise<{ success?: boolean; error?: string }> => {
  try {
    authCheck();
    await prisma.price.create({
      ...options,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to create price", error);
    return { error: "Failed to create price" };
  }
};

export const findPrices = cache(
  async (
    options?: Prisma.PriceFindManyArgs,
  ): Promise<{ prices: Price[]; error?: string }> => {
    try {
      authCheck();
      const foundPrices = await prisma.price.findMany({ ...options });
      return { prices: foundPrices };
    } catch (error) {
      console.error(`Failed to find prices`, error);
      return { prices: [], error: "Failed to fetch prices" };
    }
  },
);

export const findUniquePrice = cache(
  async (
    options: Prisma.PriceFindUniqueArgs,
  ): Promise<{ price?: Price; error?: string }> => {
    try {
      authCheck();
      const foundPrice = await prisma.price.findUnique({
        ...options,
      });
      if (!foundPrice) return { error: "Price not found" };
      return { price: foundPrice };
    } catch (error) {
      console.error("Failed to find price with options", options, error);
      return { error: "Failed to fetch price" };
    }
  },
);

export const updatePrice = async (
  options: Prisma.PriceUpdateArgs,
): Promise<{ success?: boolean; error?: string }> => {
  try {
    authCheck();
    const updatedPrice = await prisma.price.update({
      ...options,
    });
    if (!updatedPrice) return { error: "Price not found" };
    return { success: true };
  } catch (error) {
    console.error("Failed to update price", error);
    return { error: "Failed to update price" };
  }
};

export const deletePrice = async (
  options: Prisma.PriceDeleteArgs,
): Promise<{ success?: boolean; error?: string }> => {
  try {
    authCheck();
    const deletedPrice = await prisma.price.delete({
      ...options,
    });
    if (!deletedPrice) return { error: "Price not found" };
    return { success: true };
  } catch (error) {
    console.error("Failed to delete price", error);
    return { error: "Failed to delete price" };
  }
};
