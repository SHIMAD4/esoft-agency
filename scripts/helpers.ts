import * as Yup from 'yup';
import { EMAILVALIDITYMASK } from './constants';

const AddClientOnSubmitSchema = Yup.object()
  .shape({
    phone: Yup.string(),
    email: Yup.string().matches(EMAILVALIDITYMASK, 'Введите валидный email'),
  })
  .test({
    name: 'atLeastOneRequired',
    test: function (values: { phone?: string; email?: string }) {
      const isValid = ['phone', 'email'].some(
        (field) =>
          values[field as keyof typeof values] !== undefined &&
          values[field as keyof typeof values]?.length !== 0,
      );

      if (isValid) return true;

      return this.createError({
        path: 'atLeastOneRequired',
        message: 'Заполните номер телефона или почту',
      });
    },
  });

export { AddClientOnSubmitSchema };
