import * as Yup from 'yup';
import { EMAILVALIDITYMASK } from './constants';

const AddClientOnSubmitSchema = Yup.object()
  .shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    middleName: Yup.string(),
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

const AddRealtorOnSubmitSchema = Yup.object()
  .shape({
    lastName: Yup.string().required('Обязательное поле'),
    firstName: Yup.string().required('Обязательное поле'),
    middleName: Yup.string().required('Обязательное поле'),
    dealShare: Yup.string(),
  })
  .test({
    name: 'dealShare',
    test: function (values: { dealShare?: string }) {
      if (!values.dealShare) return true;

      const dealShare = Number(values.dealShare);

      if (isNaN(dealShare) || dealShare < 0 || dealShare > 100) {
        return this.createError({
          path: 'dealShare',
          message: 'Процентная ставка должна быть от 0 до 100',
        });
      }

      return true;
    },
  });

const AddEstateOnSubmitSchema = Yup.object()
  .shape({
    type: Yup.string(),
    addressCity: Yup.string(),
    addressStreet: Yup.string(),
    addressHouse: Yup.string(),
    addressNumber: Yup.string(),
    latitude: Yup.string(),
    longitude: Yup.string(),
    floor: Yup.string(),
    totalFloors: Yup.string(),
    totalRooms: Yup.string(),
    totalArea: Yup.string(),
    dataType: Yup.string(),
  })
  .test({
    name: 'atLeastOneRequired',
    test: function (values: { latitude?: string; longitude?: string }) {
      const isValid = ['latitude', 'longitude'].every(
        (field) =>
          values[field as keyof typeof values] !== undefined &&
          values[field as keyof typeof values]?.length !== 0,
      );

      if (isValid) return true;

      return this.createError({
        path: 'allFieldsRequired',
        message: 'Заполните координаты',
      });
    },
  })
  .test({
    name: 'latitude',
    test: function (values: { latitude?: string }) {
      if (!values.latitude) return true;

      const latitude = Number(values.latitude);

      if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        return this.createError({
          path: 'latitude',
          message: 'Широта принимает значение от -90 до +90',
        });
      }

      return true;
    },
  })
  .test({
    name: 'longitude',
    test: function (values: { longitude?: string }) {
      if (!values.longitude) return true;

      const longitude = Number(values.longitude);

      if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        return this.createError({
          path: 'longitude',
          message: 'Долгота принимает значение от -180 до +180',
        });
      }

      return true;
    },
  });

interface ValidationParams {
  fields: { [key: string]: string }; // Поля для проверки (например, phone, email)
  errors?: { [key: string]: string | undefined }; // Ошибки для этих полей
  coordinates?: string;
  allFieldsRequired?: boolean; // Флаг, если нужно все поля заполнить
  atLeastOneRequiredError?: string; // Общая ошибка, если одно из полей обязательно
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
    (allFieldsRequired && !areAllFieldsFilled) || // Если нужно заполнить все поля
    (!allFieldsRequired && !isAnyFieldFilled) || // Если нужно хотя бы одно поле
    hasErrors || // Если есть ошибки
    atLeastOneRequiredError // Если есть ошибка обязательности одного из полей
  ) {
    setDisabled(true);
  } else {
    setDisabled(false);
  }
};

export {
  AddClientOnSubmitSchema,
  AddRealtorOnSubmitSchema,
  AddEstateOnSubmitSchema,
  setDisabledState,
};
