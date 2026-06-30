import { expect, test } from '@playwright/test';

test('user can manage tasks and switch theme', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Team Tasks' })).toBeVisible();

  await page.getByLabel('New task').fill('Check the E2E flow');
  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByText('Check the E2E flow')).toBeVisible();
  await expect(page.getByText('2 active tasks left')).toBeVisible();

  await page.getByRole('checkbox', { name: 'Check the E2E flow' }).check();
  await page.getByRole('button', { name: 'completed' }).click();

  await expect(page.getByText('Check the E2E flow')).toBeVisible();
  await expect(page.getByText('1 active task left')).toBeVisible();

  await page.getByRole('button', { name: 'Dark' }).click();

  await expect(page.getByRole('button', { name: 'Light' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});
