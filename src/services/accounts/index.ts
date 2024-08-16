import { accountApiRequest, tableApiRequest } from '@/configs/apiUrl/authApi'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetAccounts = () => {
  return useQuery({
    queryKey: ['getAccounts'],
    queryFn: accountApiRequest.getAccounts,
    select: (data) => data.payload.data
  })
}

export const useGetTableQuery = () => {
  return useQuery({
    queryKey: ['getTable'],
    queryFn: tableApiRequest.getTables,
    select: (data) => data.payload
  })
}

export const usePostTableMutation = () => {
  return useMutation({
    mutationFn: tableApiRequest.postTable
  })
}
