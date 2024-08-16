'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useGetTableQuery } from '@/services/accounts';
import { tableApiRequest } from '@/configs/apiUrl/authApi';

export type TableType = {
  createdAt: string;
  status: string;
  address: string;
  desc: string;
  name: string;
  id: string;
};


const ListTable = () => {

  const { data: tables } = useGetTableQuery()
  // const tables = (await tableApiRequest.getTables()).payload

  return (
    tables?.reverse().map((table) => (
      <Card key={table.id}>
        <CardHeader>{table.name}</CardHeader>
        <CardContent>
          <p>{table.desc}</p>
        </CardContent>
      </Card>
    ))
  )
}

export default ListTable
