'use client';
import * as React from 'react';
import Link from 'next/link';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Loading from './Loading';
import { userProps } from '@/types';
import { TbArrowsSort } from 'react-icons/tb';

import { Payment } from '@/types';

// export const data: Payment[] = [
//   {
//     id: '728ed52f',
//     amount: 100,
//     status: 'pending',
//     email: 'k1@example.com',
//   },
//   {
//     id: '489e1d42',
//     amount: 125,
//     status: 'processing',
//     email: 'k2@gmail.com',
//   },
// ];

export const columns: ColumnDef<userProps>[] = [
  {
    accessorKey: '_id',
    header: () => <h1 className="text-lg p-2 font-medium">Id</h1>,
    cell: ({ row }) => <div className="capitalize p-2 ">{row.index + 1}</div>,
  },
  {
    // accessorKey: 'data.firstName',
    id: 'firstName',
    accessorFn: (row) => row.data?.firstName,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-lg p-2 font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        First Name
        <TbArrowsSort className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize p-2 ml-6">{row.original.data?.firstName}</div>
    ),
  },
  {
    id: 'businessName',
    accessorFn: (row) => row.data?.businessName,
    // accessorKey: 'companyName',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-lg p-2 font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Business Name
        <TbArrowsSort className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize p-2 ml-6">
        {row.original.data?.businessName}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-lg p-2 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <TbArrowsSort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase p-2">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: '_id',
    header: () => (
      <div className="text-lg p-2 font-medium text-right">Redirect</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-end items-center">
          <Link
            href={`/userBusiness/${row.getValue('_id')}`}
            className="text-center font-medium p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-800 hover:text-white hover:shadow-xl transition-all"
          >
            Get Details
          </Link>
        </div>
      );
    },
  },
];

const DashboardGrid = () => {
  const [data, setData] = React.useState<userProps[]>([]);
  const [recordsCount, setRecordsCount] = React.useState(50);

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/users', { method: 'GET' });
      if (res.ok) {
        const response = await res.json();
        console.log(response);
        setData(response);
      }
    };
    table.setPageSize(recordsCount);
    getData();
  }, []);
  //   React.useEffect(() => console.log(data), [data]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  //   table.setPageSize(9);
  console.log('page c:', table.getState().pagination);

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-end py-4">
        <Input
          placeholder="Filter Business..."
          value={
            (table.getColumn('businessName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('businessName')?.setFilterValue(event.target.value)
          }
          className="max-w-full md:max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="rounded-full bg-gray-200 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={index}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={`${row.original._id}-${index}`}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-self-end self-end items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              // onClick={() => table.setPageIndex(2)}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              // onClick={() => table.previousPage()}
              // disabled={!table.getCanPreviousPage()}
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              // onClick={() => console.log('page count:', table.previousPage)}
              onClick={() => table.setPageIndex(1)}
              disabled={(() => {
                return table.getPageCount() < 2;
              })()}
            >
              2
            </Button>
            <Button
              variant="outline"
              size="sm"
              // onClick={() => table.setPageIndex(0) }
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <div className="p-1 px-2 flex gap-1 rounded-lg shadow-sm border-[1px] border-gray-300">
            <p>{table.getState().pagination.pageIndex + 1} / </p>
            <p>{table.getPageCount()}</p>
          </div>
          <select
            name=""
            id=""
            className="p-1 px-2 rounded-lg shadow-sm border-[1px] border-gray-300"
            onChange={(e) => setRecordsCount(parseInt(e.target.value))}
          >
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;
