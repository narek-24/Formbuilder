import { describe, expect, it } from "vitest";
import {
  formAccess,
  formVersions,
  forms,
  responses,
  responseValues,
  user,
} from "./schema";

describe("database schema", () => {
  it("exports the core form and response tables", () => {
    expect(forms).toBeDefined();
    expect(responses).toBeDefined();
    expect(responseValues).toBeDefined();
    expect(formVersions).toBeDefined();
    expect(formAccess).toBeDefined();
    expect(user).toBeDefined();
  });
});
