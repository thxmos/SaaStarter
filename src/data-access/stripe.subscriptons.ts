import { prisma } from "@/lib/prisma";

export const getSubscriptionByUserId = async (userId: string): Promise<any> => {
  const foundUser = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscriptions: true },
  });

  if (!foundUser) {
    throw new Error("User not found with id: " + userId);
  }

  if (foundUser.subscriptions.length === 0) {
    return null;
  }

  const price = foundUser.subscriptions[0];

  const product = await prisma.product.findUnique({
    where: { id: price.productId! },
  });

  return { price, product };
};
