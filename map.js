var scale = 20
var mapwd = 800 * scale
var mapht = 692 * scale
var lontrans = d3.scaleLinear().range([0,mapwd]).domain([121.281765,122.008083])
var lattrans = d3.scaleLinear().range([mapht,0]).domain([24.672875,25.30056])
var server = 'http://140.112.211.69:3001'

var map = d3.select('body').select('#mapcontainer')
	.style('width',mapwd + 'px')
	.style('height',mapht + 'px')
	.append('svg')
map.attr('width',mapwd).attr('height',mapht)

map.append('g').attr('id','taipeiMap').style('transform','scale('+scale+')').html(taipeiMap)


var grid = map.append('g').attr('id','gridlines')
for(var i=100;i<mapwd;i+=100){
	grid.append('path').attr('d','M '+i+' 0 L '+i+' '+mapht)
}
for(var i=100;i<mapht;i+=100){
	grid.append('path').attr('d','M 0 '+i+' L '+mapwd+' '+i)
}