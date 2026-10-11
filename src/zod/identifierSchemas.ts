import { z } from "zod";

const IDENTIFIER_PATTERN = /^[A-Z]+-\d+(?:-\d+)?$/;

export const IdentifierSchema = z
  .string()
  .regex(IDENTIFIER_PATTERN, "Malformed identifier.")
  .describe("Registry ID in the form of MB-100, MB-100-1, or TREX-1.");
