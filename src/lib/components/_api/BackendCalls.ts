import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { AUTHORIZATION_KEY } from '../_shared/constants';

export const getCall = async <P, R>(path: string, params: P, authorization = false) => {
  const token = localStorage.getItem(AUTHORIZATION_KEY);
  const resp = await axios.get<R, AxiosResponse<R>, P>(path, {
    ...(authorization
      ? {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      : {}),
    params: {
      ...params,
    },
  });
  return resp.data;
};

export const putCall = async <P, R>(path: string, params: P, authorization = true) => {
  const token = localStorage.getItem(AUTHORIZATION_KEY);
  const resp = await axios.put<R, AxiosResponse<R>, P>(
    path,
    {
      ...params,
    },
    authorization
      ? {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      : {}
  );
  return resp.data;
};

export const postCall = async <P, R>(path: string, params: P, authorization = true) => {
  const token = localStorage.getItem(AUTHORIZATION_KEY);
  const resp = await axios.post<R, AxiosResponse<R>, P>(
    path,
    {
      ...params,
    },
    authorization
      ? {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      : {}
  );
  return resp.data;
};

export const patchCall = async <P, R>(path: string, params: P, authorization = true) => {
  const token = localStorage.getItem(AUTHORIZATION_KEY);
  const resp = await axios.patch<R, AxiosResponse<R>, P>(
    path,
    {
      ...params,
    },
    authorization
      ? {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      : {}
  );
  return resp.data;
};

export const deleteCall = async <P, R>(path: string, params: P, authorization = true) => {
  const token = localStorage.getItem(AUTHORIZATION_KEY);
  const resp = await axios.delete<R, AxiosResponse<R>, P>(path, {
    ...(authorization
      ? {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      : {}),
    data: {
      ...params,
    },
  });
  return resp.data;
};

export const uploadCall = async (path: string, params: FormData, authorization = true) => {
  const token = localStorage.getItem(AUTHORIZATION_KEY);
  const resp = await axios.put(
    path,
    params,
    authorization
      ? {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      : {}
  );
  return resp.data;
};
