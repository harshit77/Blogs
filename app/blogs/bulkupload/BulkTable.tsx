import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { BulkProps, Bulk } from "@/components/BulkReader";

export default function BulkTable({ tableData }: BulkProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.keys(tableData[0]).map((head, index) => (
            <TableHead className="min-w-[100px]" key={index}>
              {head.charAt(0).toUpperCase() + head.slice(1)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((post: Bulk, index) => (
          <TableRow key={index}>
            {Object.values(post).map((item, itemIndex) => (
              <TableCell
                key={itemIndex}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
