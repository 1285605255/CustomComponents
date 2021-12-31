import { GETRequest, POSTRequest } from '../../utils/request';

import { TEST } from '../constants/server-api';

export const TEST_api = () => {
  return GETRequest(TEST);
};
