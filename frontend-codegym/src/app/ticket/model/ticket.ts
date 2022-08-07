import {Brand} from './brand';

export interface Ticket {
  id: number;
  price?: number;
  startPoint?: string;
  endPoint?: string;
  startDate?: string;
  startHour?: string;
  brand?: Brand;
  number?: number;
}
