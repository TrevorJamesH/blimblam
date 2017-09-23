import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Layout from '../Layout'

import styles from './index.css'
import {Resume} from './resume.jsx'

export default class ResumeContainer extends Component{
  render(){
    return(
      <Layout>
        <Card style={{width: '725px'}}>
          <Resume/>
        </Card>
      </Layout>
    )
  }
}
