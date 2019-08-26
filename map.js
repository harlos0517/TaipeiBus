var scale = 20
var mapwd = 800 * scale
var mapht = 692 * scale
var lontrans = d3.scaleLinear().range([0,mapwd]).domain([121.281765,122.008083])
//var lontrans = d3.scaleLinear().range([0,mapwd]).domain([121.40,121.68])
//var twdlontrans = d3.scaleLinear().range([0,mapwd]).domain([278516.274,351510.306])
var lattrans = d3.scaleLinear().range([mapht,0]).domain([24.672875,25.30056])
//var lattrans = d3.scaleLinear().range([mapht,0]).domain([24.94,25.23])
//var twdlattrans = d3.scaleLinear().range([mapht,0]).domain([2729574.671,2799450.474])
var server = 'http://140.112.211.69:3001'

var map = d3.select('body').select('#mapcontainer')
	.style('width',mapwd + 'px')
	.style('height',mapht + 'px')
	.append('svg')
map.attr('width',mapwd).attr('height',mapht)

map.append('g').attr('id','taipeiMap').style('transform',`scale(${scale})`).html(taipeiMap)


var grid = map.append('g').attr('id','gridlines')
for(var i=121.29;i<122.01;i+=0.01){
	var lon = lontrans(i)
	grid.append('path').attr('d','M '+lon+' 0 L '+lon+' '+mapht)
}
for(var i=24.68;i<25.31;i+=0.01){
	var lat = lattrans(i)
	grid.append('path').attr('d','M 0 '+lat+' L '+mapwd+' '+lat)
}

function toAlpha(i){
	var j = Math.floor(i/26)
	var ja = (j>0)?String.fromCharCode(0x40+j):' '
	return ja+String.fromCharCode(0x41+i%26)
}

var gridNames = map.append('g').attr('id','gridName')
for(var i=0;i<30;i++) for(var j=0;j<29;j++) {
	gridNames.append('text').text(toAlpha(i)+(j+1+''))
		.attr('text-anchor','middle')
		.attr('x',lontrans(121.395+i*0.01))
		.attr('y',lattrans(25.2235-j*0.01))
		.style('fill','#222222')
		.style('font-size','80px')
		.style('font-weight','900')
}