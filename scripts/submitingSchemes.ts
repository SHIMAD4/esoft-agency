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
    name: 'allFieldsRequired',
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

const AddOfferOnSubmitSchema = Yup.object()
  .shape({
    client: Yup.string().required('Обязательное поле'),
    realtor: Yup.string().required('Обязательное поле'),
    realState: Yup.string().required('Обязательное поле'),
    price: Yup.string().required('Обязательное поле'),
  })
  .test({
    name: 'allFieldsRequired',
    test: function (values: {
      client?: string;
      realtor?: string;
      realState?: string;
      price?: string;
    }) {
      const isValid = ['client', 'realtor', 'realState', 'price'].every(
        (field) =>
          values[field as keyof typeof values] !== undefined &&
          values[field as keyof typeof values]?.length !== 0,
      );

      if (isValid) return true;

      return this.createError({
        path: 'allFieldsRequired',
        message: 'Заполните все поля',
      });
    },
  });

const AddDemandOnSubmitSchema = Yup.object()
  .shape({
    client: Yup.string().required('Обязательное поле'),
    realtor: Yup.string().required('Обязательное поле'),
    realState: Yup.string(),
    minPrice: Yup.string(),
    maxPrice: Yup.string(),
    minFloor: Yup.string(),
    maxFloor: Yup.string(),
    minFloors: Yup.string(),
    maxFloors: Yup.string(),
    minRooms: Yup.string(),
    maxRooms: Yup.string(),
    minArea: Yup.string(),
    maxArea: Yup.string(),
  })
  .test({
    name: 'allFieldsRequired',
    test: function (values: { client?: string; realtor?: string }) {
      const isValid = ['client', 'realtor'].every(
        (field) =>
          values[field as keyof typeof values] !== undefined &&
          values[field as keyof typeof values]?.length !== 0,
      );

      if (isValid) return true;

      return this.createError({
        path: 'allFieldsRequired',
        message: 'Заполните все поля',
      });
    },
  });

const AddDealOnSubmitSchema = Yup.object()
  .shape({
    offerId: Yup.string().required('Обязательное поле'),
    demandId: Yup.string().required('Обязательное поле'),
  })
  .test({
    name: 'allFieldsRequired',
    test: function (values: { offerId?: string; demandId?: string }) {
      const isValid = ['offerId', 'demandId'].every(
        (field) =>
          values[field as keyof typeof values] !== undefined &&
          values[field as keyof typeof values]?.length !== 0,
      );

      if (isValid) return true;

      return this.createError({
        path: 'allFieldsRequired',
        message: 'Заполните все поля',
      });
    },
  });

export {
  AddClientOnSubmitSchema,
  AddRealtorOnSubmitSchema,
  AddEstateOnSubmitSchema,
  AddDealOnSubmitSchema,
  AddOfferOnSubmitSchema,
  AddDemandOnSubmitSchema,
};
