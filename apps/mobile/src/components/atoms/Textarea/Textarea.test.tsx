import { render } from '@testing-library/react-native';
import { Textarea } from './Textarea';
import { describe, it, expect } from 'vitest';

describe('Textarea', () => {
  it('renders with label', () => {
    const { getByLabelText } = render(
      <Textarea label="Enterprise Notes" value="Fintech note" />
    );
    expect(getByLabelText('Enterprise Notes')).toBeTruthy();
  });
});
