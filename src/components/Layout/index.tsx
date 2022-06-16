import { Outlet } from 'react-router'
import CharacterList from '../Characters/List'
import Sidebar from '../Sidebar'
import './index.scss'
const Layout = () => {
  return (
    <div className="App">
      <Sidebar />
      <div className="page">
        <Outlet />
        <CharacterList />
      </div>
    </div>
  )
}

export default Layout
