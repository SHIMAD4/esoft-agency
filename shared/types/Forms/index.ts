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
}>;

export { ExtendedErrorType };
