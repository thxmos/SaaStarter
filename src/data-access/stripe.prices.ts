import { cache } from "react";
import { authCheck } from "./auth-check";
import { prisma } from "@/lib/prisma";

export const findPrices = cache(async () => {
  try {
    authCheck();
    const foundPrices = await prisma.price.findMany();
    return foundPrices;
  } catch (error) {
    console.error(`Failed to find prices`, error);
    return { error: error ?? "Failed to fetch prices" };
  }
});

export const findPriceById = cache(async (priceId: string) => {
  try {
    authCheck();
    const foundPrice = await prisma.price.findUnique({
      where: { id: priceId },
    });
    if (!foundPrice) return { error: "Price not found" };
    return foundPrice;
  } catch (error) {
    console.error(`Failed to find price with id ${priceId}`, error);
    return { error: "Failed to fetch price" };
  }
});

export const updatePrice = async (priceId: string, data: any) => {
  try {
    authCheck();
    const updatedPrice = await prisma.price.update({
      where: { id: priceId },
      data,
    });
    if (!updatedPrice) return { error: "Price not found" };
    return updatedPrice;
  } catch (error) {
    console.error("Failed to update price", error);
    return { error: "Failed to update price" };
  }
};

export const deletePrice = async (priceId: string) => {
  try {
    authCheck();
    const deletedPrice = await prisma.price.delete({
      where: { id: priceId },
    });
    if (!deletedPrice) return { error: "Price not found" };
    return deletedPrice;
  } catch (error) {
    console.error("Failed to delete price", error);
    return { error: "Failed to delete price" };
  }
};
