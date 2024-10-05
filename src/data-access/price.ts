"use server";

import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { Prisma, Price } from "@prisma/client";

export const createPrice = async (
  options: Prisma.PriceCreateArgs,
): Promise<{ success?: boolean; price?: Price; error?: string }> => {
  try {
    const createdPrice = await prisma.price.create({
      ...options,
    });
    return { success: true, price: createdPrice };
  } catch (error) {
    console.error("Failed to create price", error);
    return { error: "Failed to create price" };
  }
};

export const findPrices = cache(
  async (
    options?: Prisma.PriceFindManyArgs,
  ): Promise<{ success?: boolean; prices?: Price[]; error?: string }> => {
    try {
      const foundPrices = await prisma.price.findMany({ ...options });
      return { success: true, prices: foundPrices };
    } catch (error) {
      console.error(`Failed to find prices`, error);
      return { error: "Failed to fetch prices" };
    }
  },
);

export const findUniquePrice = cache(
  async (
    options: Prisma.PriceFindUniqueArgs,
  ): Promise<{ success?: boolean; price?: Price; error?: string }> => {
    try {
      const foundPrice = await prisma.price.findUnique({
        ...options,
      });
      if (!foundPrice) return { error: "Price not found" };
      return {
        success: true,
        price: foundPrice,
      };
    } catch (error) {
      console.error("Failed to find price with options", options, error);
      return { error: "Failed to fetch price" };
    }
  },
);

export const updatePrice = async (
  options: Prisma.PriceUpdateArgs,
): Promise<{ success?: boolean; price?: Price; error?: string }> => {
  try {
    const updatedPrice = await prisma.price.update({
      ...options,
    });
    return { success: true, price: updatedPrice };
  } catch (error) {
    console.error("Failed to update price", error);
    return { error: "Failed to update price" };
  }
};

export const deletePrice = async (
  options: Prisma.PriceDeleteArgs,
): Promise<{ success?: boolean; price?: Price; error?: string }> => {
  try {
    const deletedPrice = await prisma.price.delete({ ...options });
    return { success: true, price: deletedPrice };
  } catch (error) {
    console.error("Failed to delete price", error);
    return { error: "Failed to delete price" };
  }
};
