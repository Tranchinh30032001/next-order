import { toast } from '@/components/ui/use-toast';
import { EntityError } from '@/core/error';
import jwt from 'jsonwebtoken';
import { UseFormSetError } from 'react-hook-form';
import { isClient } from './httpUtils';

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message
      });
    });
  } else {
    toast({
      title: 'Lỗi',
      description: error?.payload?.message ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration: duration ?? 5000
    });
  }
};

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};

export const getAccessToken = () => isClient ? localStorage.getItem('accessToken') : undefined;

export const getRefreshToken = () => isClient ? localStorage.getItem('refreshToken') : undefined;

export const setAccessToken = (accessToken: string) => isClient && localStorage.setItem('accessToken', accessToken)

export const setRefreshToken = (refreshToken: string) => isClient && localStorage.setItem('refreshToken', refreshToken)
