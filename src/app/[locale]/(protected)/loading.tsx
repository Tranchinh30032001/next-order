import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <section>
      <Skeleton className='h-7 w-24' />
      <Skeleton className='mt-2 h-5 w-p350px]' />
    </section>
  )
}

export default Loading
