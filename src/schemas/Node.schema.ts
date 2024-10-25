import * as z from "zod";

const NodeSchema = z.object({
    id: z.string(),
    name: z.string(),
    coordinate_x: z.number(),
    coordinate_y: z.number(),
    text: z.string(),
    text_broadcast: z.string(),
    is_destination: z.boolean(),
    is_phantom: z.boolean(),
    is_turns_verbose: z.boolean(),
    location: z.string(),
    userId: z.string(),
})

type TNode = z.infer<typeof NodeSchema>

export { NodeSchema, type TNode };