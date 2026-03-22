"use client"

import { Button } from "./ui/button"
import { ChevronDownIcon } from "lucide-react"
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
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as React from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onSelectionChange?: (selectedIds: string[]) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSelectionChange, // 添加这行来解构传入的回调函数
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [rowSelection, setRowSelection] = React.useState({})

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
    initialState: {
      pagination: {
        pageSize: 10, // 设置每页显示10条记录，可以根据需要修改此数值
      }
    }
  })

  const selectedIds = React.useMemo(() => {
    return table.getSelectedRowModel().flatRows.map(row => (row.original as any).id);
  }, [table.getSelectedRowModel().flatRows]) // 修正依赖数组

  React.useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedIds);
    }
  }, [selectedIds, onSelectionChange]);

  const pageSizeOptions = [5, 10, 20, 50]

  return (
    <div className="flex flex-col h-full">
  <div className="flex justify-end mr-3">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="ml-auto">
          列显示
          <ChevronDownIcon className={`h-4 w-4 opacity-50 transition-transform duration-200 }`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter(
            (column) => column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) =>
                  column.toggleVisibility(!!value)
                }
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  {/* 表格容器，使用 flex 布局占满剩余空间 */}
  <div className="overflow-hidden rounded-md border m-3 flex-grow">
    {/* 使用 overflow-auto 实现内部滚动，而非绝对定位 */}
    <div className="overflow-auto h-full min-h-[300px]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center py-3 whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-b hover:bg-gray-50 whitespace-nowrap"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                暂无数据。
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>

  {/* 分页控件 - 独立的容器，不在表格容器内，固定在底部 */}
  <div className="flex-shrink-0 mx-3 mb-3">
    <div className="flex items-center justify-between px-4 py-2 bg-white text-sm border rounded-lg shadow-sm">
      <div className="text-muted-foreground text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-2">
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
          className="border rounded p-1"
        >
          {pageSizeOptions.map(pageSize => (
            <option key={pageSize} value={pageSize}>
              每页 {pageSize} 条
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          上一页
        </Button>
        <span className="flex items-center gap-1">
          <div>
            第 {table.getState().pagination.pageIndex + 1} 页，
          </div>
          <div>
            共 {table.getPageCount()} 页
          </div>
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          下一页
        </Button>
      </div>
    </div>
  </div>
</div>
  )
}