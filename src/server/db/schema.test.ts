import { describe, expect, it } from "vitest";
import { forms, responses, user } from "./schema";

describe("database schema", () => {
  it("exports the core form and response tables", () => {
    expect(forms).toBeDefined();
    expect(responses).toBeDefined();
    expect(user).toBeDefined();
  });
});
