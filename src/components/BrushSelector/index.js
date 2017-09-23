import React, { Component } from 'react';
import GraphPaper from '../GraphPaper'
import {Button} from 'react-toolbox/lib/button'

export default class BrushSelector extends Component{

  handleClick(){
    const {color, weight} = this.props
    this.props.brushSelect(color, weight)
  }

  render(){
    const {name, color, weight} = this.props

    return(
      <Button raised
        onClick={this.handleClick.bind(this)}
        style={{background: color}}
      >
        {name}
      </Button>
    )
  }
}
