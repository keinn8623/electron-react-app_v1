import { createBrowserRouter } from 'react-router-dom'
import About from '@/pages/about/About'
import Home from '@/pages/home/Home'
import LoginPage from '@/components/loginPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/login',
        element: <LoginPage />
    }
])

export default router;