'use client';

import { Office } from '@/types/office';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';
import { MoreVertical, Trash, Users, View } from 'lucide-react';
import { formatCurrency } from '@/utils/formatter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';

export const columns: ColumnDef<Office>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
	{
		accessorKey: 'name',
		header: 'Consultorio',
    // cell: ({ row }) => {
    //   const office = row.original;
    //   const name = row.getValue('name') as string;
    //   return <Link key={office.id} href={`/offices/${office.id}`}>{name}</Link>;
    // }
	},
	{
		accessorKey: 'doctor',
		header: 'Profesional',
	},
	{
		accessorKey: 'patients',
		header: () => <div className='text-center'>Pacientes</div>,
		cell: ({ row }) => {
			const count = parseInt(row.getValue('patients'));
			return (
				<div className='w-full flex justify-center'>
					<Badge className='bg-sky-200 text-sky-800 text-xs'>
						{count}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'sessions',
		header: () => <div className='text-center'>Sesiones</div>,
		cell: ({ row }) => {
			const count = parseInt(row.getValue('sessions'));
			return (
				<div className='w-full flex justify-center'>
					<Badge className='bg-emerald-200 text-emerald-800 text-xs'>
						{count}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'authorizations',
		header: () => <div className='text-center'>Autorizaciones</div>,
		cell: ({ row }) => {
			const count = parseInt(row.getValue('authorizations'));
			return (
				<div className='w-full flex justify-center'>
					<Badge className='bg-purple-200 text-purple-800 text-xs'>
						{count}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'payments',
		header: () => <div className='text-right'>Pagos</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('payments'));

			const formatted = formatCurrency(amount);
			return <div className='text-right'>{formatted}</div>;
		},
	},
  {
    id: "actions",
  
    cell: ({ row }) => {
      const office = row.original;
      return (
        <div className='flex justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link key={office.id} href={`/offices/${office.id}`}>
              <Users size={20} className='mr-1' /> Ver pacientes
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem><Trash size={20} className='mr-1' />Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
          
      )
    },
    enableSorting: false,
    enableHiding: false,
  }
];
