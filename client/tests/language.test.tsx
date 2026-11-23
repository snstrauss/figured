import { afterEach, expect, test, vi } from "vitest";

afterEach(() => {
  localStorage.clear();
});

test("initialization restores the saved locale", async () => {
  localStorage.setItem("figured.locale", "en");
  vi.resetModules();
  const { default: i18n } = await import("../src/i18n/i18n");
  expect(i18n.resolvedLanguage).toBe("en");
  expect(i18n.t("profiles.listTitle")).toBe("Your profiles");
});
