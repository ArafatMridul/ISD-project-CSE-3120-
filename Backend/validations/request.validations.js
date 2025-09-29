import { z } from "zod";

export const singupRoutePostBodyRequest = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
});

export const loginRoutePostBodyRequest = z.object({
    email: z.email(),
    password: z.string().min(8),
});
