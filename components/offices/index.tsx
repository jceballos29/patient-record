import { Office } from "@/types/office";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export interface OfficesProps {
  data: Office[]
}

export default function OfficesData({ data }: OfficesProps) {
  return (
    <DataTable columns={columns} data={data} />
  );
}