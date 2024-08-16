import React, { Suspense } from 'react'

const LayoutRefreshToken = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      { children }
    </Suspense>
  )
}

export default LayoutRefreshToken
