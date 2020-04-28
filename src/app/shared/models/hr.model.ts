import { RequestStatus } from '../constants/utility.constant';

export interface IHRModel {
    cookId: string;
    devoteeId: string;
    status: number;
    createdDate: string;
    modifiedDate: string;
    valid: boolean;
  }

export const initialHRData = {
    cookId: '',
    devoteeId: '',
    status: RequestStatus.requestSend,
    createdDate: new Date().toString(),
    modifiedDate: new Date().toString(),
    valid: true
  };
