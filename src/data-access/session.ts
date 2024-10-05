import { prisma } from "@/lib/prisma";
import { Session } from "@prisma/client";

type createSessionDto = {
  userId: string;
  expiresAt: Date;
};

//TODO: DO WE EVEN NEED OR IS LUCIA HANDLING?
// export const createSession = async (userId: string): Promise<Session> => {
//   const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 hour from now
//   return prisma.session.create({ data: { userId, expiresAt } });
// };

// export const deleteSession = async (id: string): Promise<Session> => {
//   return prisma.session.delete({ where: { id } });
// };
