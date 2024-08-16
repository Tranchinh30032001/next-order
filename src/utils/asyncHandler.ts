import { request } from '@/configs/apiRequest';

type PropsGet = {
  url: string,
  options: any
}

type PropsPost = {
  url: string,
  options: any,
  body: any
}

export const getHandler = async<Response> ({ url, options }: PropsGet) => {
  try {
    return await request<Response>('GET', url, options)
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error;
    }
    throw new Error(error.message);
  }
};

export const postHandler = async<Response>({ url, options, body }: PropsPost) => {
  try {
    return await request<Response>('POST', url, { ...options, body })
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error;
    }
    throw new Error(error.message);
  }
};
