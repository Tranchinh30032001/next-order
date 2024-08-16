'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export const handleRevalidateTag = (tag: string) => {
  revalidateTag(tag)
}
