import { render } from '@testing-library/react-native';
import { Text } from './Text';
import { describe, it, expect } from 'vitest';

describe('Text', () => {
  it('renders with default type', () => {
    const { getByText } = render(<Text>Enterprise Text</Text>);
    expect(getByText('Enterprise Text')).toBeTruthy();
  });

  it('renders with link type', () => {
    const { getByText } = render(<Text type="link">Fintech Link</Text>);
    expect(getByText('Fintech Link')).toBeTruthy();
  });
});
