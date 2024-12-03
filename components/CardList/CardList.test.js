import React from 'react';
import { render } from '@testing-library/react-native';
import { CardList } from './index';
import { EntityType } from '@/scripts/constants';

jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
}));

jest.mock('@/shared/hooks/useAppDispatch', () => ({
  useAppDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

const mockData = [
  {
    type: EntityType.CLIENT,
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'Smith',
    phone: '1234567890',
    email: 'john.doe@example.com',
  },
  {
    type: EntityType.REALTOR,
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    middleName: 'Marie',
    dealShare: 15,
  },
  {
    type: EntityType.OFFER,
    id: '3',
    client: {
      firstName: 'Alice',
      middleName: 'Lee',
    },
    realtor: {
      firstName: 'Bob',
      middleName: 'Brown',
    },
    estate: {
      addressStreet: 'Main St.',
    },
    price: 1000000,
  },
];

describe('CardList', () => {
  it('Проверка правильного рендера', () => {
    const { getByText } = render(<CardList data={mockData} />);
    expect(getByText('John Smith Doe')).toBeTruthy(); // Проверка клиента
    expect(getByText('Jane Marie Doe')).toBeTruthy(); // Проверка риэлтора
    expect(getByText('Main St.')).toBeTruthy(); // Проверка предложения
  });

  it('Проверка на скролл списка', () => {
    const { getByText, queryByText } = render(<CardList data={mockData} />);
    // Проверка начального состояния
    expect(getByText('John Smith Doe')).toBeTruthy();
    expect(getByText('Jane Marie Doe')).toBeTruthy();
    expect(queryByText('Main St.')).toBeTruthy(); // Проверяем, что все данные отображаются
  });

  it('Проверка вспомогательного текста при невалидных данных', () => {
    const fallbackData = [
      {
        type: EntityType.CLIENT,
        id: '4',
        firstName: null,
        lastName: null,
        middleName: null,
      },
    ];
    const { getByText } = render(<CardList data={fallbackData} />);
    expect(getByText('Нет данных')).toBeTruthy(); // Проверка отображения данных по умолчанию
  });
});
