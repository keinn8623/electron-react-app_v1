
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import About from "@/pages/about/About"
import ScoreInput from "@/pages/score/ScoreInput"
import ScoreAnalyze from "@/pages/score/ScoreAnalyze"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"

// 页面组件映射
const pageComponents: Record<string, React.ReactNode> = {
  "/about": <About />,
  "/scoreInput": <ScoreInput />,
  "/scoreAnalyze": <ScoreAnalyze />,
}
const Home = ({ children }: { children?: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<string>("/about")
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={true} style={{ "--sidebar-width": "11rem" }}>
        <AppSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-l w-full flex flex-col h-full">
          <SidebarTrigger />
          {children}
          <div className="content flex-l w-full h-full bg-gray-50">
            {pageComponents[currentPage] || <div>404</div>}
          </div>
        </main>
        
      </SidebarProvider>
    </TooltipProvider>
    
  )
}

export default Home;