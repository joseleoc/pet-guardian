import { render } from '@testing-library/react-native';
import { Button } from './Button';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('renders with default props', () => {
    const { getByRole } = render(<Button>Enterprise Action</Button>);
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders as disabled', () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>);
    expect(getByRole('button').props.accessibilityState.disabled).toBe(true);
  });
});
