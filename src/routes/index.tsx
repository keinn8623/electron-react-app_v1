import { createBrowserRouter } from 'react-router-dom'
import About from '@/pages/about/About'
import Home from '@/pages/home/Home'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/about',
        element: <About />
    }
])

export default router;