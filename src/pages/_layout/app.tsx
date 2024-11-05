import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>

      <footer className='mt-8'>
      <Footer />
      </footer>
    </div>
  )
}