var scale = 6
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

map.append('g').attr('id','taipeiMap').style('transform','scale('+scale+')').html(taipeiMap);

function getData(e,f){
	var req = new XMLHttpRequest()
	req.open('GET',server + '/' + e)
	req.setRequestHeader('Content-Type','application/X-www-form-urlencoded')
	req.send()
	req.onreadystatechange = function () {
		if(req.readyState === XMLHttpRequest.DONE){
			console.log(server + ' responded with status ' + req.status)
			if(req.status>=200 && req.status<400){
				f(JSON.parse(req.response))
			}
		}
	}
}

getData('metroStop',function(metroStop){
	getData('metroSection',function(metroSection){
		getData('metroRoute',function(metroRoute){
			var routes = map.append('g').attr('id','routes')
			function findStop   (_id){ return metroStop.find(function (x){ return (x._id==_id) }) }
			function findSection(_id){
				var section = {"start": 0,"end": 0, "coordinates": []}
				var found = metroSection.find(function (x){ return (x._id==_id) })
				if (found.reverseOf) {
					found = metroSection.find(function (x){ return (x._id==found.reverseOf) })
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

			metroRoute.forEach(function(le,li,la){
				var thisLine = routes.append('g')
					.attr('id',le.lineName)
					.attr('_id',le._id)

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

			var stops = map.append('g').attr('id','stops')
			metroStop.forEach(function(e,i,a){
				var thisStop = stops.append('g')
					.attr('id','stop-'+e.id)
					.attr('_id',e._id)
				thisStop.append('circle')
					.attr('cx',lontrans(e.coordinates[0]))
					.attr('cy',lattrans(e.coordinates[1]))
					.attr('r','3')
				thisStop.append('text').text(e.name.zh)
					.attr('text-anchor','middle')
					.attr('x',lontrans(e.coordinates[0]) + 0)
					.attr('y',lattrans(e.coordinates[1]) + 16)
			})

			var metroStopTable = d3.select('body').select('#metroStop-table').select('table')
			metroStop.reverse().forEach(function(e,i,a){
				var tr = metroStopTable.append('tr')
				tr.append('td').text(e.id)
				tr.append('td').text(e.code)
				tr.append('td').text(e.name.zh)
				tr.append('td').text(e.name.en)
				tr.append('td').text(e.coordinates[0])
				tr.append('td').text(e.coordinates[1])
			})

		})
	})
})

var grid = map.append('g').attr('id','gridlines')
for(var i=100;i<mapwd;i+=100){
	grid.append('path').attr('d','M '+i+' 0 L '+i+' '+mapht)
}
for(var i=100;i<mapht;i+=100){
	grid.append('path').attr('d','M 0 '+i+' L '+mapwd+' '+i)
}
// addStop(121.3,25.29,map) //testing
