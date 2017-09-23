import React, { Component } from 'react';

import Layout from '../Layout'
import Profile from '../../components/Profile'

export default class Home extends Component{
  render(){

    return(
      <Layout>
        <Profile/>
      </Layout>
    )
  }
}
