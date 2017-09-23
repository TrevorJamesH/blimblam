import React, { Component } from 'react';
import {Button} from 'react-toolbox/lib/button'
import Slider from 'react-toolbox/lib/slider';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import Checkbox from 'react-toolbox/lib/checkbox';
import GraphPaper from '../GraphPaper'
import BrushSelector from '../BrushSelector'
import {shortestPath} from '../../utilities/shortest-path.js'

import styles from './index.css'

let MyWorker = require("../../utilities/graph-worker.js")

export default class Pathy extends Component{
  constructor(){
    super()
    this.state = {
      width: 70,
      height: 70,
      graph: null,
      path: null,
      strokeSize: 3,
      brush : {
        color: '#585858',
        weight: 0
      },
      timeOutId: null,
      loading: false,
      calculate: true,
      useWorker: true,
    }
    this.newGraph = this.newGraph.bind(this)
    this.buildGraph = this.buildGraph.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.updateGraph = this.updateGraph.bind(this)
    this.handleBrushSelect = this.handleBrushSelect.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleWokerToggle = this.handleWokerToggle.bind(this)
    this.buildBrush = this.buildBrush.bind(this)
    this.callGraphWorker = this.callGraphWorker.bind(this)
    this.handleGraphWorkerResponse = this.handleGraphWorkerResponse.bind(this)
  }

  componentWillMount(){
    this.worker = new MyWorker()
    this.worker.onmessage = (m) => {
      this.handleGraphWorkerResponse(m.data)
    }
    this.newGraph()
  }

  componentDidMount(){
    this.updateGraph()
  }

  componentWillUnmount(){
    this.worker.terminate()
  }

  newGraph(){
    const {width, height} = this.state
    const newGraph = this.buildGraph(width, height)
    this.setState({
      graph: newGraph,
    })
    this.updateGraph(newGraph)
  }

  buildGraph(width, height){
    const graph = []
    for(let i = 0; i < height; i++){
      const row = new Array(width).fill({color:'white', weight:1})
      graph.push(row)
    }
    return graph
  }

  handleBrushSelect(color, weight){
    this.setState({
      brush: {
        color,
        weight,
      }
    })
  }

  handleToggle(x,y){
    const {graph, brush, loading} = this.state
    const brushStroke = this.buildBrush([x,y])
    brushStroke.forEach(n => {
      graph[n[[1]]][n[0]] = brush
    })
    this.setState({
      graph,
      calculate: true
    })
    if(!loading){
      this.updateGraph()
    }
  }

  handleSlider(slider, value){
    this.setState({strokeSize: value})
  }

  handleClear(){
    this.newGraph()
  }

  buildBrush(point){
    const {graph, strokeSize} = this.state
    const brush = []
    for(let i = -1 * strokeSize + 1; i <= strokeSize - 1; i++){
      for(let j = -1 * strokeSize + 1; j <= strokeSize - 1; j++){
        if(graph[point[1] + j] && graph[point[1] + j][point[0] + i]){
          if(Math.round(Math.sqrt(i*i + j*j)) < strokeSize){
            brush.push([point[0] + i, point[1] + j])
          }
        }
      }
    }

    return brush
  }

  updateGraph(newGraph){
    const {graph, width, height, useWorker} = this.state
    const workingGraph = newGraph || graph
    if(useWorker){
      this.callGraphWorker(workingGraph)
    } else {
      this.setState({
        loading: true,
      })
      const path = shortestPath(workingGraph, [0, width - 1], [height - 1, 0])
      this.setState({
        path,
        loading: false
      })
    }
  }

  callGraphWorker(newGraph){
    this.setState({
      loading: true,
      calculate: false
    })
    const {graph, width, height} = this.state
    const workingGraph = newGraph || graph
    this.worker.postMessage([workingGraph, [0, width - 1], [height - 1, 0]])
  }

  handleGraphWorkerResponse(response){
    this.setState({
      loading: false,
      path: response
    })
    if(this.state.calculate){
      this.updateGraph()
    }
  }

  handleWokerToggle(){
    const {useWorker} = this.state
    this.setState({useWorker: !useWorker})
  }

  render(){
    const {graph, path, loading, calculate, useWorker} = this.state

    if(!graph){
      return null
    }

    const colorGraph = graph.map(row => row.map(cell => cell.color))

    if(path){
      path.forEach(location => {
        colorGraph[location[1]][location[0]] = 'orange'
      })
    }

    const showLoading = loading ?
      <ProgressBar mode='indeterminate' className={styles.progressBar}/> :
      <ProgressBar disabled mode='indeterminate' className={styles.progressBar}/>

    const brushSelectors = brushes.map(brush => {
      return(
        <BrushSelector
          brushSelect={this.handleBrushSelect}
          name={brush.name}
          color={brush.color}
          weight={brush.weight}
          key={brush.name}/>
      )
    })

    return(
      <div>
        <GraphPaper
          graph={colorGraph}
          handleToggle={this.handleToggle}/>
        {showLoading}
        <Button onClick={this.handleClear} raised style={{background: 'orange'}}>Clear</Button>
        {brushSelectors}
        <div className={styles.strokeSelector}>
          <p>Brush Size: </p>
          <Slider pinned snaps min={1} max={10} step={1}
            className={styles.slider}
            value={this.state.strokeSize}
            onChange={this.handleSlider.bind(this, 'strokeSize')} />
        </div>
      </div>
    )
  }
}

const brushes = [
  {
    name: 'flat',
    color: 'white',
    weight: 1
  },
  {
    name: 'grass',
    color: 'green',
    weight: 2
  },
  {
    name: 'water',
    color: 'blue',
    weight: 5
  },
  {
    name: 'wall',
    color: '#585858',
    weight: 0
  },
]
