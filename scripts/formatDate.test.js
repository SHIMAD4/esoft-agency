import { formatDate } from './helpers';

describe('formatDate', () => {
  it('Проброс валидной даты', () => {
    const input = '2024-12-01T14:30:00Z';
    const expectedOutput = 'Вс, 1 декабря - 17:30';

    expect(formatDate(input)).toBe(expectedOutput);
  });

  it('Проброс невалидной даты', () => {
    const input = 'invalid-date';

    expect(() => formatDate(input)).toThrow();
  });
});
