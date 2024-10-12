import { FormikErrors } from 'formik';

type ExtendedErrorType = FormikErrors<{
  surname?: string;
  firstname?: string;
  patronymic?: string;
  phone?: string;
  email?: string;
  allFieldsRequired?: string;
  atLeastOneRequiredError?: string;
}>;

export { ExtendedErrorType };
