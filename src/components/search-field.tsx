import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { ReactNode, useEffect, useState } from "react"


interface SearchFieldProps {
  ids?: string[];
}
const SearchField: React.FC<SearchFieldProps> = ({ ids }) => {
  const [searchValues, setSearchValues] = useState({
    name: "",
    clazz: "",
    textNo: "",
    teacher: "",
    startDate: undefined as Date | string | null | undefined,
    endDate: undefined as Date | string | null | undefined
  });
  let searchFields = [
    {
      id: "name",
      label: "姓名",
      placeholder: "请输入姓名",
      value: searchValues.name,
      type: "text"
    },
    {
      id: "clazz",
      label: "班级",
      placeholder: "请输入班级",
      value: searchValues.clazz,
      type: "text"
    },
    {
      id: "textNo",
      label: "考试讲次",
      placeholder: "请输入考试讲次",
      value: searchValues.textNo,
      type: "text"
    },
    {
      id: "teacher",
      label: "教师",
      placeholder: "请输入教师",
      value: searchValues.teacher,
      type: "text"
    }
  ]

  const handleInputChange = (id: string, value: string) => {
    setSearchValues(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const [openStart, setOpenStart] = useState(false)
  const [dateStart, setDateStart] = useState<Date | undefined>(undefined)
  const [openEnd, setOpenEnd] = useState(false)
  const [dateEnd, setDateEnd] = useState<Date | undefined>(undefined)
  const [dateError, setDateError] = useState<string | null>(null)

  useEffect(() => {
    if (dateStart && dateEnd) {
      if (dateStart > dateEnd) {
        setDateError("开始时间不能大于结束时间");
      } else {
        setDateError(null); // Clear error if dates are valid
      }
    } else {
      setDateError(null); // Clear error if either date is undefined
    }
  }, [dateStart, dateEnd]);

  const resetVariables = () => {
    setDateStart(undefined);
    setDateEnd(undefined);
    setSearchValues({
      name: "",
      clazz: "",
      textNo: "",
      teacher: "",
      startDate: null,
      endDate: null
    })
  };
  

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-11/12 h-auto p-3 gap-6 justify-center items-start">
        <div className="w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {searchFields.map((field) => (
              <div key={field.id} className="grid w-full max-w-sm items-center gap-3">
                <Label className="ml-2 text-sm" htmlFor={field.id}>{field.label}</Label>
                <Input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  className="bg-white"
                  value={field.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/3 flex flex-col items-start gap-4">
  <div className="flex flex-col gap-3 w-full max-w-sm">
    <Label htmlFor="date-start" className="px-1 text-sm">
      开始日期
    </Label>
    <div className="flex items-center">
      <Popover open={openStart} onOpenChange={setOpenStart}>
        <PopoverTrigger>
          <Button
            variant="outline"
            id="date-start"
            className={`w-64 justify-between font-normal ${dateError && dateStart && dateEnd && dateStart > dateEnd ? 'border-red-500' : ''}`}
          >
            {dateStart ? dateStart.toLocaleDateString() : "选择日期"}
            <ChevronDownIcon className={`h-4 w-4 opacity-50 transition-transform duration-200 ${openStart ? 'rotate-180' : ''}`} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateStart}
            onSelect={(newDate) => {
              setDateStart(newDate);
              setSearchValues(prev => ({ ...prev, startDate: newDate ? newDate.toLocaleDateString('zh-CN') : null })); // 同步更新 searchValues
              setOpenStart(false);
            }}
            onDayClick={() => setOpenStart(false)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  </div>

  <div className="flex flex-col gap-3 w-full max-w-sm">
    <Label htmlFor="date-end" className="px-1 text-sm">
      结束日期
    </Label>
    <div className="flex items-center">
      <Popover open={openEnd} onOpenChange={setOpenEnd}>
        <PopoverTrigger>
          <Button
            variant="outline"
            id="date-end"
            className={`w-64 justify-between font-normal ${dateError && dateStart && dateEnd && dateStart > dateEnd ? 'border-red-500' : ''}`}
          >
            {dateEnd ? dateEnd.toLocaleDateString() : "选择日期"}
            <ChevronDownIcon className={`h-4 w-4 opacity-50 transition-transform duration-200 ${openEnd ? 'rotate-180' : ''}`} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateEnd}
            onSelect={(newDate) => {
              setDateEnd(newDate);
              setSearchValues(prev => ({ ...prev, endDate: newDate ? newDate.toLocaleDateString('zh-CN') : null })); // 同步更新 searchValues
              setOpenEnd(false);
            }}
            onDayClick={() => setOpenEnd(false)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  </div>

  {/* 显示错误信息 */}
  {dateError && (
    <div className="w-full max-w-sm flex justify-center">
      <p className="text-red-500 text-sm">{dateError}</p>
    </div>
  )}
</div>
      </div>

      <div className="justify-center items-center flex">
        {true && <Button
          className="m-2"
        >
          导出
        </Button>}

        <Button
          className="m-2"
          onClick={() => {
            console.log(searchValues)
          }}
        >
          搜索
        </Button>
        <Button
          className="m-2"
          onClick={resetVariables}
        >
          重置
        </Button>
        {ids?.length !== 0 && <Button
          className="m-2"
          onClick={() => alert(ids)}
        >
          分析
        </Button>}
      </div>
    </div>
  )
}

export default SearchField