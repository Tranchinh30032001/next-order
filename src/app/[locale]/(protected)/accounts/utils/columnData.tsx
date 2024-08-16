import { Button } from '@/components/ui/button'
import { AccountType } from '@/schema/account'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import Avatar from '@/../public/avatar.png'
import { useTranslations } from 'next-intl'

export const initialColumns: ColumnDef<AccountType>[] = [
  {
    header: 'ID',
    cell: ({ row }) => row.index
  },
  {
    accessorKey: 'avatar',
    header: () => {
      const t = useTranslations('AccountPage')
      return (
        <Button variant="ghost">
          {t('column.avatar')}
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        row.getValue('avatar')
          ? <Image src={row.getValue('avatar')} alt={'avatar'} width={100} height={100} />
          : <Image src={Avatar} alt={'avatar'} width={100} height={100} />
      )
    }
  },

  {
    accessorKey: 'name',
    header: () => {
      const t = useTranslations('AccountPage')
      return (
        <Button variant="ghost">
          {t('column.name')}
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('name')}</div>
    )
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const t = useTranslations('AccountPage')
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('column.email')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>
  }
]
