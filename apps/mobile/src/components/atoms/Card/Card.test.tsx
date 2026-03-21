import { render } from '@testing-library/react-native';
import { Card } from './Card';
import { Text } from '../Text/Text';
import { describe, it, expect } from 'vitest';

describe('Card', () => {
  it('renders with title and subtitle', () => {
    const { getByText } = render(
      <Card title="Fintech Card" subtitle="Enterprise Subtitle">
        <Text>Fintech Content</Text>
      </Card>
    );
    expect(getByText('Fintech Card')).toBeTruthy();
    expect(getByText('Enterprise Subtitle')).toBeTruthy();
    expect(getByText('Fintech Content')).toBeTruthy();
  });
});
