import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  // Test 1: Renders with label text
  it('renders with label text', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  // Test 2: Calls onClick when clicked
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByText('Click');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  // Test 3: Does not call onClick when disabled
  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click
      </Button>
    );
    const button = screen.getByText('Click');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test 4: Does not call onClick when isLoading
  it('does not call onClick when isLoading', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} isLoading>
        Click
      </Button>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test 5: Shows spinner when isLoading=true
  it('shows spinner when isLoading=true', () => {
    const { container } = render(
      <Button isLoading>Loading</Button>
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('animate-spin');
  });

  // Test 6: Renders as anchor tag when as="a" and href is provided
  it('renders as anchor tag when as="a" and href is provided', () => {
    render(
      <Button as="a" href="https://example.com">
        Link Button
      </Button>
    );
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  // Test 7: Applies fullWidth class when fullWidth=true
  it('applies fullWidth class when fullWidth=true', () => {
    const { container } = render(<Button fullWidth>Full</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('w-full');
  });

  // Test 8: Each variant renders without throwing
  it('renders primary variant without throwing', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toBeInTheDocument();
  });

  it('renders secondary variant without throwing', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('renders ghost variant without throwing', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByText('Ghost')).toBeInTheDocument();
  });

  it('renders destructive variant without throwing', () => {
    render(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByText('Destructive')).toBeInTheDocument();
  });

  it('renders accent variant without throwing', () => {
    render(<Button variant="accent">Accent</Button>);
    expect(screen.getByText('Accent')).toBeInTheDocument();
  });

  // Test 9: Each size renders without throwing
  it('renders sm size without throwing', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByText('Small')).toBeInTheDocument();
  });

  it('renders md size without throwing', () => {
    render(<Button size="md">Medium</Button>);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('renders lg size without throwing', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  // Test 10: focus-visible ring class is present in the DOM
  it('has focus-visible ring class in the DOM', () => {
    const { container } = render(<Button>Focused</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('focus-visible:ring-2');
    expect(button).toHaveClass('focus-visible:ring-offset-2');
    expect(button?.className).toMatch(/focus-visible:ring-\[var\(--color-focus-ring\)\]/);
  });
});
