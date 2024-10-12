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
        path: 'atLeastOneRequiredError',
        message: 'Заполните номер телефона или почту',
      });
    },
  });

const AddRealtorOnSubmitSchema = Yup.object().shape({
  surname: Yup.string().required('Обязательное поле'),
  firstname: Yup.string().required('Обязательное поле'),
  patronymic: Yup.string().required('Обязательное поле'),
  percent: Yup.string(),
});

interface ValidationParams {
  fields: { [key: string]: string };                // Поля для проверки (например, phone, email)
  errors?: { [key: string]: string | undefined };   // Ошибки для этих полей
  allFieldsRequired?: boolean;                      // Флаг, если нужно все поля заполнить
  atLeastOneRequiredError?: string;                 // Общая ошибка, если одно из полей обязательно
}

const setDisabledState = (
  setDisabled: (state: boolean) => void,
  validationParams: ValidationParams,
) => {
  const {
    fields,
    errors = {},
    allFieldsRequired = false,
    atLeastOneRequiredError,
  } = validationParams;

  // Если allFieldsRequired - проверяем, что все поля заполнены
  const areAllFieldsFilled = Object.values(fields).every((value) => !!value);

  // Если не все поля обязательны - проверяем, что хотя бы одно заполнено
  const isAnyFieldFilled = Object.values(fields).some((value) => !!value);

  // Проверяем, есть ли ошибки для этих полей
  const hasErrors = Object.keys(fields).some((key) => !!errors[key]);

  // Условие блокировки: если требуется все поля, проверяем их заполненность, иначе - хотя бы одно поле
  if (
    (allFieldsRequired && !areAllFieldsFilled) ||   // Если нужно заполнить все поля
    (!allFieldsRequired && !isAnyFieldFilled) ||    // Если нужно хотя бы одно поле
    hasErrors ||                                    // Если есть ошибки
    atLeastOneRequiredError                         // Если есть ошибка обязательности одного из полей
  ) {
    setDisabled(true);
  } else {
    setDisabled(false);
  }
};

export { AddClientOnSubmitSchema, AddRealtorOnSubmitSchema, setDisabledState };
