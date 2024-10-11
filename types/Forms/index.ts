import { FormikErrors } from 'formik';

type ExtendedErrorType = FormikErrors<{
  surname?: string;
  firstname?: string;
  patronymic?: string;
  phone?: string;
  email?: string;
  atLeastOneRequired?: string;
}>;

export { ExtendedErrorType };
