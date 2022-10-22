/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const Layout = ({ children }) => {
  return (
    <div className="flex flex-grow flex-col">
      <main className="">{children}</main>
    </div>
  )
}

export default Layout
