import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DataTable } from "@/components/data-table"
import { useRef, ChangeEvent, useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ElectronAPI {
    saveFile: (fileName: string, buffer: Uint8Array) => Promise<{ filePath: string }>,
    downloadFile: () => Promise<{ success: boolean, filePath?: string, message: string }>,
}
declare global {
    interface Window {
        electronAPI: ElectronAPI
    }
}


export type GradeData = {
    id: string
    name: string
    clazz: string
    textNo: string
    totalScore: number
    averageScore: number
    maxScore: number
    minScore: number
    errNum: number[]
}
export const columns: ColumnDef<GradeData>[] = [
    // 选择行
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="全选"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="选择行"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "clazz",
        header: "Class",
    },
    {
        accessorKey: "textNo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    TextNo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "totalScore",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    TotalScore
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "averageScore",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    AverageScore
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "maxScore",
        header: "MaxScore",
    },
    {
        accessorKey: "minScore",
        header: "MinScore",
    },
    {
        accessorKey: "errNum",
        header: "ErrNum",
    },
]

async function getData(): Promise<GradeData[]> {
    return [
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 76,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 55,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 47,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 88,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 80,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 80,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 80,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 80,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 80,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 80,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 80,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 80,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 80,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 80,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalScore: 80,
            averageScore: 65.5,
            maxScore: 90,
            minScore: 55.4,
            errNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
    ]
}


const ScoreInput = () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [tableData, setTableData] = useState<GradeData[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [canUploadTemplate, setCanUploadTemplate] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlertDialog, setShowAlertDialog] = useState(false)  // ✅ 控制对话框显示
    const [isSuccess, setIsSuccess] = useState(true)  // ✅ 区分成功/失败
    useEffect(() => {
        const userRole = localStorage.getItem("userRole")
        setCanUploadTemplate(userRole === "admin" || userRole === "editor")

        const fetchData = async () => {
            const data = await getData()
            setTableData(data)
        }
        fetchData()
    }, [])

    const handleSelectionChange = (ids: string[]) => {
        setSelectedIds(ids)
        console.log("input selectedIds:", ids)
    }

    const handleUpload = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // Process the file here
            console.log("Selected file:", file)
            try {
                if (!window.electronAPI) {
                    throw new Error("electronAPI not found")
                }
                const arrayBuffer = await file.arrayBuffer()
                const buffer = new Uint8Array(arrayBuffer)

                const result = await window.electronAPI.saveFile(file.name, buffer)
                if (!result.filePath) {
                    setAlertMessage("Failed to save template")
                    setIsSuccess(false)
                    setShowAlertDialog(true)
                }
                setAlertMessage("Success")
                setIsSuccess(true)
                setShowAlertDialog(true)
            } catch (error: any) {
                setAlertMessage(error.message || "Failed to save template")
                setIsSuccess(false)
                setShowAlertDialog(true)
            }
            event.target.value = ""
        }
    }

    const handleCloseAlertDialog = () => {
        setShowAlertDialog(false)
        setAlertMessage('')
    }

    const handleFileDownload = async () => {
        try {
            if (!window.electronAPI) {
                throw new Error("electronAPI not found")
            }

            const result = await window.electronAPI.downloadFile()

            setAlertMessage(result.message)
            setIsSuccess(result.success)
            setShowAlertDialog(true)
        } catch (error: any) {
            setAlertMessage(error.message || "Failed to download template")
            setIsSuccess(false)
            setShowAlertDialog(true)
        }

    }

    return (
        <div className="w-full h-full">
            <div className="flex flex-wrap ml-5 my-3 gap-2 md:flex-row">
                {/* 权限判断显示上传模板button */}
                {true && <Button variant="outline" onClick={handleUpload}>upload template</Button>}
                <Button variant="outline" onClick={handleFileDownload}>download template</Button>
                <Button variant="outline" onClick={handleUpload}>upload</Button>

                {/* ✅ 条件渲染 AlertDialog */}
                <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {isSuccess ? '✅ Success' : '❌ Error'}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {alertMessage}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={handleCloseAlertDialog}>
                                OK
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".xlsx,.xls,.csv"
                />
            </div>
            <Separator className="my-1" />
            <div className="w-full h-[90%]">
                <DataTable columns={columns} data={tableData} onSelectionChange={handleSelectionChange} />
            </div>
        </div>

    )
}

export default ScoreInput