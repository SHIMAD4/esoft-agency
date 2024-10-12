type User = {
  id: number;
  fullName: string;
  telephone: string;
  email?: string;
};

type Realtor = {
  id: number;
  fullName: string;
  percent: number;
};

export { User, Realtor };
