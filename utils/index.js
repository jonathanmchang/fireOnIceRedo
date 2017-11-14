const d3 = require('d3');

const makeRinkWithD3 = (home, away) => {
  if(document.getElementsByTagName('svg') && document.getElementsByTagName('svg').length > 0){
    let svgArr=document.getElementsByTagName('svg')
    for (let i = 0; i < svgArr.length; i++)
    {svgArr[i].setAttribute("style", "display: none;")};  
  }
  const w = 400
  const h = 168
  var rinkArrHome = [];;
  var rinkArrAway = [];;
  // Seed Rink Arr
  for (let i = 0; i < 25; i++) {
  for (let j = 0; j < 21; j++) {
    rinkArrHome.push([i*8, j*8, 0])
  }
  }
  for (let i = 25; i < 50; i++) {
  for (let j = 0; j < 21; j++) {
    rinkArrAway.push([i*8, j*8, 0])
  }
  }
  
  function incrementShotHome(x, y) {
  x=x*2
  y=y*2
  console.log(x,y)
  for (let i = 0; i < rinkArrHome.length; i++) {
    if (x >= rinkArrHome[i][0] && x < (rinkArrHome[i][0]+8)) {
      if (y >= rinkArrHome[i][1] && y < (rinkArrHome[i][1]+8)){
        rinkArrHome[i][2]++
      }
    }
  }
  }
  
  function incrementShotAway(x, y) {
  x=x*2
  y=y*2
  // console.log(x,y)
  for (let i = 0; i < rinkArrAway.length; i++) {
    if (x >= rinkArrAway[i][0] && x < (rinkArrAway[i][0]+8)) {
      if (y >= rinkArrAway[i][1] && y < (rinkArrAway[i][1]+8)){
        rinkArrAway[i][2]++
      }
    }
  }
  }
  
  
  for (let i = 0; i < home.length; i++) {
  // console.log('***', shotData[i].coordinates.x)
  incrementShotHome(home[i].coordinates.x, home[i].coordinates.y)
  }
  
  for (let i = 0; i < away.length; i++) {
  incrementShotAway(away[i].coordinates.x, away[i].coordinates.y)
  }
  
  
  // console.log(rinkArrHome, rinkArrAway)
  
  // const itemSize = 8
  // const cellSize = itemSize -.5
  const cellSize = 8
  
  
  // const cellPadding = 1;
  let svg = d3.select('body')
  .append('svg')
  .attr('width', w+10)
  .attr('height', h+10)

  const redLine = svg.append('rect')
    .attr('x', 198)
    .attr('y', 0)
    .attr('height', h)
    .attr('width', '4')
    .style('fill', 'red')
  
  const leftGoalLine = svg.append('rect')
    .attr('x', 22)
    .attr('y', 6)
    .attr('height', h-12)
    .attr('width', '4')
    .style('fill', 'red')
  
  const rightGoalLine = svg.append('rect')
    .attr('x', 378)
    .attr('y', 6)
    .attr('height', h-12)
    .attr('width', '4')
    .style('fill', 'red')
  
  const leftBlueLine = svg.append('rect')
    .attr('x', 144)
    .attr('y', 0)
    .attr('height', h)
    .attr('width', '4')
    .style('fill', 'blue')
  
  const rightBlueLine = svg.append('rect')
    .attr('x', 252)
    .attr('y', 0)
    .attr('height', h)
    .attr('width', '4')
    .style('fill', 'blue')
  
  const bordercolor = 'black'
  const border = 4
  const borderPath = svg.append("rect")
  .attr('rx', 45)
  .attr('ry', 45)
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", h)
  .attr("width", w)
  .style("stroke", bordercolor)
  .style("fill", "none")
  .style("stroke-width", border);
  
  let colorScaleHome = d3.scaleLinear()
  .domain([0,4])
  .range(['white', 'red'])
  
  let colorScaleAway = d3.scaleLinear()
  .domain([0,4])
  .range(['white', 'blue'])
  
  var layer = svg.append('g');
  
  let heatCellsHome = svg.selectAll('rect')
  .data(rinkArrHome)
  .enter()
  // .append('g')
  .append('rect')
  .attr('rx', 6)
  .attr('ry', 6)
  .attr('x', (d) => d[0])
  .attr('y', (d)=> d[1] )      
  .attr('width', cellSize)
  .attr('height', cellSize)
  .attr('fill', (d) => colorScaleHome(d[2]))
  .attr('opacity', .8)  
  
  let heatCellsAway = layer.selectAll('rect')
  .data(rinkArrAway)
  .enter()
  // .append('g')
  .append('rect')
  .attr('rx', 6)
  .attr('ry', 6)
  .attr('x', (d) => d[0])
  .attr('y', (d)=> d[1] )      
  .attr('width', cellSize)
  .attr('height', cellSize)
  .attr('fill', (d) => colorScaleAway(d[2]))
  .attr('opacity', .8)  
}



const convertCoordinates = (coordinates, period) => {
  // Inverts the plot points on both axes to have all of Home teams shots on lefts side and all Away teams shots on right side.
  if (period === 2) {
      coordinates.x = coordinates.x * -1
      coordinates.y = coordinates.y * -1
  }
  // Shifts coordinates fro use in D3 which moves to the righ and down, positively starting at zero
  coordinates.x = coordinates.x + 99
  coordinates.y = (coordinates.y * -1) + 42
  return coordinates
}

module.exports = { 
  convertCoordinates,
  makeRinkWithD3
};