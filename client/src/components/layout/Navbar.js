import React, { useContext } from 'react'
import { UserContext } from '../../UserContext'
import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'

const Navbar = () => {
    const {user, setUser} = useContext(UserContext)
    const logout = () => {
        const res = await fetch('http://localhost:5000/verifyuser', {
        credentials: 'include',
      });
      const data = res.json()
      setUser(null)
    }
    const menu = user?<SignedInMenu logout={logout}/>:<SignedOutMenu/>
    return (
        <div>
            <nav>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo">Logo</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                    {menu}
                </ul>
            </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                {menu}
            </ul>
        </div>
    )
}

export default Navbar
