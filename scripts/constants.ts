const PHONEINPUTMASK = [
  '+',
  '7',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
];

const DATEINPUTMASK = [
  /\d/, // Year (YY)
  /\d/, // Year (YY)
  /\d/, // Year (YY)
  /\d/, // Year (YY)
  '-', // Separator
  /\d/, // Month (MM)
  /\d/, // Month (MM)
  '-', // Separator
  /\d/, // Year (DD)
  /\d/, // Year (DD)
];

const TIMEINPUTMASK = [
  /\d/, // Day (HH)
  /\d/, // Day (HH)
  ':', // Separator
  /\d/, // Month (MM)
  /\d/, // Month (MM)
];

const EMAILVALIDITYMASK: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export enum EntityType {
  CLIENT = 'CLIENT',
  REALTOR = 'REALTOR',
  ESTATE = 'ESTATE',
  DEAL = 'DEAL',
  OFFER = 'OFFER',
  DEMAND = 'DEMAND',
  EVENT = 'EVENT',
}

export enum EventColors {
  SHOW = 'rgba(84, 110, 122, 1)',
  MEETING = 'rgba(177, 189, 197, 1)',
  CALL = 'rgba(37, 50, 56, 1)',
}

export enum EventTitles {
  SHOW = 'Показ',
  MEETING = 'Встреча с клиентом',
  CALL = 'Запланированный звонок',
}

export enum EstateType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  LAND = 'LAND',
}

export { PHONEINPUTMASK, EMAILVALIDITYMASK, DATEINPUTMASK, TIMEINPUTMASK };
