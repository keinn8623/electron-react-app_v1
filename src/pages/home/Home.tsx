
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import About from "@/pages/about/About"
import ScoreInput from "@/pages/score/ScoreInput"
import ScoreAnalyze from "@/pages/score/ScoreAnalyze"
import LoginPage from "@/components/loginPage"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import ScoreSearch from "@/pages/score/ScoreSearch"
import { is } from "date-fns/locale"

// 页面组件映射
const pageComponents: Record<string, React.ReactNode> = {
  "/about": <About />,
  "/scoreInput": <ScoreInput />,
  "/scoreAnalyze": <ScoreAnalyze />,
  "/scoreSearch": <ScoreSearch />,
}
const Home = ({ children }: { children?: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<string>("/about")
  useEffect(() => {
    const checkAuth = async () => {
      // const { isAuthenticated } = useAuth()
      if(localStorage.getItem("authToken")) {
        console.log("Home中:",localStorage.getItem("authToken"))
      }
    }
    checkAuth()
  },[])

  return (
    localStorage.getItem('authToken')===null? 
    <LoginPage />
    :
    <TooltipProvider>
      <SidebarProvider defaultOpen={true} style={{ "--sidebar-width": "11rem" }}>
        <AppSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-l w-[calc(100%-11rem)] flex flex-col h-full h-screen">
          <SidebarTrigger />
          {children}
          <div className="content flex-l w-full  h-full w bg-gray-50">
            {pageComponents[currentPage] || <div>404</div>}
          </div>
        </main>  
      </SidebarProvider>
    </TooltipProvider>
    
  )
}

export default Home;