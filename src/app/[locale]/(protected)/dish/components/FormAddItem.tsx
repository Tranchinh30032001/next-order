'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { handleRevalidateTag } from '@/lib/actions';
import { usePostTableMutation } from '@/services/accounts';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
});

export function FormAddItem() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ''
    }
  });

  const postTableMutation = usePostTableMutation()

  async function addItem(formData: z.infer<typeof FormSchema>) {
    // "use server";
    const result = FormSchema.safeParse({
      name: formData.name
    });
    if (result.success) {
      try {
        if (postTableMutation.isPending) return;
        postTableMutation.mutateAsync(formData).then((res) => {

          if (res.status === 201) {
            handleRevalidateTag('tables')
            form.reset()
          }
        })
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(addItem)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      {/* { postTableMutation.isPending && <p>Loading...</p> } */}
    </Form>
  );
}
