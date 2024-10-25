import * as z from "zod";

const UserSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    id: z.string(),
    avatarUrl: z.string(),
    role: z.enum(["ADMIN", "USER"]),
});

type TUser = z.infer<typeof UserSchema>

export { UserSchema, type TUser };