var bus = map.append('g').attr('id','bus')
var busStops = bus .append('g').attr('id','busStops')

function dis(a,b){
	var sqsum = (a.lon-b.lon)*(a.lon-b.lon) + (a.lat-b.lat)*(a.lat-b.lat)
	return Math.sqrt(sqsum)
}

busStop.BusInfo.forEach(function(e,i,a){
	var subname = e.name.match(/\((.+)\)/)
	var mainname = e.name.match(/(^[^\(]+)/)
	e.subname = subname?subname[1]:undefined
	e.mainname = mainname?mainname[1]:undefined
})

var busStopCopy = busStop.BusInfo.slice(0)
/*
busStop.BusInfo.forEach(function(e,i,a){
	var sameStops = busStopCopy.filter(function(t){return (t.mainname==e.mainname && dis(e,t)<0.003)})
	var pos = [0,0]
	sameStops.forEach(function(se,si,sa){
			pos[0]+=parseFloat(se.lon)
			pos[1]+=parseFloat(se.lat)
		if(si!==0){
			busStopCopy.splice(busStopCopy.findIndex(function(t){return t.id==se.id}),1)
		}
	})
	pos[0]/=sameStops.length
	pos[1]/=sameStops.length

	e.lon = pos[0]
	e.lat = pos[1]

})
*/
busStopCopy.forEach(function(e,i,a){
	var thisStop = busStops.append('g')
		.attr('id','stop-'+e.id)
	thisStop.append('circle')
		.attr('cx',lontrans(e.lon))
		.attr('cy',lattrans(e.lat))
		.attr('r','2')
	thisStop.append('text').text(e.name)
		.attr('text-anchor','middle')
		.attr('x',lontrans(e.lon) + 0)
		.attr('y',lattrans(e.lat) + 12)
})


// {
//	"Id":25769,"routeId":11136,"nameZh":"北投市場(公館路)","nameEn":"Beitou Market(Gongguan)",
//	"seqNo":35,"pgp":"-1","longitude":"121.503543","latitude":"25.132517","goBack":"1","address":"公館路59號同向",
//	"stopLocationId":7243,"showLon":"121.50369","showLat":"25.13267","vector":"999"
// },{
//	"Id":25770,"routeId":11136,"nameZh":"北投國小","nameEn":"Beitou Elementary School",
//	"seqNo":36,"pgp":null,"longitude":"121.501215","latitude":"25.13356","goBack":"1","address":"中央北路一段2號同向",
//	"stopLocationId":50057,"showLon":"121.50097","showLat":"25.133891","vector":"999"
// }
