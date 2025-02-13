import { z } from "zod";

export const acceptMessageSchema = z.object({
    acceptMessages: z.boolean().default(true),
    messageContent: z.string().min(10, { message: "Message content must be at least 10 characters" })
});
