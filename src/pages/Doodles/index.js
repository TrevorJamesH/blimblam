import React, { Component } from 'react'
import { Tabs, Tab } from 'react-toolbox'
import { Card } from 'react-toolbox/lib/card';

import Layout from '../Layout'
import GameOfLife from '../../components/GameOfLife'
import Pathy from '../../components/Pathy'

import styles from './index.css'

const about = "I built this to learn and test a few concepts: canvas, and web workers.\n Wanting to learn canvas, and use it interactively, I built a generic react component that I would end up calling GraphPaper. It accepts a 2D array of color-name or hash strings, and displays them as a grid of those colors. Because canvas is drawn each frame, only the single image needs to be held in memory, rather than a div or button for each square with their own callback. You can test this out by right clicking on any frame and saving the image.\n GraphPaper takes a single callback function called handleToggle, that it passes the x, y coords of the clicked or dragged over square to. It resolves the clicked on square using the click event, the canvas rectangle coords, and the page scroll coords.\n Because GraphPaper is a generic component, utilizing it to demonstrate algorithms only takes building a wrapper component. Conway’s Game of Life made for a simple proof of concept.\n Pathy is way to demonstrate more powerful ways you can utilize this GraphPaper component. It’s a basic weighted directed graph traversing algorithm, that leads into my second reason for building this. Even at 70 by 70, the graph algorithm can take long enough to complete that there would be noticeable UI interruptions or frame rate dips due to the synchronicity of JavaScript. To counter this, I moved the algorithm to a web worker to run it on another thread, making this a multithreaded application.  The wrapper component starts the web worker when it mounts, and terminates the worker when it unmounts, so the worker is only running when it’s needed. This per react-component worker method is both easy to implement, and a powerful tool worth learning."

export default class Doodles extends Component{
  constructor(){
    super()
    this.state = {
      tabIndex: 0,
    }
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange(index){
    this.setState({tabIndex: index})
  }

  render(){
    const aboutParagraphs = about.split('\n').map((paragraph, index) => {
      return <p className={styles.text} key={index}>{paragraph}</p>
    })

    return(
      <Layout>
        <Card style={{width: '725px'}}>
          <Tabs index={this.state.tabIndex} onChange={this.handleTabChange}>
            <Tab label='Pathy'>
              <Pathy/>
            </Tab>
            <Tab label='Game Of Life'>
              <GameOfLife className={styles.tabContent}/>
            </Tab>
            <Tab label='About this Project'>
              {aboutParagraphs}
              <a href='https://github.com/TrevorJamesH/GraphPaper'>Check out the source.</a>
            </Tab>
          </Tabs>
        </Card>
      </Layout>
    )
  }
}
