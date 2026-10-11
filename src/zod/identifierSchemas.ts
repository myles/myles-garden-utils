import { z } from "zod";

import { IDENTIFIER_REGEX } from "../regex/identifier.ts";

export const IdentifierSchema = z
  .string()
  .regex(IDENTIFIER_REGEX, "Malformed identifier.")
  .describe("Registry ID in the form of MB-100, MB-100-1, or TREX-1.");
