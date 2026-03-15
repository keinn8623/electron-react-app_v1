
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const Home = ({ children }: { children?: React.ReactNode }) => {
  return (
    <TooltipProvider> 
      <SidebarProvider defaultOpen={true} style={{"--sidebar-width": "11rem"}}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </TooltipProvider>
    
  )
}

export default Home;