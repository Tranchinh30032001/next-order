import { accountApiRequest, authApiRequest } from '@/configs/apiUrl/authApi';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.logout
  })
}

export const useGetMe = () => {
  return useQuery({
    queryKey: ['getMe'],
    queryFn: accountApiRequest.me
  })
}
