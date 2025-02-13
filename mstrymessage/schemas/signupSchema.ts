import { z } from "zod";

export const userValidation = z
  .string()
  .min(2, "username must be atkeast 2 charactors")
  .max(20, "username must be at most 20 charactors")
  .regex(/^[a-zA-Z0-9]+$/, "username must not contain special characters");

export const signUpSchema = z.object({
  username: userValidation,
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "password must be at least 8 charactors long")
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});
