import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { TableEnvelope } from "@/protocol/schema"

type TableViewProps = {
  envelope: TableEnvelope
}

const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const

export function TableView({ envelope }: TableViewProps) {
  return (
    <div
      className="overflow-auto rounded-lg border"
      data-ssui-component="table"
      data-testid="ssui-v2-table"
      style={{
        maxHeight:
          envelope.props.maxHeight === null
            ? undefined
            : envelope.props.maxHeight,
      }}
    >
      <Table>
        {envelope.props.caption !== null ? (
          <TableCaption>{envelope.props.caption}</TableCaption>
        ) : null}
        <TableHeader>
          <TableRow>
            {envelope.props.columns.map((column) => (
              <TableHead
                className={alignmentClasses[column.align]}
                key={column.key}
                scope="col"
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {envelope.props.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {envelope.props.columns.map((column, columnIndex) => (
                <TableCell
                  className={alignmentClasses[column.align]}
                  key={`${rowIndex}-${column.key}`}
                >
                  {row[columnIndex] === null
                    ? ""
                    : String(row[columnIndex])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
