import type { FC } from 'react'

const Layout: FC = ({ children }) => {
  return (
    <div className="flex flex-grow flex-col">
      <main className="">{children}</main>
    </div>
  )
}

export default Layout
