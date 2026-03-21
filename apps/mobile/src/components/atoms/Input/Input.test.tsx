import { render } from '@testing-library/react-native';
import { Input } from './Input';
import { describe, it, expect } from 'vitest';

describe('Input', () => {
  it('renders with label', () => {
    const { getByLabelText } = render(<Input label="Enterprise ID" value="123" />);
    expect(getByLabelText('Enterprise ID')).toBeTruthy();
  });

  it('renders as error', () => {
    const { getByLabelText } = render(<Input label="Enterprise ID" value="" error />);
    expect(getByLabelText('Enterprise ID').props.error).toBe(true);
  });
});
