import { LanguageProvider } from "../src/i18n/LanguageProvider";
import i18n from "../src/i18n/i18n";
import { beforeEach, afterEach, expect, test, vi } from "vitest";
import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useProfilesStore } from "../src/features/profiles/useProfilesStore";
import { App } from "../src/App";
import type { Profile } from "../src/shared/profile";

const profile: Profile = {
  id: "personal",
  name: "אישי",
  formatVersion: 1,
  revision: 0,
  categories: [
    {
      id: "category-01",
      name: "categories.category-01.name",
      colorKey: "blue",
      entryIds: ["symptom-001"],
    },
  ],
  entries: [
    {
      id: "symptom-001",
      name: "symptoms.symptom-001.name",
      generalDescription: "",
      personalExperience: "",
      impactRating: null,
      archived: false,
    },
  ],
  translations: {
    he: {
      categories: { "category-01": { name: "תפקודים ניהוליים" } },
      symptoms: { "symptom-001": { name: "שיתוק משימתי" } },
    },
    en: {
      categories: {},
      symptoms: { "symptom-001": { name: "Task Paralysis" } },
    },
  },
};

beforeEach(async () => {
  await i18n.changeLanguage("he");
  useProfilesStore.setState(useProfilesStore.getInitialState(), true);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

test("a listed profile opens its category tree and logout returns to the chooser", async () => {
  const user = userEvent.setup();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (path: string) =>
      Response.json(
        path === "/api/profiles"
          ? { profiles: [{ id: profile.id, name: profile.name }] }
          : profile,
      ),
    ),
  );
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );
  await user.click(
    await screen.findByRole("button", { name: "פתיחת הפרופיל אישי" }),
  );
  expect(await screen.findByRole("heading", { name: "אישי" })).toBeTruthy();
  await user.click(screen.getByText("תפקודים ניהוליים"));
  expect(screen.getByText("שיתוק משימתי").getAttribute("data-i18n-key")).toBe(
    "symptoms.symptom-001.name",
  );
  expect(
    screen.getByText("שיתוק משימתי").getAttribute("data-i18n-source"),
  ).toBe("profile");
  expect(screen.getByText("Task Paralysis")).toBeTruthy();
  await user.click(screen.getByRole("button", { name: "יציאה מהפרופיל" }));
  expect(
    await screen.findByRole("button", { name: "פתיחת הפרופיל אישי" }),
  ).toBeTruthy();
});

test("a failed creation keeps the draft and a retry opens the created profile", async () => {
  const user = userEvent.setup();
  let attempts = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_path: string, options?: RequestInit) => {
      if (options?.method !== "POST") return Response.json({ profiles: [] });
      attempts++;
      if (attempts === 1)
        return Response.json(
          { error: { code: "storage_error" } },
          { status: 500 },
        );
      return Response.json(profile, { status: 201 });
    }),
  );
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );
  await user.click(await screen.findByRole("button", { name: "+ פרופיל חדש" }));
  const dialog = screen.getByRole("dialog");
  const name = within(dialog).getByLabelText("שם הפרופיל");
  await user.type(name, "אישי");
  await user.click(
    within(dialog).getByRole("button", { name: "יצירת פרופיל" }),
  );
  const alert = await within(dialog).findByRole("alert");
  expect(
    alert.querySelector("[data-i18n-key]")?.getAttribute("data-i18n-key"),
  ).toBe("errors.storage_error");
  expect((name as HTMLInputElement).value).toBe("אישי");
  await user.click(
    within(dialog).getByRole("button", { name: "יצירת פרופיל" }),
  );
  expect(await screen.findByRole("heading", { name: "אישי" })).toBeTruthy();
});

test("submission disables controls and reopening clears the draft and error", async () => {
  const user = userEvent.setup();
  let complete!: (response: Response) => void;
  const fetchMock = vi.fn((_path: string, options?: RequestInit) => {
    if (options?.method !== "POST")
      return Promise.resolve(Response.json({ profiles: [] }));
    return new Promise<Response>((resolve) => {
      complete = resolve;
    });
  });
  vi.stubGlobal("fetch", fetchMock);
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );
  await user.click(await screen.findByRole("button", { name: "+ פרופיל חדש" }));
  const dialog = screen.getByRole("dialog");
  const name = within(dialog).getByLabelText<HTMLInputElement>("שם הפרופיל");
  await user.type(name, "אישי");
  await user.click(
    within(dialog).getByRole("button", { name: "יצירת פרופיל" }),
  );
  expect(name.disabled).toBe(true);
  expect(
    within(dialog).getByRole<HTMLButtonElement>("button", {
      name: "יצירת פרופיל",
    }).disabled,
  ).toBe(true);
  expect(
    within(dialog).getByRole<HTMLButtonElement>("button", { name: "ביטול" })
      .disabled,
  ).toBe(true);
  expect(fetchMock).toHaveBeenLastCalledWith(
    "/api/profiles",
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify({ name: "אישי" }),
    }),
  );
  await act(async () => {
    complete(
      Response.json({ error: { code: "storage_error" } }, { status: 500 }),
    );
  });
  expect(await within(dialog).findByRole("alert")).toBeTruthy();
  expect(name.value).toBe("אישי");
  expect(name.disabled).toBe(false);
  await user.click(within(dialog).getByRole("button", { name: "ביטול" }));
  expect(screen.queryByRole("dialog")).toBeNull();
  await user.click(screen.getByRole("button", { name: "+ פרופיל חדש" }));
  const reopened = within(screen.getByRole("dialog"));
  expect(reopened.getByLabelText<HTMLInputElement>("שם הפרופיל").value).toBe(
    "",
  );
  expect(reopened.queryByRole("alert")).toBeNull();
});

test("language switch updates the app, open dialog, and document direction", async () => {
  const user = userEvent.setup();
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json({ profiles: [] })),
  );
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );
  await user.click(await screen.findByRole("button", { name: "+ פרופיל חדש" }));
  await user.type(screen.getByLabelText("שם הפרופיל"), "אישי");
  await user.click(screen.getByRole("button", { name: "English" }));
  expect(
    await screen.findByRole("heading", { name: "Your profiles" }),
  ).toBeTruthy();
  expect(screen.getByRole("button", { name: "Create profile" })).toBeTruthy();
  expect(screen.getByLabelText<HTMLInputElement>("Profile name").value).toBe(
    "אישי",
  );
  expect(document.documentElement.lang).toBe("en");
  expect(document.documentElement.dir).toBe("ltr");
  await user.click(screen.getByRole("button", { name: "עברית" }));
  expect(
    await screen.findByRole("heading", { name: "הפרופילים שלך" }),
  ).toBeTruthy();
  expect(screen.getByLabelText<HTMLInputElement>("שם הפרופיל").value).toBe(
    "אישי",
  );
  expect(document.documentElement.lang).toBe("he");
  expect(document.documentElement.dir).toBe("rtl");
});
