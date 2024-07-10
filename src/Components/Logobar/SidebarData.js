import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { FaMale, FaFemale } from 'react-icons/fa'; // Importing custom icons

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiOutlineShoppingCart />, 
    cName: 'nav-text'
  },
  {
    title: 'men',
    path: '/Menshoes',
    icon: <FaMale />, // Using custom icon
    cName: 'nav-text'
  },
  {
    title: 'Women',
    path: '/Womenshoes',
    icon: <FaFemale />, // Using custom icon
    cName: 'nav-text'
  },
  {
    title: 'Thrifted Caps',
    path: '/Caps',
    icon: <AiIcons.AiOutlineShoppingCart />,
    cName: 'nav-text'
  },
  {
    title: 'Winter Collection',
    path: '/Winter',
    icon: <IoIcons.IoMdSnow />,
    cName: 'nav-text'
  },
  {
    title: 'Summer Collection',
    path: '/Summer',
    icon: <IoIcons.IoMdSunny />,
    cName: 'nav-text'
  },
 
];
