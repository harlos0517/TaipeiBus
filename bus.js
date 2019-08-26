var bus = map.append('g').attr('id','bus')
var busStops = bus .append('g').attr('id','busStops')

function dis(a,b){
	var sqsum = (a.longitude-b.lon)*(a.longitude-b.lon) + (a.latitude-b.lat)*(a.latitude-b.lat)
	return Math.sqrt(sqsum)
}

busRoute.BusInfo.forEach((e,i,a)=>{
	if (i>500) return
	e.render = true
	e.stops = []
	var thisDetails = busDetail.BusInfo.filter(x=>(x.pathAttributeId==e.pathAttributeId))
	thisDetails.sort((a,b)=>(a.sequenceNo-b.sequenceNo))
	thisDetails.forEach((de,di,da)=>{
		de.render = true
		e.stops.push(de)
	})
})

busDetail.BusInfo.forEach((e,i,a)=>{
	if (!e.render) return
	var thisStop = busStop.BusInfo.find(x=>(x.Id==e.stopId))
	if(thisStop) thisStop.render = true
})


busStop.BusInfo.forEach((e,i,a)=>{
	var subname = e.nameZh.match(/\((.+)\)/)
	var mainname = e.nameZh.match(/(^[^\(]+)/)
	e.subname = subname?subname[1]:''
	e.mainname = mainname?mainname[1]:''
})

var busGroup = []

busStop.BusInfo.forEach((e,i,a)=>{
	if (!e.render) return
	var group = busGroup.find(x=>(x.mainname==e.mainname&&dis(e,x)<0.003))
	if (group) {
		var l = group.stops.length
		group.lon = (group.lon*l + parseFloat(e.longitude))/(l+1)
		group.lat = (group.lat*l + parseFloat(e.latitude ))/(l+1)
		group.stops.push(e.Id)
		e.group = group.id
	}
	else {
		var thisId = busGroup.length + 1
		busGroup.push({
			'id' : thisId,
			'mainname' : e.mainname,
			'lon' : parseFloat(e.longitude),
			'lat' : parseFloat(e.latitude),
			'stops' : [e.Id]
		})
		e.group = thisId
	}
})


var busRoutes = bus.append('g').attr('id','metroRoutes')
busRoute.BusInfo.forEach((e,i,a)=>{
	if (!e.render) return
	if (!e.stops) return

	e.stops.sort((a,b)=>(a.sequenceNo - b.sequenceNo))

	var thisLine = busRoutes.append('g')
		.attr('id',e.nameZh)
		.attr('_id',e.Id)

	var thisRoute = thisLine .append('g').attr('id',e.nameZh+'-route')
	var thisPaths = thisRoute.append('g').attr('id',e.nameZh+'-paths')
	var thisStops = thisRoute.append('g').attr('id',e.nameZh+'-stops')

	var thisGroups = e.stops.map(e=>{
		var thisStop = busStop.BusInfo.find(x=>(x.Id==e.stopId))
	//	console.log(thisStop)
		return busGroup.find(x=>(thisStop.group==x.id))
	})

	thisPaths.append('path').data([thisGroups]).attr('class','path')
		.style('stroke','#666666').style('stroke-width','.5').attr('d',d3.line()
		.x(d=>lontrans(d.lon))
		.y(d=>lattrans(d.lat)))
})
/*
busGroup.forEach((e,i,a)=>{
	var thisStop = busStops.append('g')
		.attr('id','stop-'+e.id)
	thisStop.append('circle')
		.attr('cx',lontrans(e.lon))
		.attr('cy',lattrans(e.lat))
		.attr('r','2')
	thisStop.append('text').text(e.mainname)
		.attr('text-anchor','middle')
		.attr('x',lontrans(e.lon) + 0)
		.attr('y',lattrans(e.lat) + 12)
})
*/

// {
//	"Id":25769,"routeId":11136,"nameZh":"北投市場(公館路)","nameEn":"Beitou Market(Gongguan)",
//	"seqNo":35,"pgp":"-1","longitude":"121.503543","latitude":"25.132517","goBack":"1","address":"公館路59號同向",
//	"stopLocationId":7243,"showLon":"121.50369","showLat":"25.13267","vector":"999"
// },{
//	"Id":25770,"routeId":11136,"nameZh":"北投國小","nameEn":"Beitou Elementary School",
//	"seqNo":36,"pgp":null,"longitude":"121.501215","latitude":"25.13356","goBack":"1","address":"中央北路一段2號同向",
//	"stopLocationId":50057,"showLon":"121.50097","showLat":"25.133891","vector":"999"
// }