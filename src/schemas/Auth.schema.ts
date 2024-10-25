import * as z from "zod";
import { UserSchema } from "./User.schema";

const SignInSchema = z.object({
  email: z.string().email({
    message: "Incorrect value",
  }),
  password: z.string().min(8),
});

const SignUpSchema = z.object({
  email: z.string().email({
    message: "Incorrect value",
  }),
  password: z.string().min(8),
  name: z.string().min(3),
});

const TokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string()
});

const AuthResponseSchema  = TokenSchema.extend({
  user: UserSchema
});

type TLoginUser = z.infer<typeof SignInSchema>;
type TRegisterUser = z.infer<typeof SignUpSchema>;
type TToken = z.infer<typeof TokenSchema>;
type TAuthResponse = z.infer<typeof AuthResponseSchema>;

export { SignInSchema, SignUpSchema, TokenSchema, AuthResponseSchema, type TLoginUser, type TRegisterUser, type TToken, type TAuthResponse};
