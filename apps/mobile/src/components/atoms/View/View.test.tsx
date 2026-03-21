import { render } from '@testing-library/react-native';
import { View } from './View';
import { Text } from '../Text/Text';
import { describe, it, expect } from 'vitest';

describe('View', () => {
  it('renders children', () => {
    const { getByText } = render(
      <View>
        <Text>Enterprise View</Text>
      </View>
    );
    expect(getByText('Enterprise View')).toBeTruthy();
  });
});
