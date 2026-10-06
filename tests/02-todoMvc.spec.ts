import { expect, test } from "@playwright/test";

test("adds todo items and completes one", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");

  const todos = ["Buy groceries", "Finish project report", "Call the dentist"];
  const newTodo = page.getByPlaceholder("What needs to be done?");

  for (const todo of todos) {
    await newTodo.fill(todo);
    await newTodo.press("Enter");
  }

  const todoItems = page.locator(".todo-list li");
  await expect(todoItems).toHaveCount(todos.length);

  const completedTodo = todoItems.filter({ hasText: todos[0] });
  await completedTodo.locator(".toggle").check();

  await expect(completedTodo).toHaveClass(/completed/);
  await expect(page.locator(".todo-count")).toContainText("2 items left");
});
