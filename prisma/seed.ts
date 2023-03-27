import { PrismaClient } from "@prisma/client";
import { usersData } from "./usersData";

import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync();

const password = bcrypt.hashSync("password", salt);

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    usersData.map(async (user) => {
      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          firstName: user.firstName,
          lastName: user.lastName,
          password,
          email: user.email,
          roles: user.roles,
        },
      });
    })
  );
};

run()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
