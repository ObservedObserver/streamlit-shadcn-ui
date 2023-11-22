import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { forwardRef } from "react";

interface IRow {
    [key: string]: any
}
interface IColumn {
    dataKey: string;
    title: string;
}

interface StTableProps {
    data: IRow[];
    columns: IColumn[];
    maxHeight?: number;
}

export const StTable = forwardRef<HTMLTableElement, StTableProps>((props, ref) => {
    const { data, columns, maxHeight = 300 } = props;
    return (
        <Table ref={ref} className="m-1">
            <TableHeader>
                <TableRow>
                    {
                        columns.map((column) => {
                            return (
                                <TableHead key={column.dataKey}>{column.title}</TableHead>
                            )
                        })
                    }
                </TableRow>
            </TableHeader>
            <TableBody style={{ overflowY: 'auto', maxHeight: maxHeight + 'px' }}>
                {data.map((invoice) => (
                    <TableRow key={invoice.id}>
                        {
                            columns.map((column) => {
                                return (
                                    <TableCell key={column.dataKey}>{invoice[column.dataKey]}</TableCell>
                                )
                            })
                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
})
