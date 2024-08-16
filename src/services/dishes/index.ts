import { dishesApiRequest } from '@/configs/apiUrl/authApi'
import { useQuery } from '@tanstack/react-query'

export const useGetAllDishes = () => {
  return useQuery({
    queryKey: ['getAllDishes'],
    queryFn: dishesApiRequest.getAllDishes
  })
}
