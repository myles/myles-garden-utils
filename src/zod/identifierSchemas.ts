import { z } from "zod";

import { type IdentifierParts, parseIdentifier } from "../identifier/parseIdentifier.ts";
import { IDENTIFIER_REGEX } from "../regex/identifier.ts";

const IDENTIFIER_MESSAGE = "Malformed identifier.";
const IDENTIFIER_DESCRIPTION = "Registry ID in the form of MB-100, MB-100-1, or TREX-1.";

export type ParsedIdentifier = IdentifierParts & { value: string };

export const IdentifierSchema = z
  .string()
  .regex(IDENTIFIER_REGEX, IDENTIFIER_MESSAGE)
  .describe(IDENTIFIER_DESCRIPTION);

/**
 * Parse "MB-100-1" to { value: "MB-100-1", series: "MB", item: 100, part: 1 }.
 */
export const ParsedIdentifierSchema: z.ZodType<ParsedIdentifier> = z
  .string()
  .transform((value, ctx) => {
    const parts = parseIdentifier(value);
    if (!parts) {
      ctx.addIssue({ code: "custom", message: IDENTIFIER_MESSAGE });
      return z.NEVER;
    }

    return { value, ...parts };
  })
  .describe(IDENTIFIER_DESCRIPTION);
