import { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table';

interface DataTableProps<TData> {
  initialColumns: ColumnDef<TData>[];
  initialData: TData[];
  enableSorting?: boolean; // New option to enable sorting
}

const useCustomTable = <TData extends {}>({ initialData, initialColumns, enableSorting = false }: DataTableProps<TData>) => {
  const data = useMemo(() => initialData, [initialData]);
  const columns = useMemo(() => initialColumns, [initialColumns]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]); // New state for sorting

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      sorting // Add sorting to the table state
    },
    // Conditionally add sorting model based on enableSorting prop
    ...(enableSorting && { getSortedRowModel: getSortedRowModel() }),
    onSortingChange: setSorting // Handle sorting changes
  });

  return {
    tableInstance,
    data,
    columns,
    columnFilters,
    setColumnFilters,
    sorting, // Expose sorting state and setter
    setSorting
  };
};

export default useCustomTable;
