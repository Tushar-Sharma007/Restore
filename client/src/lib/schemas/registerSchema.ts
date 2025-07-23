import z from "zod";

const passwordvalidation = new RegExp(
    /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?!.*\s).*$/
)

export const registerSchema = z.object({
    email: z.email(),
    password: z.string().regex(passwordvalidation, {
        error: 'Password must contain 1 lowercase character, 1 uppercase character, 1 number, 1 special and be 6-10 characters'
    })
});

export type RegisterSchema = z.infer<typeof registerSchema>;