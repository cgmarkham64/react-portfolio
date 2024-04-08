import { Sidebar } from '../Sidebar'
import { Outlet } from 'react-router-dom'
import './Layout.scss'

import LogoMtn from '../../assets/images/Logo_white.svg'

export const Layout = () => {
  return (
    <div className="App">
      <Sidebar />
      <div className="page">
        <div class="image-frame">
          <img src={LogoMtn} alt="logo" className="background-image" />
        </div>
        <Outlet />
      </div>
    </div>
  )
}
