import { 
  Calendar, Home, Inbox, Search, Settings, User2, 
  ChevronUp, ChevronDown, ChevronRight, Users, 
  FileText, ClipboardList, LogOut 
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useNavigate } from "react-router-dom"

// 菜单项。
const menuItems = [
  {
    title: "人员管理",
    icon: Users,
    items: [
      { title: "员工列表", url: "/staff" },
      { title: "部门管理", url: "/department" },
      { title: "权限设置", url: "/permission" },
    ],
  },
  {
    title: "成绩管理",
    icon: ClipboardList,
    items: [
      { title: "成绩录入", url: "/scoreInput" },
      { title: "成绩查询", url: "/score/query" },
      { title: "统计分析", url: "/scoreAnalyze" },
    ],
  },
  {
    title: "日志查询",
    icon: FileText,
    items: [
      { title: "操作日志", url: "/log/operation" },
      { title: "系统日志", url: "/log/system" },
      { title: "登录日志", url: "/log/login" },
    ],
  },
]

interface AppSidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export function MySidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger >
              <SidebarMenuButton>
                Select Workspace
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem>
                <span>Acme Inc</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Acme Corp.</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

export function MySidebarFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger >
              <SidebarMenuButton>
                <User2 /> Username
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Sign out1</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

export function AppSidebar({currentPage, setCurrentPage}: AppSidebarProps) {
  const navigate = useNavigate()
  const handleNavigation = (url: string) => {
    setCurrentPage(url)
  }
  return (
    <Sidebar collapsible="icon">
      <MySidebarHeader />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <Collapsible
                  key={item.title}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {/* 父级菜单触发器 */}
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    
                    {/* 子菜单内容 */}
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuButton 
                            onClick={() => handleNavigation(subItem.url)}> 
                              <span>{subItem.title}</span>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <MySidebarFooter />
    </Sidebar>
  )
}
