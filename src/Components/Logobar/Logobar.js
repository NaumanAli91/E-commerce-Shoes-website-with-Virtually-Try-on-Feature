import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import styles from './Logobar.module.css';
import { IconContext } from 'react-icons';
import { fetchDataStart } from '../../features/getproductslice';
import logo from '../../assets/images/dopes.png';

function Logobar() {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch(); 

  const showSidebar = () => {
    setSidebar(!sidebar);
    document.body.classList.toggle('sidebar-active');
  };
  const handleLinkClick = (category) => {
    dispatch(fetchDataStart({ category })); 
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={styles.navbar}>
          <Link to='#' className={styles['menu-bars']}>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          {/* Logo in the center */}
          <div className={styles['logo-container']}>
            <Link to="/"> {/* Added Link component here */}
              <img src={logo} alt="Logo" className={styles.logo} />
            </Link>
          </div>
          {/* Close icon (to close the sidebar) */}
          {sidebar && (
            <Link to='#' className={styles['menu-bars-close']} onClick={showSidebar}>
              <AiIcons.AiOutlineClose />
            </Link>
          )}
        </div>
        {/* Sidebar */}
        <nav className={sidebar ? `${styles['nav-menu']} ${styles.active}` : styles['nav-menu']}>
          <ul className={styles['nav-menu-items']} onClick={showSidebar}>
            <li className={styles['navbar-toggle']}>
              <Link to='#' className={styles['menu-bars-close']}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => (
              <React.Fragment key={index}>
                <li className={styles[item.cName]}>
                  <Link to={item.path} onClick={() => handleLinkClick(item.title)}> {/* Add onClick handler */}
                    {item.icon}
                    <span className={styles.spantitle}>{item.title}</span>
                  </Link>
                </li>
                {index < SidebarData.length - 1 && <hr />} {/* Add <hr> except for the last item */}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        {/* Backdrop element */}
        {sidebar && <div className={styles.backdrop} onClick={showSidebar}></div>}
      </IconContext.Provider>
    </>
  );
}

export default Logobar;
