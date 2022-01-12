var bus = map.append('g').attr('id','bus')
var busRoutePaths = bus.append('g').attr('id','busRoutePaths')
var busSections = bus.append('g').attr('id','busSections')
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
		.style('stroke','#FF0000').style('stroke-width','.5').attr('d',d3.line()
		.x(d=>lontrans(d[0]))
		.y(d=>lattrans(d[1])))
})


busStopGroup.forEach((ge,gi,ga)=>{
	var thisStop = busStops.append('g')
		.attr('id','stop-'+ge.id)

	thisStop.append('circle')
		.attr('cx',lontrans(ge.lon))
		.attr('cy',lattrans(ge.lat))
		.attr('r','2')

	thisStop.append('text').text(ge.name)
		.attr('text-anchor','middle')
		.attr('x',lontrans(ge.lon) + 0)
		.attr('y',lattrans(ge.lat) + 12)

})

busRoute.BusInfo.forEach((e,i,a)=>{
	var thisDetails = busDetail.BusInfo.filter(x=>(x.pathAttributeId==e.pathAttributeId))
	thisDetails.sort((a,b)=>(a.sequenceNo-b.sequenceNo))
	e.stops = []
	thisDetails.forEach((de,di,da)=>{
		var thisStop = busStop.BusInfo.find(x=>(x.Id==de.stopId))
		if (!thisStop) return
		e.stops.push(thisStop)
	})
})

var busSection = []
busRoute.BusInfo.forEach((e,i,a)=>{
	var l = e.stops.length
	e.sections = []
	if (e.stops[0].seqNo!=0) 
		console.log(`Path ${e.pathAttributeId}: Starting from No.${e.stops[0].seqNo}`)
	for (var si=1;si<l;si++) {
		var diff = e.stops[si].seqNo-e.stops[si-1].seqNo
		if (diff!=1) {
			if (diff ==2)
				console.log(`Path ${e.pathAttributeId}: missing stop No.${e.stops[si-1].seqNo+1}`)
			else
				console.log(`Path ${e.pathAttributeId}: missing stop No.${e.stops[si-1].seqNo+1}~${e.stops[si].seqNo-1}`)
			continue
		}
		var start = busStopLocation.BusInfo.find(x=>(x.id==e.stops[si-1].stopLocationId))
		var end   = busStopLocation.BusInfo.find(x=>(x.id==e.stops[si  ].stopLocationId))
		if (!start||!end) continue

		var startGroup = busStopGroup.find(x=>(x.id==start.group))
		var endGroup   = busStopGroup.find(x=>(x.id==end  .group))
		if (!startGroup||!endGroup) continue

		var thisSection = busSection.find(x=>(x.startId==startGroup.id&&x.endId==endGroup.id))
		if (thisSection) {
			thisSection.count ++
			e.sections.push(thisSection)
			continue
		}
		var revSection = busSection.find(x=>(x.startId==endGroup.id&&x.endId==startGroup.id))
		if (revSection) {
			revSection.revCount ++
			e.sections.push(revSection)
		}
		else {
			obj = {
				'id': busSection.length + 1,
				'startId' : startGroup.id,
				'endId' : endGroup.id,
				'count' : 1,
				'revCount' : 0
			}
			e.sections.push(obj)
			busSection.push(obj)
		}
	}
})

busSection.forEach((e,i,a)=>{
	var thisSection = busSections.append('g')
		.attr('id','section-'+e.id)
		.attr('class','section')
	var start = busStopGroup.find(x=>(e.startId==x.id))
	var end   = busStopGroup.find(x=>(e.endId  ==x.id))
	thisSection.append('path').attr('class','path')
		.style('stroke','#FFFF88')
		.style('stroke-width',`${Math.sqrt(e.count+e.revCount)*0.5}`)
		.attr('d',path({
			'x':lontrans(start.lon),
			'y':lattrans(start.lat)
		},{
			'x':lontrans(end.lon),
			'y':lattrans(end.lat)
		}))
/*
	thisSection.append('text').text(`${e.count}/${e.revCount}`)
		.attr('x',lontrans((start.lon + end.lon)/2))
		.attr('y',lattrans((start.lat + end.lat)/2))
		.attr('text-anchor','middle')
		.style('font-weight','200')
*/
})

function sgn(a) {return a>0?a:0}

function path(a,b){
	var str = `M ${a.x} ${a.y} `

	var dx = b.x-a.x
	var dy = b.y-a.y
	var adx = Math.abs(b.x-a.x)
	var ady = Math.abs(b.y-a.y)
	var dir = [Math.sign(dx),Math.sign(dy)]
	var turn = adx>ady?[Math.sign(dx),0]:[0,Math.sign(dy)]
	var c = Math.abs(adx-ady)/2
	var d = adx<ady?adx:ady

	if (c==0||d==0) return str + `L ${b.x} ${b.y}`

	var s2 = Math.sqrt(2)
	var k = 5
	var r = k/Math.tan(Math.PI/8)

	if (r>d/s2) {
		r = d/s2
		k = r*Math.tan(Math.PI/8)
	}
	if(k>c) {
		k = c
		r = k/Math.tan(Math.PI/8)
	}


	var p1 = [a.x+turn[0]*(c-k),a.y+turn[1]*(c-k)]
	var p2 = [a.x+turn[0]*c+dir[0]*(k/s2),a.y+turn[1]*c+dir[1]*(k/s2)]
	var p3 = [b.x-turn[0]*c-dir[0]*(k/s2),b.y-turn[1]*c-dir[1]*(k/s2)]
	var p4 = [b.x-turn[0]*(c-k),b.y-turn[1]*(c-k)]

	var sweep = function(){
		if ((dir[0]*dir[1]>0&&turn[1])||(dir[0]*dir[1]<0&&turn[0]))
			return true
		else return false
	}

	str += `L ${p1[0]} ${p1[1]} `
	str += `A ${r} ${r}, 0, 0, ${sweep()?0:1}, ${p2[0]} ${p2[1]} `
	str += `L ${p3[0]} ${p3[1]} `
	str += `A ${r} ${r}, 0, 0, ${sweep()?1:0}, ${p4[0]} ${p4[1]} `
	str += `L ${b.x} ${b.y}`
	return str
}

function showPath(id){
	busSection.forEach((e,i,a)=>{
		d3.select('#section-'+e.id+' path')
			.style('stroke',id?'#FFFFFF':'#FFFF88')
			.style('stroke-width',`${Math.sqrt(e.count+e.revCount)*0.5}`)
	})
	if (id==0) return
	var thisRoute = busRoute.BusInfo.find(x=>(x.pathAttributeId==id))
	if (!thisRoute) return
	thisRoute.sections.forEach((e,i,a)=>{
		d3.select('#section-'+e.id+' path')
			.style('stroke','#00FF00')
			.style('stroke-width',`3`)
	})
}