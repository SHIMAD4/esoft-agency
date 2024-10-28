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

const ObjectToQueryString = (params: { [key in string]: string | number }) =>
  Object.entries(params)
    .map(([key, value]) => {
      if (value === undefined || value === '') return;

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');

export { setDisabledState, ObjectToQueryString };
