import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the Dnes tab by default with Czech labels', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Dnes' })).toBeInTheDocument();
    expect(screen.getByText('Test u zdi (mezera)')).toBeInTheDocument();
    expect(screen.getByText('Stoj u zdi (výdrž)')).toBeInTheDocument();
  });

  it('switches to Trendy, Cvičení and Fotky via the bottom tab bar', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Trendy/ }));
    expect(await screen.findByRole('heading', { name: 'Trendy' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Cvičení/ }));
    expect(await screen.findByRole('heading', { name: 'Cvičení' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Fotky/ }));
    expect(await screen.findByRole('heading', { name: 'Fotky' })).toBeInTheDocument();
  });

  it('Cvičení lists all 10 exercises with steps, mistakes, dose and a video link', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Cvičení/ }));
    await screen.findByRole('heading', { name: 'Cvičení' });

    expect(screen.getByText(/Andělé u zdi/)).toBeInTheDocument();
    expect(screen.getByText(/wall angels/)).toBeInTheDocument();
    expect(screen.getAllByText('Jak na to')).toHaveLength(10);
    expect(screen.getAllByText('Na co si dát pozor')).toHaveLength(10);
    expect(screen.getAllByText('▶ Video')).toHaveLength(10);
    const videoLinks = screen.getAllByRole('link', { name: '▶ Video' });
    videoLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('href', expect.stringContaining('youtube.com/results?search_query='));
    });
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
