import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
interface Props {
  children?: React.ReactNode
}
function MainLayoutInner({ children }: Props) {
  return (
    <div className='flex min-h-screen flex-col bg-neutral-50'>
      <Header />
      <div className='flex-1'>
        {children}
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout
