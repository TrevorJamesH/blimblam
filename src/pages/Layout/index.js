import React, { Component } from 'react';
import { Layout, NavDrawer, Panel } from 'react-toolbox';

import NavBar from '../../components/NavBar'
import styles from './index.css'

export default class Profile extends Component{
  render(){
    return(
      <Layout>
        <NavDrawer
          className={styles.navDrawer}
          pinned permanentAt='xxxl'
          onOverlayClick={ this.toggleDrawerActive }>
          <NavBar/>
        </NavDrawer>
        <Panel>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            {this.props.children}
          </div>
        </Panel>
      </Layout>
    )
  }
}
