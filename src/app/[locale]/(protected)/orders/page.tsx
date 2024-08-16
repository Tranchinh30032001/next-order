'use client'

import { useGetAllDishes } from '@/services/dishes'
import React from 'react'

const OrderPage = () => {
  const { data } = useGetAllDishes()
  const listDishes = data?.payload.data
  return (
    <div>
      { listDishes?.map((item) => {
        return (
          <p key={item.name}>{item.name}</p>
        )
      })}
    </div>
  )
}

export default OrderPage
