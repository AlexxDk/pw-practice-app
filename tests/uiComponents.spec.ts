import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Form Layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("input fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("test@test.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("test2@test.com", {
      delay: 200,
    });

    //generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("test2@test.com");

    //locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("test2@test.com");
  });

  test("radio button", async ({ page }) => {
    const usingTheGridEmailInput = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    // await usingTheGridEmailInput.getByLabel("Option 1").check({ force: true });
    await usingTheGridEmailInput
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });
    const radioStatus = await usingTheGridEmailInput
      .getByRole("radio", { name: "Option 1" })
      .isChecked();

    // generic assertion
    expect(radioStatus).toBeTruthy();

    //locator assertion
    await expect(
      usingTheGridEmailInput.getByRole("radio", { name: "Option 1" })
    ).toBeChecked();

    await usingTheGridEmailInput
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    //generic assertion
    expect(
      await usingTheGridEmailInput
        .getByRole("radio", { name: "Option 1" })
        .isChecked()
    ).toBeFalsy();

    expect(
      await usingTheGridEmailInput
        .getByRole("radio", { name: "Option 2" })
        .isChecked()
    ).toBeTruthy();
  });
});
