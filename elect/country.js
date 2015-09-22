var density = {
	"臺北市": 40.82,
	"嘉義市": 45.50,
	"新竹市": 37.85,
	"基隆市": 27.47,
	"新北市": 50.06,
	"桃園市": 47.97,
	"臺中市": 42.94,
	"彰化縣": 39.58,
	"高雄市": 30.89,
	"臺南市": 27.10,
	"金門縣": 33.35,
	"澎湖縣": 44.66,
	"雲林縣": 43.02,
	"連江縣": 100,
	"新竹縣": 46.94,
	"苗栗縣": 46.59,
	"屏東縣": 37.07,
	"嘉義縣": 34.09,
	"宜蘭縣": 36.05,
	"南投縣": 50.96,
	"花蓮縣": 71.96,
	"臺東縣": 63.75
};

var victory = {
	"臺北市": "柯文哲",
	"嘉義市": "涂醒哲",
	"新竹市": "林智堅",
	"基隆市": "林右昌",
	"新北市": "朱立倫",
	"桃園市": "鄭文燦",
	"臺中市": "林佳龍",
	"彰化縣": "魏明谷",
	"高雄市": "陳菊",
	"臺南市": "賴清德",
	"金門縣": "陳福海",
	"澎湖縣": "陳光復",
	"雲林縣": "李進勇",
	"連江縣": "劉增應",
	"新竹縣": "邱鏡淳",
	"苗栗縣": "徐耀昌",
	"屏東縣": "潘孟安",
	"嘉義縣": "張花冠",
	"宜蘭縣": "林聰賢",
	"南投縣": "林明溱",
	"花蓮縣": "傅崐萁",
	"臺東縣": "黃健庭"
}


d3.json("county.json", function(topodata) {

	var features = topojson.feature(topodata, topodata.objects["county"]).features;
	// 這裡要注意的是 topodata.objects["county"] 中的 "county" 為原本 shp 的檔名
	

	var path = d3.geo.path().projection( // 路徑產生器
	d3.geo.mercator().center([121,24]).scale(6000) // 座標變換函式
		);

	d3.select("svg").selectAll("path").data(features)
	.enter().append("path").attr("d",path);

  	for(var idx=features.length - 1; idx >=0; idx -- ) {
		features[idx].density = density[features[idx].properties.C_Name];
		features[idx].victory = victory[features[idx].properties.C_Name];
		}

		var color = d3.scale.linear().domain([0,100]).range(["rgb(0,255,0)","rgb(0,0,255)"]);
		
		d3.select("svg").selectAll("path").data(features).attr({
			d: path,
		fill: function(d) {
  			return color(d.density); }
		}).on("mouseover", function(d) {
        	$("#name").text(d.properties.C_Name);
        	$("#vote").text(d.density);
			$("#victory").text("當選人："+d.victory);
        });
	});