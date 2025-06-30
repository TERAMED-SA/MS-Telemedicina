import { z } from "zod";

export function ValidateDto<T>(
  data: T,
  schema: z.ZodTypeAny
): { isValid: boolean; data?: T, error?: z.ZodError } {
  try {
    const parsedData = schema.parse(data);
    return { isValid: true, data: parsedData };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error };
    }
    return { isValid: false };
  }
}