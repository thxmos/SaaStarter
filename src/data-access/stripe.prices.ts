import { cache } from "react";
import { authCheck } from "./auth-check";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createPrice = async (options: Prisma.PriceCreateArgs) => {
  try {
    authCheck();
    const createdPrice = await prisma.price.create({
      ...options,
    });
    return createdPrice;
  } catch (error) {
    console.error("Failed to create price", error);
    return { error: "Failed to create price" };
  }
};

export const findPrices = cache(async (options: Prisma.PriceFindManyArgs) => {
  try {
    authCheck();
    const foundPrices = await prisma.price.findMany({ ...options });
    return foundPrices;
  } catch (error) {
    console.error(`Failed to find prices`, error);
    return { error: error ?? "Failed to fetch prices" };
  }
});

export const findUniquePrice = cache(
  async (options: Prisma.PriceFindUniqueArgs) => {
    try {
      authCheck();
      const foundPrice = await prisma.price.findUnique({
        ...options,
      });
      if (!foundPrice) return { error: "Price not found" };
      return foundPrice;
    } catch (error) {
      console.error("Failed to find price with options", options, error);
      return { error: "Failed to fetch price" };
    }
  },
);

export const updatePrice = async (options: Prisma.PriceUpdateArgs) => {
  try {
    authCheck();
    const updatedPrice = await prisma.price.update({
      ...options,
    });
    if (!updatedPrice) return { error: "Price not found" };
    return updatedPrice;
  } catch (error) {
    console.error("Failed to update price", error);
    return { error: "Failed to update price" };
  }
};

export const deletePrice = async (options: Prisma.PriceDeleteArgs) => {
  try {
    authCheck();
    const deletedPrice = await prisma.price.delete({
      ...options,
    });
    if (!deletedPrice) return { error: "Price not found" };
    return deletedPrice;
  } catch (error) {
    console.error("Failed to delete price", error);
    return { error: "Failed to delete price" };
  }
};
