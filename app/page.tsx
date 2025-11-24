import type { FC } from 'react'
import React, { Suspense } from 'react'

import type { IMainProps } from '@/app/components'
import Main from '@/app/components'
import Loading from '@/app/components/base/loading'

const App: FC<IMainProps> = ({
  params,
}: any) => {
  return (
    <Suspense fallback={<Loading type='app' />}>
      <Main params={params} />
    </Suspense>
  )
}

export default React.memo(App)
