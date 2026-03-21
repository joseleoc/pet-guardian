import { render } from '@testing-library/react-native';
import { SafeAreaView } from './SafeAreaView';
import { Text } from '../Text/Text';
import { describe, it, expect } from 'vitest';

describe('SafeAreaView', () => {
  it('renders children', () => {
    const { getByText } = render(
      <SafeAreaView>
        <Text>Enterprise SafeArea</Text>
      </SafeAreaView>
    );
    expect(getByText('Enterprise SafeArea')).toBeTruthy();
  });
});
