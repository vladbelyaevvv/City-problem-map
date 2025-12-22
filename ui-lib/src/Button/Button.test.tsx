import { render, screen, fireEvent } from '@testing-library/react'

import { Button } from './Button'

describe('Button', () => {
  test('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('applies correct variant class', () => {
    const { container } = render(<Button variant="secondary">Click me</Button>)

    expect(container.firstChild).toHaveClass('btn-secondary')
  })

  test('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Click me</Button>)

    expect(container.firstChild).toHaveClass('custom-class')
  })

  test('renders with primary variant by default', () => {
    const { container } = render(<Button>Click me</Button>)

    expect(container.firstChild).toHaveClass('btn-primary')
  })

  test('passes through other props to button element', () => {
    render(<Button type="submit" data-testid="submit-btn">Submit</Button>)
    const button = screen.getByTestId('submit-btn')

    expect(button).toHaveAttribute('type', 'submit')
  })
})
