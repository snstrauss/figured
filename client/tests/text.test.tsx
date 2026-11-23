import { afterEach, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Text } from "../src/shared/Text";

afterEach(cleanup);

test("translated text preserves its semantic element and exposes its key", () => {
  render(<Text as="h1" i18nKey="profiles.listTitle" />);
  const heading = screen.getByRole("heading", {
    name: "הפרופילים שלך",
    level: 1,
  });
  expect(heading.getAttribute("data-i18n-key")).toBe("profiles.listTitle");
});

test("text interpolates values and resolves Hebrew plurals", () => {
  render(
    <>
      <Text i18nKey="workspace.impact" values={{ rating: 4 }} />
      <Text i18nKey="workspace.entryCount" count={1} />
      <Text i18nKey="workspace.entryCount" count={2} />
      <Text i18nKey="workspace.entryCount" count={7} />
    </>,
  );
  expect(screen.getByText("מידת השפעה: 4")).toBeTruthy();
  expect(screen.getByText("נושא אחד")).toBeTruthy();
  expect(screen.getByText("שני נושאים")).toBeTruthy();
  expect(screen.getByText("7 נושאים")).toBeTruthy();
});
