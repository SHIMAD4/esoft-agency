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

const EMAILVALIDITYMASK: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export enum EntityType {
  CLIENT = 'CLIENT',
  REALTOR = 'REALTOR',
  ESTATE = 'ESTATE',
  OFFER = 'OFFER',
  DEMAND = 'DEMAND',
}

export enum EstateType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  LAND = 'LAND',
}

export { PHONEINPUTMASK, EMAILVALIDITYMASK };
