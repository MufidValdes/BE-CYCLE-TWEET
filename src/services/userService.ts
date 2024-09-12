import prisma from '../prisma/prisma';

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const createUser = async (name: string, email: string) => {
  return await prisma.user.create({
    data: { name, email },
  });
};
