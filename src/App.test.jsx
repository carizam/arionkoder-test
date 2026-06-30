import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

describe('Team Tasks app', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds a task and updates the active task count', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText(/new task/i), 'Review CI workflow');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Review CI workflow')).toBeInTheDocument();
    expect(screen.getByText('2 active tasks left')).toBeInTheDocument();
    expect(screen.getByLabelText(/new task/i)).toHaveValue('');
  });

  it('marks a task complete and shows it in the completed filter', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole('checkbox', { name: /automate core user flows/i }));
    await user.click(screen.getByRole('button', { name: /completed/i }));

    const taskList = screen.getByRole('list', { name: /tasks/i });
    expect(within(taskList).getByText('Automate core user flows')).toBeInTheDocument();
    expect(within(taskList).getByText('Write a small React app')).toBeInTheDocument();
    expect(screen.getByText('0 active tasks left')).toBeInTheDocument();
  });

  it('deletes a task from the list', async () => {
    const user = userEvent.setup();

    render(<App />);

    const task = screen.getByText('Automate core user flows').closest('li');
    await user.click(within(task).getByRole('button', { name: /delete/i }));

    expect(screen.queryByText('Automate core user flows')).not.toBeInTheDocument();
    expect(screen.getByText('0 active tasks left')).toBeInTheDocument();
  });

  it('toggles the color theme and saves the preference', async () => {
    const user = userEvent.setup();

    render(<App />);

    const themeToggle = screen.getByRole('button', { name: /dark/i });
    expect(themeToggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(themeToggle);

    expect(screen.getByRole('button', { name: /light/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
