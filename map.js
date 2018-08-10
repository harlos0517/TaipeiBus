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
/*
// Old version
metroroute.forEach(function(e,i,a){
	var geo = e.geometry
	var thisRoute = routes.append('g').attr('id',e.RouteName)
	e.coordinates.forEach(function(ce,ci,ca){
		thisRoute.append('path').data([ce]).style('stroke',e.color).attr('d',d3.line()
			.x(function(d){return lontrans(d[0])})
			.y(function(d){return lattrans(d[1])}))
	})
})
*/
// New version
function findStop   (id){ return metroStop  .find(function (x){ return (x.id==id) }) }
function findSection(id){
	var section = {"start": 0,"end": 0, "coordinates": []}
	var found = metroSection.find(function (x){ return (x.id==id) })
	if (found.reverseOf !== 0) {
		found = metroSection.find(function (x){ return (x.id==found.reverseOf) })
		section.start = found.endStation
		section.end   = found.startStation
		section.coordinates = found.coordinates.slice()
		section.coordinates.reverse()
		section.coordinates.splice(0,0,findStop(section.start).coordinates)
		section.coordinates.push(findStop(section.end).coordinates)
	}
	else {
		section.start = found.startStation
		section.end   = found.endStation
		section.coordinates = found.coordinates.slice()
		section.coordinates.splice(0,0,findStop(section.start).coordinates)
		section.coordinates.push(findStop(section.end).coordinates) 
	}
	return section
}
function drawStop   (g,id,strokeColor,radius){
	g.append('circle').attr('class','stop')
		.attr('cx',lontrans(findStop(id).coordinates[0]))
		.attr('cy',lattrans(findStop(id).coordinates[1]))
		.attr('r',radius).style('stroke',strokeColor)
}
function drawSection(g,id,strokeColor){
	var thisSection = findSection(id)
	g.append('path').data([thisSection.coordinates]).attr('class','section')
		.style('stroke',strokeColor).attr('d',d3.line()
		.x(function(d){return lontrans(d[0])})
		.y(function(d){return lattrans(d[1])}))
	return thisSection
}

metro.forEach(function(le,li,la){
	var thisLine = routes.append('g').attr('id',le.lineName)

	le.routes.forEach(function(re,ri,ra){
		var thisRoute    = thisLine .append('g').attr('id',re.routeName+'-route'   )
		var thisSections = thisRoute.append('g').attr('id',re.routeName+'-sections')
		var thisStops    = thisRoute.append('g').attr('id',re.routeName+'-stops'   )

		var thisStop = findSection(re.sections[0]).start
		drawStop(thisStops,thisStop,le.color,5)
		re.sections.forEach(function(se,si,sa){
			var thisSection = drawSection(thisSections,se,le.color)
			drawStop(thisStops,thisSection.end,le.color,5)
		})
	})
})


var stopNames = map.append('g').attr('id','stopNames')
metroStop.forEach(function(e,i,a){
	stopNames.append('text').attr('id','stop-'+e.id).text(e.name.zh)
		.attr('text-anchor','middle')
		.attr('x',lontrans(e.coordinates[0]) + 0)
		.attr('y',lattrans(e.coordinates[1]) + 16)
})

var grid = map.append('g').attr('id','gridlines')
for(var i=100;i<mapwd;i+=100){
	grid.append('path').attr('d','M '+i+' 0 L '+i+' '+mapht)
}

for(var i=100;i<mapht;i+=100){
	grid.append('path').attr('d','M 0 '+i+' L '+mapwd+' '+i)
}
// addStop(121.3,25.29,map) //testing
