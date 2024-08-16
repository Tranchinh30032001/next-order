import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { tableApiRequest } from '@/configs/apiUrl/authApi';
import { FormAddItem } from './components/FormAddItem';
import { Suspense } from 'react';

const getTables = (async() => {
  return tableApiRequest.getTables()
})

const DishPage = async () => {
  const tables = (await getTables()).payload;

  return (
    <div>

      <FormAddItem />
      <Suspense fallback={<p>Loading...</p>} >
        {tables.reverse().map((table) => (
          <Card key={table.id}>
            <CardHeader>{table.name}</CardHeader>
            <CardContent>
              <p>{table.desc}</p>
            </CardContent>
          </Card>
        ))}
      </Suspense>
    </div>
  );
};

export default DishPage;
