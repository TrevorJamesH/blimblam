import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {IconButton} from 'react-toolbox/lib/button'
import Avatar from 'react-toolbox/lib/avatar';
import {gitHubIcon, linkedinIcon} from '../../icons'

import styles from './index.css'

export default class NavBar extends Component {
  render(){
    const navModel = [
      {
        name: 'Resume',
        address: '/Resume',
      },
      {
        name: 'Projects',
        address: '/projects',
      },
    ]

    const nav = navModel.map(entry => {
      return(
        <li key={entry.name}>
          <NavLink exact activeClassName={styles.active} to={entry.address}>
            {entry.name}
          </NavLink>
        </li>
      )
    })

    return (
      <div className={styles.navBar}>
        <ul className={styles.nav}>
          {nav}
        </ul>
        <div className={styles.avatarWrapper}>
          <Avatar className={styles.avatar} image='trevor.png'/>
        </div>
        <div className={styles.description}>
          <h3 className={styles.primary}>Trevor Hewitt</h3>
          <p>Full Stack JavaScript Developer</p>
          <p>Oakland, CA</p>
        </div>
        <div className={styles.iconLinks}>
          <IconButton icon={gitHubIcon} href='https://github.com/TrevorJamesH'/>
          <IconButton icon={linkedinIcon} href='https://www.linkedin.com/in/trevor-hewitt-4b45aa47/'/>
        </div>
        <p>TrevorHewitt@gmail.com</p>
        <div className={styles.navFooter}>
          <p>Hand coded by me</p>
        </div>
      </div>
    )
  }
}
