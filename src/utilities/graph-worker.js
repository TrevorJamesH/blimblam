onmessage = function(e) {
  const graph = e.data[0]
  const start = e.data[1]
  const end = e.data[2]
  const result = shortestPath(graph, start, end)
  postMessage(result);
}

function shortestPath(graph, start, end){

  const nodeGraph = graph.map((row, y) => {
    return row.map((cell, x) => {
      return new Node(cell.weight, x, y)
    })
  })

  const endNode = nodeGraph[end[1]][end[0]]
  endNode.end = true

  const startNode = nodeGraph[start[1]][start[0]]
  startNode.pathWeight = startNode.weight

  const toCheck = [startNode]

  while(toCheck.length){
    const checking = toCheck.shift()
    const neighborAxises = getNeighbors(nodeGraph, checking)
    neighborAxises.forEach(neighborAxis => {
      const neighbor = nodeGraph[neighborAxis.y][neighborAxis.x]
      const diagonal = checking.x === neighbor.x || checking.y === neighbor.y ? false : true
      const distance = diagonal ? Math.sqrt(2) : 1
      if(!neighbor.pathWeight || checking.pathWeight + neighbor.weight * distance < neighbor.pathWeight){
        checking.heads.push(neighbor)
        neighbor.tail = checking
        neighbor.pathWeight = checking.pathWeight + neighbor.weight * distance
        if(!neighbor.end){
          toCheck.push(neighbor)
        }
      }
    })
  }

  const path = extractPath(endNode, [endNode])

  return path.map(node => [node.x, node.y])
}

function extractPath(node, path){
  if(node.tail){
    return extractPath(node.tail, path.concat(node.tail))
  } else {
    return path
  }
}

function getNeighbors(graph, point){
  const potentialNeighbors = [[-1,0],[0,-1],[0,1],[1,0],[-1,-1],[1,-1],[-1,1],[1,1]]
  const neighbors = []
  potentialNeighbors.forEach(p => {
    if(
      graph[point.y + p[1]]
      && graph[point.y + p[1]][point.x + p[0]]
      && graph[point.y + p[1]][point.x + p[0]].weight
    ){
      neighbors.push({x: point.x + p[0], y: point.y + p[1]})
    }
  })
  return neighbors
}

class Node{
  constructor(weight, x, y){
    this.x = x
    this.y = y
    this.weight = weight
    this.heads = []
    this.tail = null
    this.pathWeight = null
  }

  checkDiagonal(currentPath){
    this.checkDiagonal(currentPath) ? Math.round((currentPath.weight + this.weight * Math.sqrt(2)) * 100)/100 : currentPath.weight + this.weight
    return this.location[0] !== currentPath.location[0] && this.location[1] !== currentPath.location[1]
  }
}
