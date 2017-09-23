import React, { Component } from 'react';

export default class GraphPaper extends Component{
  constructor(){
    super()
    this.ctx = null
    this.state = {
      click: false,
      selectedX: null,
      selectedY: null,
    }
  }

  componentDidMount(){
    this.initializeCanvas()
  }

  componentWillReceiveProps(newProps){
    const {graph} = newProps
    this.updateCanvas(graph)
  }

  initializeCanvas(){
    this.ctx = this.refs.canvas.getContext('2d');
    const {ctx} = this
    const {graph} = this.props
    const width = graph[0].length
    const height = graph.length

    ctx.strokeStyle = this.props.gridColor || "black";
    for(let i = 0; i <= width; i++){
      ctx.moveTo(i * 10, 0)
      ctx.lineTo(i * 10, height * 10)
    }

    for(let i = 0; i <= height; i++){
      ctx.moveTo(0, i * 10)
      ctx.lineTo(width * 10, i * 10)
    }
    ctx.stroke();
    this.updateCanvas(graph)
  }

  updateCanvas(graph) {
    const {ctx} = this

    graph.forEach((row, rIndex) => {
      row.forEach((cell, cIndex) => {
        ctx.fillStyle = cell
        ctx.fillRect(cIndex * 10, rIndex * 10, 10, 10)
      })
    })

    ctx.stroke();
  }

  handleMouseMove(event){
    if(this.state.click){
      const canvasRect = this.ctx.canvas.getBoundingClientRect()
      const xClick = event.pageX - Math.floor(canvasRect.left) - document.body.scrollLeft;
      const yClick = event.pageY - Math.floor(canvasRect.top) - document.body.scrollTop;
      const xSquare = Math.floor(xClick / 10)
      const ySquare = Math.floor(yClick / 10)
      if(this.state.selectedX !== xSquare || this.state.selectedY !== ySquare){
        this.toggle(xSquare,ySquare)
      }
      this.setState({
        selectedX: xSquare,
        selectedY: ySquare,
      })
    }
  }

  handleMouseDown(event){
    const canvasRect = this.ctx.canvas.getBoundingClientRect()
    const xClick = event.pageX - Math.floor(canvasRect.left) - document.body.scrollLeft;
    const yClick = event.pageY - Math.floor(canvasRect.top) - document.body.scrollTop;
    const xSquare = Math.floor(xClick / 10)
    const ySquare = Math.floor(yClick / 10)
    this.setState({
      click: true,
    })
    this.toggle(xSquare,ySquare)
  }

  handleMouseUp(){
    this.setState({
      click: false
    })
  }

  toggle(x,y){
    this.props.handleToggle(x,y)
  }

  render(){
    const {graph} = this.props
    const width = graph[0].length
    const height = graph.length

    return(
      <div>
        <canvas
          ref='canvas'
          width={width * 10}
          height={height * 10}
          onMouseUp={this.handleMouseUp.bind(this)}
          onMouseLeave={this.handleMouseUp.bind(this)}
          onMouseDown={this.handleMouseDown.bind(this)}
          onMouseMove={this.handleMouseMove.bind(this)}>
        </canvas>
      </div>
    )
  }
}
