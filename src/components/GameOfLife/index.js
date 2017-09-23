import React, { Component } from 'react';
import {Button} from 'react-toolbox/lib/button'
import GraphPaper from '../GraphPaper'

import '../../App.css'

export default class GameOfLife extends Component{
  constructor(){
    super()
    this.state = {
      width: 70,
      height: 70,
      graph: null,
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.increment = this.increment.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.newGraph = this.newGraph.bind(this)
    this.fill = this.fill.bind(this)
  }

  componentWillMount(){
    this.newGraph()
  }

  componentDidMount(){
    this.fill()
    this.start()
  }

  componentWillUnmount(){
    this.stop()
  }

  newGraph(){
    const {width, height} = this.state
    this.setState({
      graph: this.buildGraph(width, height),
    })
    this.stop()
  }

  handleToggle(x,y){
    let currentState = this.state
    if(currentState.graph[y][x] === 0){
      currentState.graph[y][x] = 1
    } else if(currentState.graph[y][x] === 1){
      currentState.graph[y][x] = 0
    }
    this.setState(currentState)
  }

  buildGraph(width, height){
    const graph = []
    for(let i = 0; i < height; i++){
      const row = new Array(width).fill(0)
      graph.push(row)
    }
    return graph
  }

  fill(){
    const {graph} = this.state
    const randomGraph = graph.map(row => row.map(cell => Math.round(Math.random())))
    this.setState({graph: randomGraph})
    this.forceUpdate()
  }

  start(){
    if(this.state.intervalId){
      return
    }
    let intervalId = setInterval( () => this.increment(), 100)
    this.setState({
      intervalId: intervalId,
    })
  }

  stop(){
    clearInterval(this.state.intervalId)
    this.setState({
      intervalId: null,
    })
  }

  increment(){
    const {graph} = this.state
    const nextGeneration = graph.map((row, rIndex) => {
      return row.map((cell, cIndex) => {
        const neighbors = this.countLivingNeighbors(graph, [rIndex, cIndex])
        if(cell === 1){
          if(neighbors < 2){
            return 0
          } else if(neighbors > 3){
            return 0
          } else {
            return 1
          }
        } else {
          if(neighbors === 3){
            return 1
          } else{
            return 0
          }
        }
      })
    })
    this.setState({
      graph: nextGeneration
    })
    this.forceUpdate()
  }

  countLivingNeighbors(graph, cell){
    const neighbors = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
    return neighbors.reduce((acc,neighbor) => {
      if(graph[cell[0]+neighbor[0]] && graph[cell[0]+neighbor[0]][cell[1]+neighbor[1]] === 1){
        return acc + 1
      }
      return acc
    },0)
  }

  render(){
    if(!this.state.graph){
      return null
    }
    const {graph} = this.state
    const blueGraph = graph.map(row => row.map(cell => cell ? 'blue' : 'white'))
    const height = graph.length
    const width = graph[0].length
    return(
      <div>
        {<GraphPaper
          graph={blueGraph}
          width={width}
          height={height}
          handleToggle={this.handleToggle}/>}
        <Button onClick={this.start}>Start</Button>
        <Button onClick={this.stop}>Stop</Button>
        <Button onClick={this.increment}>Next</Button>
        <Button onClick={this.fill}>Random</Button>
        <Button onClick={this.newGraph}>Clear</Button>
      </div>
    )
  }
}
