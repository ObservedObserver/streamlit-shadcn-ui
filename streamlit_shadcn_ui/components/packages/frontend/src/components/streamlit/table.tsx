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
    className?: string;
}

export const StTable = forwardRef<HTMLTableElement, StTableProps>((props, ref) => {
    const { data, columns, maxHeight = 300, className } = props;
    return (
        <Table ref={ref} className={`m-1 ${className}`}>
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
                {data.map((row, index) => (
                    <TableRow key={`${row.id}-${index}`}>
                        {
                            columns.map((column) => {
                                return (
                                    <TableCell key={`${row.id}-${column.dataKey}-${index}`}>{row[column.dataKey]}</TableCell>
                                )
                            })
                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
})
