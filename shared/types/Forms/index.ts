import { FormikErrors } from 'formik';

type ExtendedErrorType = FormikErrors<{
  lastName?: string;
  firstName?: string;
  middleName?: string;
  phone?: string;
  email?: string;
  allFieldsRequired?: string;
  atLeastOneRequiredError?: string;
  latitude?: string;
  longitude?: string;
  client?: string;
  realtor?: string;
  realState?: string;
  price?: string;
  demandId?: string;
  offerId?: string;
}>;

export { ExtendedErrorType };
