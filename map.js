var scale = 6
var mapwd = 800 * scale
var mapht = 692 * scale
var lontrans = d3.scaleLinear().range([0,mapwd]).domain([121.281765,122.008083])
var lattrans = d3.scaleLinear().range([mapht,0]).domain([24.672875,25.30056])

var map = d3.select('body').select('#mapcontainer')
	.style('width',mapwd + 'px')
	.style('height',mapht + 'px')
	.append('svg')
map.attr('width',mapwd).attr('height',mapht)

function addStop(lon,lat,g) {
	
}

map.append('g').attr('id','taipeiMap').style('transform','scale('+scale+')').html(taipeiMap);
/*
var stops = map.append('g').attr('id','stops')
stop.BusInfo.forEach(function(e,i,a){
	addStop(e.longitude,e.latitude,stops)
})
*/
var routes = map.append('g').attr('id','routes')
metroroute.features.forEach(function(e,i,a){
	var geo = e.geometry
	var thisroute = routes.append('g').attr('id',e.properties.RouteName)
	geo.coordinates.forEach(function(ce,ci,ca){
		thisroute.append('path').data([ce]).style('stroke',e.properties.color).attr('d',d3.line()
			.x(function(d){return lontrans(d[0])})
			.y(function(d){return lattrans(d[1])}))
	})
})

var stops = map.append('g').attr('id','stops')
metrostop.forEach(function(e,i,a){
	var thisStop = stops.append('g').attr('id',e.id)
	thisStop.append('circle')
		.attr('cx',lontrans(e.coordinates.lon))
		.attr('cy',lattrans(e.coordinates.lat))
		.attr('r','3')
	thisStop.append('text').text(e.name.zh)
		.attr('text-anchor','middle	')
		.attr('x',lontrans(e.coordinates.lon) + 0)
		.attr('y',lattrans(e.coordinates.lat) + 12)
})

var grid = map.append('g').attr('id','gridlines')
for(var i=100;i<mapwd;i+=100){
	grid.append('path').attr('d','M '+i+' 0 L '+i+' '+mapht)
}

for(var i=100;i<mapht;i+=100){
	grid.append('path').attr('d','M 0 '+i+' L '+mapwd+' '+i)
}
// addStop(121.3,25.29,map) //testing


