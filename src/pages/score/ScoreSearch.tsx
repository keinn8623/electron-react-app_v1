import SearchField from "@/components/search-field"
import { Separator } from "@/components/ui/separator"
import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import {useRef, useState, useEffect} from "react"
import { DataTable } from "@/components/data-table"





export type GradeSearchData = {
    id: string,
    name: string,                        // 学生名字
    clazz: string,                        // 班级       
    textNo: string,                         // 考试讲次
    totalTextScore: number,                 // 试卷总分
    totalScore: number,                     // 总分
    averageScore: number,                   // 平均分
    midianScore: number,                      // 中间分
    maxScore: number,                       // 最高分
    minScore: number,                       // 最低分
    computationScore: number,
    computationRate: string,                // 计算正确率
    countingScore: number,
    countingRate: string,                     // 计数正确率
    wordProblemScore: number,
    wordProblemRate: string,                  // 应用题正确率
    numberTheoryScore: number,
    numberTheoryRate: string,                 // 数论正确率
    geometryScore: number,
    geometryRate: string,                     // 几何正确率
    travelProblemScore: number,
    travelProblemRate: string,                  // 行程正确率
    combinatoricsScore: number,
    combinatoricsRate: string,                  // 组合正确率
}

export const columns: ColumnDef<GradeSearchData>[] = [
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
        header: "学生名字",
    },
    {
        accessorKey: "clazz",
        header: "班级",
    },
    {
        accessorKey: "textNo",
        header: "考试讲次",
    },
    {
        accessorKey: "totalTextScore",
        header: "试卷总分",
    },
    {
        accessorKey: "totalScore",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    学生总分
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "averageScore",
        header: "平均分",
    },
    {
        accessorKey: "midianScore",
        header: "中间分",
    },
    {
        accessorKey: "maxScore",
        header: "最高分",
    },
    {
        accessorKey: "minScore",
        header: "最低分",
    },
    {
        accessorKey: "computationRate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    计算正确率
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "countingRate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    计数正确率
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "wordProblemRate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    应用正确率
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "numberTheoryRate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    数论正确率
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "geometryRate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    几何正确率
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "travelProblemRate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    行程正确率
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "combinatoricsRate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    组合正确率
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    }

]

async function getGradeSearchData(): Promise<GradeSearchData[]> {
    return [
        {
            id: "m5gr84i",
            name: "张纯菁",
            clazz: "5秋综合刷题C班",
            textNo: "C01",
            totalTextScore: 100,
            totalScore: 80,
            averageScore: 76.5,
            midianScore: 77,
            maxScore: 95,
            minScore: 66,
            computationScore: 16,
            computationRate: "80%",
            countingScore: 20,
            countingRate: "50%",
            wordProblemScore: 12,
            wordProblemRate: "50%",
            numberTheoryScore: 18,
            numberTheoryRate: "50%",
            geometryScore: 24,
            geometryRate: "50%",
            travelProblemScore: 22,
            travelProblemRate: "50%",
            combinatoricsScore: 12,
            combinatoricsRate: "50%",
        }
    ]
}
const ScoreSearch = () => {
    const [data, setData] = useState<GradeSearchData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getGradeSearchData()
            setData(data)
        }
        fetchData()
    }, [])
    return (
        <div>
            <SearchField />
            <Separator className="my-1" />
                        <div className="w-full h-[90%]">
                            <DataTable columns={columns} data={data} />
                        </div>
        </div>

    )
}


export default ScoreSearch