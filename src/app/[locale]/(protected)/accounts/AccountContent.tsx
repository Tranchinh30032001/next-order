'use client'

import TableContainer from '@/components/shared/TableContainer'
import { Button } from '@/components/ui/button'
import {
  CardContent
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useCustomTable from '@/hooks/useCustomTable'
import { useGetAccounts } from '@/services/accounts'
import { CirclePlus } from 'lucide-react'
import { initialColumns } from './utils/columnData'
import { useTranslations } from 'next-intl'

const AccountContent = () => {
  const t = useTranslations('AccountPage');
  const { data } = useGetAccounts()
  const { tableInstance, columns } = useCustomTable({ initialColumns, initialData: data ?? [], enableSorting: true })

  return (
    <CardContent>
      <div className='flex items-center justify-between mb-5' >
        <div className='max-w-[60%] w-[60%]' >
          <Input placeholder='search name' onChange={(e) => {
            tableInstance.getColumn('name')?.setFilterValue(e.target.value)
          }} />
        </div>
        <Button className='bg-white' >
          <CirclePlus /> {t('addAccount')}
        </Button>
      </div>
      <TableContainer columns={columns} table={tableInstance} />
    </CardContent>
  )
}

export default AccountContent
