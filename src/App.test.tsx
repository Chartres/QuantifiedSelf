import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the Dnes tab by default with Czech labels', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Dnes' })).toBeInTheDocument();
    expect(screen.getByText('Test u zdi (mezera)')).toBeInTheDocument();
  });

  it('switches to Trendy and Fotky via the bottom tab bar', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Trendy/ }));
    expect(await screen.findByRole('heading', { name: 'Trendy' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Fotky/ }));
    expect(await screen.findByRole('heading', { name: 'Fotky' })).toBeInTheDocument();
  });

  it('saves a Dnes entry and reflects it as the current value on Trendy', async () => {
    render(<App />);

    // wallAngels stepper: click + a few times, then save.
    const incButton = screen.getByRole('button', { name: 'Zvýšit Wall angels (opakování)' });
    fireEvent.click(incButton);
    fireEvent.click(incButton);
    fireEvent.click(screen.getByRole('button', { name: /Uložit/ }));

    fireEvent.click(screen.getByRole('button', { name: /Trendy/ }));
    const card = (await screen.findByText('Wall angels')).closest('section')!;
    expect(card).toHaveTextContent('2×');
  });
});
