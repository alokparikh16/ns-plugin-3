import { Http } from '@nativescript/core';
import { BASE_URL } from '../constants/base.constants';

export const customAuth = (clientId: string, token: string) => {
  return Http.request({
    url: `${BASE_URL}/api/web-clients/${clientId}/auth/custom`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    content: JSON.stringify({
      authToken: token,
    }),
  });
};
