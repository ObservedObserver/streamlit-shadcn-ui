import { useEffect, useMemo, useState } from "react"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_basic,
  tableFeatures,
  useTable,
  type ColumnDef
} from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "lucide-react"

import type { V2RendererArgs } from "@/app"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useRevisionedState } from "@/protocol/reconciliation"
import type { DataTableEnvelope, DataTableRow } from "@/protocol/schema"

const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { basic: sortFn_basic }
})

type Props = {
  envelope: DataTableEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
  setTriggerValue: V2RendererArgs["setTriggerValue"]
}

export function DataTableView({
  envelope,
  setStateValue,
  setTriggerValue
}: Props) {
  const { props } = envelope
  const { state, commit } = useRevisionedState(envelope.state, setStateValue)
  const [search, setSearch] = useState("")
  const columns = useMemo<ColumnDef<typeof features, DataTableRow>[]>(
    () =>
      props.columns.map((column, index) => ({
        id: `col:${column.key}`,
        accessorFn: (row) => row.cells[index],
        header: column.label,
        sortingFn: "basic",
        filterFn: "includesString",
        sortUndefined: "last"
      })),
    [props.columns]
  )
  // Search all data columns, including hidden ones. Stable rows avoid invalidating
  // TanStack's row models on unrelated React renders.
  const data = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    return query
      ? props.rows.filter((row) =>
          row.cells.some(
            (cell) =>
              cell !== null && String(cell).toLocaleLowerCase().includes(query)
          )
        )
      : props.rows
  }, [props.rows, search])
  const table = useTable({
    features,
    columns,
    data,
    getRowId: (row) => row.id,
    autoResetPageIndex: false,
    initialState: { pagination: { pageIndex: 0, pageSize: props.pageSize } }
  })
  const columnIdentity = JSON.stringify(
    props.columns.map((column) => column.key)
  )
  useEffect(() => {
    const ids = new Set(props.columns.map((column) => `col:${column.key}`))
    table.setSorting((previous) => previous.filter((sort) => ids.has(sort.id)))
    table.setColumnVisibility((previous) =>
      Object.fromEntries(Object.entries(previous).filter(([id]) => ids.has(id)))
    )
  }, [columnIdentity])
  const { pagination } = table.state
  useEffect(() => {
    table.setPageSize(props.pageSize)
  }, [props.pageSize])
  const count = table.getFilteredRowModel().rows.length
  const pageCount = Math.max(1, Math.ceil(count / pagination.pageSize))
  useEffect(() => {
    if (pagination.pageIndex >= pageCount) table.setPageIndex(pageCount - 1)
  }, [pageCount, pagination.pageIndex])
  const visible = table.getVisibleLeafColumns()
  const rows = table.getRowModel().rows
  const selected = new Set(state.value)
  const allPageSelected =
    rows.length > 0 && rows.every((row) => selected.has(row.id))
  const somePageSelected = rows.some((row) => selected.has(row.id))
  const updateSelection = (ids: string[], checked: boolean) => {
    if (props.selectionMode === "single") {
      commit(checked ? ids.slice(0, 1) : [])
      return
    }
    const next = new Set(state.value)
    for (const id of ids) checked ? next.add(id) : next.delete(id)
    commit([...next])
  }
  const extraColumns =
    (props.selectionMode !== "none" ? 1 : 0) + (props.actions.length ? 1 : 0)
  return (
    <div
      className="grid min-w-0 gap-4 p-px"
      data-ssui-component="data-table"
      data-testid="ssui-v2-data-table"
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex-1">
          <Input
            aria-label="Search rows"
            placeholder="Search rows..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              table.setPageIndex(0)
            }}
          />
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Columns
          </DropdownMenuTrigger>
          <DropdownMenuContent aria-label="Columns">
            <DropdownMenuGroup>
              {table.getAllLeafColumns().map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(checked) =>
                    column.toggleVisibility(checked)
                  }
                >
                  {String(column.columnDef.header)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table aria-label="Records">
        <TableHeader>
          <TableRow>
            {props.selectionMode !== "none" && (
              <TableHead>
                {props.selectionMode === "multiple" ? (
                  <Checkbox
                    aria-label="Select visible page"
                    checked={allPageSelected}
                    indeterminate={somePageSelected && !allPageSelected}
                    disabled={rows.length === 0}
                    onCheckedChange={(checked) =>
                      updateSelection(
                        rows.map((row) => row.id),
                        checked
                      )
                    }
                  />
                ) : (
                  "Select"
                )}
              </TableHead>
            )}
            {visible.map((column) => (
              <TableHead
                key={column.id}
                aria-sort={
                  column.getIsSorted() === "asc"
                    ? "ascending"
                    : column.getIsSorted() === "desc"
                      ? "descending"
                      : "none"
                }
              >
                <Button
                  variant="ghost"
                  aria-label={`Sort ${String(column.columnDef.header)}`}
                  onClick={() => {
                    column.toggleSorting(column.getIsSorted() === "asc")
                    table.setPageIndex(0)
                  }}
                >
                  {String(column.columnDef.header)}
                  {column.getIsSorted() === "asc" ? (
                    <ArrowUpIcon />
                  ) : column.getIsSorted() === "desc" ? (
                    <ArrowDownIcon />
                  ) : (
                    <ArrowUpDownIcon />
                  )}
                </Button>
              </TableHead>
            ))}
            {props.actions.length > 0 && <TableHead>Actions</TableHead>}
            {!visible.length && !extraColumns && (
              <TableHead>Columns hidden</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                data-row-id={row.id}
                data-state={selected.has(row.id) ? "selected" : undefined}
              >
                {props.selectionMode !== "none" && (
                  <TableCell>
                    <Checkbox
                      aria-label={`Select row ${row.id.slice(2)}`}
                      checked={selected.has(row.id)}
                      onCheckedChange={(checked) =>
                        updateSelection([row.id], checked)
                      }
                    />
                  </TableCell>
                )}
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.getValue() === null ? "" : String(cell.getValue())}
                  </TableCell>
                ))}
                {props.actions.length > 0 && (
                  <TableCell>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger
                        render={<Button variant="outline" />}
                        aria-label={`Actions for row ${row.id.slice(2)}`}
                      >
                        Actions
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        aria-label={`Row ${row.id.slice(2)} actions`}
                      >
                        <DropdownMenuGroup>
                          {props.actions.map((action) => (
                            <DropdownMenuItem
                              key={action.id}
                              disabled={action.disabled}
                              onClick={() =>
                                setTriggerValue("action", {
                                  rowId: row.id,
                                  actionId: action.id
                                })
                              }
                            >
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
                {!visible.length && !extraColumns && (
                  <TableCell>Columns hidden</TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={Math.max(1, visible.length + extraColumns)}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span role="status">
          {state.value.length} selected · {count} results · Page{" "}
          {Math.min(pagination.pageIndex + 1, pageCount)} of {pageCount}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
