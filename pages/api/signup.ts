import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export default async function SignUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const salt = bcrypt.genSaltSync();
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(401);
    res.json({ error: "Empty form fields" });
    return;
  }

  let newUser;

  try {
    newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });

    if (newUser) {
      res.status(201);
      res.json({ success: "Sign up successful" });
    }
    return;
  } catch (error) {
    res.status(401);
    res.json({ error: "User already exist" });
    return;
  }
}
