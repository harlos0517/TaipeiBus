var mapwd = 16384
var mapht = 16384
var lontrans = d3.scaleLinear().range([0,mapwd]).domain([121.282673,122.007175])
var lattrans = d3.scaleLinear().range([mapht,0]).domain([24.673781,25.299654])

var map = d3.select('body').select('#mapcontainer').append('svg')
map.attr('width',mapwd).attr('height',mapht)

function addStop(lon,lat,g) {
	g.append('circle')
		.attr('cx',lontrans(lon))
		.attr('cy',lattrans(lat))
		.attr('r','16')
		.attr('fill','#000000')
}

// addStop(121.3,25.29,map) //testing


