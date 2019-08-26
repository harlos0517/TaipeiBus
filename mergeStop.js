var bus = map.append('g').attr('id','bus')
var busRoutePaths = bus.append('g').attr('id','busRoutePaths')
var busStops = bus .append('g').attr('id','busStops')

function dis(a,b){
	var sqsum = (a.lon-b.lon)*(a.lon-b.lon) + (a.lat-b.lat)*(a.lat-b.lat)
	return Math.sqrt(sqsum)
}

busStopLocation.BusInfo.forEach((e,i,a)=>{
	var subname = e.name.match(/\((.+)\)/)
	var mainname = e.name.match(/(^[^\(]+)/)
	e.subname = subname?subname[1]:''
	e.mainname = mainname?mainname[1]:''
})

var busStopGroup = []

busStopLocation.BusInfo.forEach((e,i,a)=>{
	var group = busStopGroup.find(x=>(x.name==e.name&&dis(e,x)<0.003))
	if (group) {
		var l = group.stops.length
		group.lon = (group.lon*l + parseFloat(e.lon))/(l+1)
		group.lat = (group.lat*l + parseFloat(e.lat))/(l+1)
		group.stops.push(e.id)
		e.group = group.id
	}
	else {
		var thisId = busStopGroup.length + 1
		busStopGroup.push({
			'id' : thisId,
			'name' : e.name,
			'lon' : parseFloat(e.lon),
			'lat' : parseFloat(e.lat),
			'stops' : [e.id]
		})
		e.group = thisId
	}
})

busRoutePath.features.forEach((e,i,a)=>{

	var thisLine = busRoutePaths.append('g')
		.attr('id',e.properties.BAD_CHINES)

	thisLine.append('path').data([e.geometry.coordinates]).attr('class','path')
		.style('stroke','#666666').style('stroke-width','.5').attr('d',d3.line()
		.x(d=>lontrans(d[0]))
		.y(d=>lattrans(d[1])))
})

busStopGroup.forEach((ge,gi,ga)=>{
	var color = "hsl(" + Math.random() * 360 + ",100%,50%)"
	var thisStop = busStops.append('g')
		.attr('id','stop-'+ge.id)
	ge.stops.forEach((e,i,a)=>{
		var stop = busStopLocation.BusInfo.find(x=>(x.id==e))
		if (!stop) return
		thisStop.append('circle')
			.attr('cx',lontrans(stop.lon))
			.attr('cy',lattrans(stop.lat))
			.attr('r','2')
			.style('fill',color)
	})
	thisStop.append('text').text(ge.name)
		.attr('text-anchor','middle')
		.attr('x',lontrans(ge.lon) + 0)
		.attr('y',lattrans(ge.lat) + 12)
		.style('fill',color)
		.style('font-weight','100')

})