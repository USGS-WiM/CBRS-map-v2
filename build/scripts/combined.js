function addCommas(e){e+="";for(var a=e.split("."),i=a[0],t=a.length>1?"."+a[1]:"",o=/(\d+)(\d{3})/;o.test(i);)i=i.replace(o,"$1,$2");return i+t}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,a){return 0===a?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}function stateSelected(){var e=$("#stateSelect")[0];if(e.selectedIndex>0){var a=e.options[e.selectedIndex].value,i=e.options[e.selectedIndex].label;$("#downloadState").html("Download <a target='_blank' href='http://www.fws.gov/wetlands/Downloads/State/"+a+"_wetlands.zip'>Geodatabase</a> and <a target='_blank' href='http://www.fws.gov/wetlands/Downloads/State/"+a+"_shapefile_wetlands.zip'>Shapefile</a> data for <b>"+i+"</b>")}else $("#downloadState").html("")}function hucLinkListener(e){console.log(e),$.get("https://fwsmapper.wim.usgs.gov/downloadLoggingService/downloadLog.asmx/Log?huc="+e+",NWIV2",function(e){})}var allLayers,renderer;require(["esri/InfoTemplate","esri/renderers/UniqueValueRenderer","esri/symbols/PictureMarkerSymbol","dojo/domReady!"],function(e,a,i){var t=new i("./images/grn-pushpin.png",45,45);renderer=new a(t);new e("${NAME}","Type: ${TYPE}<br/>Ramsar: <a id='ramsarLink' target='_blank' href='${HYPERLINK_2}'>click here</a><br/>Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>");allLayers=[{groupHeading:"ESRI dynamic map services",showGroupHeading:!1,includeInLayerList:!0,layers:{"Existing Polygons":{url:"http://services.arcgis.com/v01gqwM5QqNysAAi/ArcGIS/rest/services/projectMapper/FeatureServer/1?token=50KnCorhsD5LzoIyiygHBuyTga3ov1835mNFDwvcX2gzoLKYhJE-baCf5uHQtnrRPWnLAPIVOJWIiGwa9AMNuHU0ZvAlS9SaMzpad7AWSUsElgeVZ4rjlyDC3bMyggOZBQNqFvm4dmTODrU5QeHMUtCDdIYR7cTw4abmw_VArJDf1MCJs_OwmUCj-n2ineHQneEY0gcwIptDmdu_f_cIQQ..",visibleLayers:[1],options:{id:"existingPoly",opacity:.75,visible:!0},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,exclusiveGroupName:"Layers",zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}},"Revised Polygons":{url:"http://services.arcgis.com/v01gqwM5QqNysAAi/ArcGIS/rest/services/projectMapper/FeatureServer/2?token=50KnCorhsD5LzoIyiygHBuyTga3ov1835mNFDwvcX2gzoLKYhJE-baCf5uHQtnrRPWnLAPIVOJWIiGwa9AMNuHU0ZvAlS9SaMzpad7AWSUsElgeVZ4rjlyDC3bMyggOZBQNqFvm4dmTODrU5QeHMUtCDdIYR7cTw4abmw_VArJDf1MCJs_OwmUCj-n2ineHQneEY0gcwIptDmdu_f_cIQQ..",options:{id:"revisedPoly",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,exclusiveGroupName:"Layers",zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}},"Change Polygons":{url:"https://services.arcgis.com/v01gqwM5QqNysAAi/ArcGIS/rest/services/projectMapper/FeatureServer/0?token=50KnCorhsD5LzoIyiygHBuyTga3ov1835mNFDwvcX2gzoLKYhJE-baCf5uHQtnrRPWnLAPIVOJWIiGwa9AMNuHU0ZvAlS9SaMzpad7AWSUsElgeVZ4rjlyDC3bMyggOZBQNqFvm4dmTODrU5QeHMUtCDdIYR7cTw4abmw_VArJDf1MCJs_OwmUCj-n2ineHQneEY0gcwIptDmdu_f_cIQQ..",visibleLayers:[0],options:{id:"changePoly",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,exclusiveGroupName:"Layers",zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0},polygons:{url:"http://services.arcgis.com/v01gqwM5QqNysAAi/ArcGIS/rest/services/projectMapper/FeatureServer/?token=GWQZpQqimeHi_yFRbXxz-5ca6eNeillh596AOSghDnUyDOCiPGRocNJsBx4DMLGJhhj7XQU2RFH1IiSH-Y6pLV3Idx2miPH9mGT51zCWnPLGLtfY9ugflEFTUM0WStls9tqQQX6Dk3oyb8EhFVpPjmmgUEQXQcWxM8vHVA5_1811Rzy9cy0gaXEJOHUU5awkYS0_Cp9cf4cUmTu1T4AzEQ..",visibleLayers:[0],options:{id:"polygons",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,exclusiveGroupName:"Layers",zoomScale:144448,hasOpacitySlider:!0,includeLegend:!1}}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight,printCount=0,legendLayers=[],measurement,queryTask,query,polyClicked=!1;require(["esri/map","esri/arcgis/utils","esri/config","esri/dijit/Geocoder","esri/dijit/HomeButton","esri/dijit/Legend","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Extent","esri/geometry/Multipoint","esri/geometry/Point","esri/geometry/Polygon","esri/layers/ArcGISTiledMapServiceLayer","esri/renderers/UniqueValueRenderer","esri/SpatialReference","esri/symbols/PictureMarkerSymbol","esri/tasks/GeometryService","esri/tasks/IdentifyParameters","esri/tasks/IdentifyTask","esri/InfoTemplate","esri/tasks/query","esri/tasks/QueryTask","esri/tasks/LegendLayer","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/geometry/webMercatorUtils","esri/urlUtils","dojo/dom","dojo/dom-class","dojo/dnd/Moveable","dojo/query","dojo/on","dojo/domReady!"],function(e,a,i,t,o,n,s,r,l,c,p,d,g,u,y,m,f,h,b,v,w,L,T,k,S,x,q,I,_,D,C,M,O,P,A){function R(){$("#printModal").modal("show")}function U(){$("#getDataModal").modal("show")}function H(){function e(e){printCount++;var a=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+l+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(a),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function a(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem")}var i=new q;i.map=map;var t=new I;t.exportOptions={width:500,height:400,dpi:300},t.format="PDF",t.layout="Letter ANSI A Landscape Test",t.preserveScale=!1;var o=new S;o.layerId="existingPoly";var n=new S;n.layerId="revisedPoly";var s=new S;s.layerId="changePoly";var r=$("#printTitle").val();""==r?t.layoutOptions={titleText:"Wetlands",authorText:"Coastal Barrier Resources System (CBRS)",copyrightText:"This page was produced by the CBRS Projects Map",legendLayers:[o,n,s]}:t.layoutOptions={titleText:r,authorText:"Coastal Barrier Resources System (CBRS)",copyrightText:"This page was produced by the CBRS Projects Map",legendLayers:[o,n,s]};var l=t.layoutOptions.titleText;i.template=t;var c=new x("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");c.execute(i,e,a),$.get("https://fwsmapper.wim.usgs.gov/pdfLoggingService/pdfLog.asmx/Log?printInfo="+map.getScale()+","+map.extent.xmin+","+map.extent.ymax+","+map.extent.xmax+","+map.extent.ymin+",NWIV2",function(e){})}function E(e,a){var i;document.getElementById&&(i=document.getElementById(e))&&i.style&&(i.style.cursor=a)}i.defaults.io.corsEnabledServers.push("fwsmapper.wim.usgs.gov"),esri.config.defaults.io.proxyUrl="https://fwsmapper.wim.usgs.gov/serviceProxy/proxy.ashx",i.defaults.geometryService=new b("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),map=new e("mapDiv",{basemap:"gray",extent:new p(-8514e3,4741e3,-8045e3,4912e3,new f({wkid:3857}))});var z=new o({map:map,extent:new p(-8514e3,4741e3,-8045e3,4912e3,new f({wkid:3857}))},"homeButton");z.startup();var N=new s({map:map,scale:4514},"locateButton");N.startup(),measurement=new r({map:map,advancedLocationUnits:!0},C.byId("measurementDiv")),measurement.startup(),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#printNavButton").click(function(){R()}),$("#printExecuteButton").click(function(e){e.preventDefault(),$(this).button("loading"),H()}),$("#getDataButton").click(function(){U()}),$(document).ready(function(){}),A(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var a=_.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(a.y.toFixed(3)),$("#longitude").html(a.x.toFixed(3)),$("#firstModal").modal("show")}),A(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),A(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var a=_.webMercatorToGeographic(e.mapPoint);$("#latitude").html(a.y.toFixed(3)),$("#longitude").html(a.x.toFixed(3))}}),A(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=_.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var j=new y("https://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer"),G=new y("https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer"),Q=new y("https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer");A(C.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(G),map.removeLayer(j),map.removeLayer(Q)}),A(C.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(G),map.removeLayer(j),map.removeLayer(Q)}),A(C.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(G),map.removeLayer(j),map.removeLayer(Q)}),A(C.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(G),map.removeLayer(j),map.removeLayer(Q)}),A(C.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(G),map.removeLayer(j),map.removeLayer(Q)}),A(C.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(G),map.removeLayer(j),map.removeLayer(Q)}),A(C.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(G),map.removeLayer(j),map.removeLayer(Q)}),A(C.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(G),map.removeLayer(j),map.removeLayer(Q)}),A(C.byId("btnNatlMap"),"click",function(){map.addLayer(G,1),map.removeLayer(j),map.removeLayer(Q),map.removeLayer(Q)}),A(C.byId("btnUsgsImgTopo"),"click",function(){map.addLayer(Q,1),map.removeLayer(G),map.removeLayer(j)}),A(C.byId("btnUsgsTopo"),"click",function(){map.addLayer(j,1),map.removeLayer(G),map.removeLayer(Q)}),$("#selectionDiv").lobiPanel({unpin:!1,reload:!1,minimize:!1,close:!1,expand:!1,editTitle:!1,maxWidth:800,maxHeight:550}),$("#selectionDiv .dropdown").prepend("<div id='selectionClose' tite='close'><b>X</b></div>"),$("#selectionMin").click(function(){$("#selectionDiv").css("visibility","hidden")}),$("#selectionClose").click(function(){$("#selectionDiv").css("visibility","hidden")}),A(map,"click",function(e){function a(e){if(map.graphics.clear(),e.features.length>0){var a,i=e.features[0];a=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,0,225]),2),new dojo.Color([98,194,204,0])),i.geometry.spatialReference=map.spatialReference;var t=i;t.setSymbol(a),map.graphics.add(t),$("#unitNum").text(i.attributes.Unit),$("#projName").text(i.attributes.Project_name),$("#status").text(i.attributes.Status),$("#docketURL").html(i.attributes.Docket_URL),"Reclassification to System Unit"==i.attributes.Change_Typ,$("#reclassification").html("You have clicked within an area that is proposed for "+i.attributes.Change_Typ),"No change"==i.attributes.Change_Typ&&$("#reclassification").html("You have clicked within an area that is proposed to remain within the CBRS as "+i.attributes.Unit),$("#unitName").text(i.attributes.Name),$("#unitType").text(i.attributes.Unit_Type),$("#changeTyp").text(i.attributes.Change_Typ),$("#summaryUrl").text(i.attributes.Summary_URL),$("#siteUnit").text(i.attributes.Unit),$("#summaryUrl").html("<a href=#"+$("#summaryUrl").text(i.attributes.Summary_URL))}$("#selectionDiv").css("visibility","visible");var o=$("#selectionDiv").data("lobiPanel"),n=$(document).height(),s=$(document).width(),r=.5*s-.5*$("#selectionDiv").width(),l=.8*n-1*$("#selectionDiv").height();o.setPosition(r,l),1==o.isPinned()&&o.unpin()}if(1==polyClicked)return void(polyClicked=!1);if(null==measurement.activeTool&&(map.graphics.clear(),map.getLevel()&&0==e.graphic._graphicsLayer.layerId)){P=new T,P.returnGeometry=!0,P.geometry=e.mapPoint,P.outFields=["Unit","Name","Unit_Type","Change_Typ","Summary_URL","Project_name","Status","Docket_URL"],queryTask=new k("http://services.arcgis.com/v01gqwM5QqNysAAi/ArcGIS/rest/services/projectMapper/FeatureServer/0?token=50KnCorhsD5LzoIyiygHBuyTga3ov1835mNFDwvcX2gzoLKYhJE-baCf5uHQtnrRPWnLAPIVOJWIiGwa9AMNuHU0ZvAlS9SaMzpad7AWSUsElgeVZ4rjlyDC3bMyggOZBQNqFvm4dmTODrU5QeHMUtCDdIYR7cTw4abmw_VArJDf1MCJs_OwmUCj-n2ineHQneEY0gcwIptDmdu_f_cIQQ.."),queryTask.execute(P),E("mainDiv"),infoTemplate=new esri.InfoTemplate("Site Selection","Unit: ${Unit}<br />Unit Type: ${Unit_Type}");e.mapPoint.getLatitude(),e.mapPoint.getLongitude();queryTask.execute(P,a)}}),$(document).on("click","#showHUCs",function(){event.preventDefault(),$("#getDataModal").modal("hide"),$("#huc-download-alert").slideDown(250),map.getLayer("huc8").setVisibility(!0),dojo.byId("innerAlert").innerHTML="<h4><b>Download Data</b></h4><p>Please review the Data Download (<a target='_blank' href='https://www.fws.gov/wetlands/Data/Data-Download.html'>www.fws.gov/wetlands/Data/Data-Download.html</a>) page for information on how to download data, what is included in the download and data use limitations and disclaimer.</p><br/><p><b>Click the map to select a watershed from which to extract wetland data.</b></p>"}),map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),search_api.create("geosearch",{on_result:function(e){require(["esri/geometry/Extent"],function(a){var i=["GNIS_MAJOR","GNIS_MINOR","ZIPCODE","AREACODE"],t=i.indexOf(e.result.properties.Source);$("#geosearchModal").modal("hide"),-1==t?map.setExtent(new esri.geometry.Extent({xmin:e.result.properties.LonMin,ymin:e.result.properties.LatMin,xmax:e.result.properties.LonMax,ymax:e.result.properties.LatMax,spatialReference:{wkid:4326}}),!0):require(["esri/geometry/Point"],function(a){map.centerAndZoom(new a(e.result.properties.Lon,e.result.properties.Lat),12)})})},include_usgs_sw:!0,include_usgs_gw:!0,include_usgs_sp:!0,include_usgs_at:!0,include_usgs_ot:!0,include_huc2:!0,include_huc4:!0,include_huc6:!0,include_huc8:!0,include_huc10:!0,include_huc12:!0,on_failure:function(e){$("#test").html("Sorry, a location could not be found in search for '"+e.val()+"'"),$("#invalidSearchLocationModal").modal("show")}}),$(document).ready(function(){}),$("#faq1header").click(function(){$("#faq1body").slideToggle(250)}),$("#faq2header").click(function(){$("#faq2body").slideToggle(250)}),$("#faq3header").click(function(){$("#faq3body").slideToggle(250)}),$("#faq4header").click(function(){$("#faq4body").slideToggle(250)}),$("#faq5header").click(function(){$("#faq5body").slideToggle(250)}),$("#faq6header").click(function(){$("#faq6body").slideToggle(250)}),$("#faq7header").click(function(){$("#faq7body").slideToggle(250)}),$("#faq8header").click(function(){$("#faq8body").slideToggle(250)}),$("#faq9header").click(function(){$("#faq9body").slideToggle(250)}),$("#faq10header").click(function(){$("#faq10body").slideToggle(250)}),$("#faq11header").click(function(){$("#faq11body").slideToggle(250)}),$("#faq12header").click(function(){$("#faq12body").slideToggle(250)}),$("#faq13header").click(function(){$("#faq13body").slideToggle(250)}),$("#faq14header").click(function(){$("#faq14body").slideToggle(250)}),$("#faq15header").click(function(){$("#faq15body").slideToggle(250)}),$("#faq16header").click(function(){$("#faq16body").slideToggle(250)}),$("#faq17header").click(function(){$("#faq17body").slideToggle(250)}),$("#faq18header").click(function(){$("#faq18body").slideToggle(250)}),$("#faq19header").click(function(){$("#faq19body").slideToggle(250)}),$("#faq20header").click(function(){$("#faq20body").slideToggle(250)}),$("#faq21header").click(function(){$("#faq21body").slideToggle(250)}),$("#faq22header").click(function(){$("#faq22body").slideToggle(250)}),$("#faq23header").click(function(){$("#faq23body").slideToggle(250)}),$("#faq24header").click(function(){$("#faq24body").slideToggle(250)}),$("#faq25header").click(function(){$("#faq25body").slideToggle(250)}),$("#faq26header").click(function(){$("#faq26body").slideToggle(250)}),$("#faq27header").click(function(){$("#faq27body").slideToggle(250)}),$("#faq28header").click(function(){$("#faq28body").slideToggle(250)}),$(".fullsize").click(function(){var e="<img src='"+$(this).attr("src")+"'/>",a=window.open("data:text/html,"+encodeURIComponent(e),"_blank");a.focus()}),$(document).ready(function(){function e(){$("#faqModal").modal("show")}function e(){$("#geosearchModal").modal("show")}function a(){$("#aboutModal").modal("show")}$("#faqNav").click(function(){$("#faqModal").modal("show")}),$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){a()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=maxLegendHeight-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight),$("#legendCollapse").on("shown.bs.collapse",function(){if(0==legendDiv.innerHTML.length){var e=new n({map:map,layerInfos:legendLayers},"legendDiv");e.startup(),$("#legendDiv").niceScroll()}}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")}),$("#measurementCollapse").on("shown.bs.collapse",function(){$("#measureLabel").show()}),$("#measurementCollapse").on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()})}),require(["esri/InfoTemplate","esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/FeatureLayer","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","esri/tasks/GeometryService","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,a,i,t,o,n,s,r,l,c,p,d,g,u,y,m,f,h,b,v,w){function L(a,i,t,o,n,s,r){if(map.addLayer(t),"aoi"==t.id&&w(t,"load",function(a){w(t,"click",function(a){aoiClicked=!0;var i=a.graphic.attributes.HYPERLINK_2;if("None"==i){var o=new e("${NAME}","Type: ${TYPE}<br/>Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>");t.setInfoTemplate(o)}else{var o=new e("${NAME}","Type: ${TYPE}<br/>Ramsar: <a id='ramsarLink' target='_blank' href='${HYPERLINK_2}'>click here</a><br/>Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>");t.setInfoTemplate(o)}})}),T.push([n,camelize(o),t]),n){if(!$("#"+camelize(n)).length){var l;if("Data Source"==n)var l=$('<div id="'+camelize(n+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+'<span id="info'+camelize(n)+'" title="Data Source identifies the scale, year and emulsion of the imagery that was used to map the wetlands and riparian areas for a given area. It also identifies areas that have Scalable data, which is an interim data product in areas of the nation where standard compliant wetland data is not yet available. Click for more info on Scalable data." class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(n)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button> </div>');else var l=$('<div id="'+camelize(n+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+"</button> </div>");l.click(function(e){l.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(T,function(e,a){var i=map.getLayer(a[2].id);if(a[0]==n)if($("#"+a[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&l.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",a[1]),map.addLayer(a[2]);var i=map.getLayer(a[2].id);i.setVisibility(!0)}else if(l.find("i.glyphspan").hasClass("fa-square-o")){console.log("removing layer: ",a[1]);var i=map.getLayer(a[2].id);i.setVisibility(!1)}})});var c=$('<div id="'+camelize(n)+'" class="btn-group-vertical" data-toggle="buttons"></div>');$("#toggle").append(c)}if(t.visible)var p=$('<div id="'+camelize(o)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(n)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(n)+'"></i>&nbsp;&nbsp;'+o+"</label> </div>");else var p=$('<div id="'+camelize(o)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(n)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(n)+'"></i>&nbsp;&nbsp;'+o+"</label> </div>");$("#"+camelize(n)).append(p),p.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var a=$(this)[0].id;$.each(T,function(e,i){if(i[0]==n)if(i[1]==a&&$("#"+camelize(n+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",i[1]),map.addLayer(i[2]);var t=map.getLayer(i[2].id);t.setVisibility(!0)}else if(i[1]==a&&$("#"+camelize(n+" Root")).find("i.glyphspan").hasClass("fa-square-o"))console.log("group heading not checked");else{console.log("removing layer: ",i[1]);var t=map.getLayer(i[2].id);t.setVisibility(!1),$("#"+i[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+i[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o")}})}})}else if(r.includeInLayerList){if(t.visible&&r.hasOpacitySlider)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+'<span id="opacity'+camelize(o)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');else if(!t.visible&&r.hasOpacitySlider)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(o)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');else if(t.visible&&void 0!==r.hasOpacitySlider&&1==r.hasOpacitySlider)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(t.visible||void 0===r.hasOpacitySlider||1!=r.hasOpacitySlider)if(t.visible)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(o)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(t.visible)if(t.visible)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+"</button></span></div>");else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+o+"</button> </div>");else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(o)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');p.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),t.visible?t.setVisibility(!1):t.setVisibility(!0),r.otherLayersToggled&&$.each(r.otherLayersToggled,function(e,a){var i=map.getLayer(a);i.setVisibility(t.visible)})})}if(void 0!==i){var d=camelize(a);if(!$("#"+d).length){if(i)var g=$('<div id="'+d+'"><div class="alert alert-info" role="alert"><strong>'+a+"</strong></div></div>");else var g=$('<div id="'+d+'"></div>');$("#toggle").append(g)}if(n){if($("#"+d).append(l),$("#"+d).append(c),void 0!==r.moreinfo&&r.moreinfo){var u="#info"+camelize(n),y=$(u);y.click(function(e){window.open(r.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}if($("#opacity"+camelize(n)).length>0){var u="#opacity"+camelize(n),m=$(u);m.click(function(e){e.preventDefault(),e.stopPropagation(),$(".opacitySlider").remove();var a=map.getLayer(s.id).opacity,i=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+a+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(i),$("#slider")[0].value=100*a,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var a=$("#slider")[0].value/100;console.log("o: "+a),$("#opacityValue").html("Opacity: "+a),map.getLayer(s.id).setOpacity(a),r.otherLayersToggled&&$.each(r.otherLayersToggled,function(e,i){var t=map.getLayer(i);t.setOpacity(a)})})})}}else{if($("#"+d).append(p),void 0!==r.moreinfo&&r.moreinfo){var u="#info"+camelize(o),y=$(u);y.click(function(e){window.open(r.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}$("#opacity"+camelize(o)).length>0&&$("#opacity"+camelize(o)).click(function(e){e.preventDefault(),e.stopPropagation(),$(".opacitySlider").remove();var a=map.getLayer(s.id).opacity,i=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+a+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(i),$("#slider")[0].value=100*a,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var a=$("#slider")[0].value/100;console.log("o: "+a),$("#opacityValue").html("Opacity: "+a),map.getLayer(s.id).setOpacity(a),r.otherLayersToggled&&$.each(r.otherLayersToggled,function(e,i){var t=map.getLayer(i);t.setOpacity(a)})})})}}else if($("#toggle").append(p),void 0!==r.moreinfo&&r.moreinfo){var u="#info"+camelize(o),y=$(u);y.click(function(e){alert(e.currentTarget.id),e.preventDefault(),e.stopPropagation()})}}var T=(new g("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),[]);$.each(allLayers,function(e,a){console.log("processing: ",a.groupHeading),$.each(a.layers,function(e,i){var t="";if(i.wimOptions.exclusiveGroupName&&(t=i.wimOptions.exclusiveGroupName),"agisFeature"===i.wimOptions.layerType){var o=new c(i.url,i.options);void 0!==i.wimOptions.renderer&&o.setRenderer(i.wimOptions.renderer),i.wimOptions&&1==i.wimOptions.includeLegend&&legendLayers.unshift({layer:o,title:e}),L(a.groupHeading,a.showGroupHeading,o,e,t,i.options,i.wimOptions)}else if("agisWMS"===i.wimOptions.layerType){var o=new p(i.url,{resourceInfo:i.options.resourceInfo,visibleLayers:i.options.visibleLayers},i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&legendLayers.unshift({layer:o,title:e}),L(a.groupHeading,a.showGroupHeading,o,e,t,i.options,i.wimOptions)}else if("agisDynamic"===i.wimOptions.layerType){var o=new r(i.url,i.options);if(i.visibleLayers&&o.setVisibleLayers(i.visibleLayers),i.wimOptions&&i.wimOptions.layerDefinitions){var n=[];$.each(i.wimOptions.layerDefinitions,function(e,a){n[e]=a}),o.setLayerDefinitions(n)}i.wimOptions&&1==i.wimOptions.includeLegend&&legendLayers.unshift({layer:o,title:e}),L(a.groupHeading,a.showGroupHeading,o,e,t,i.options,i.wimOptions)}else if("agisImage"===i.wimOptions.layerType){var o=new l(i.url,i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&legendLayers.unshift({layer:o,title:e}),i.visibleLayers&&o.setVisibleLayers(i.visibleLayers),L(a.groupHeading,a.showGroupHeading,o,e,t,i.options,i.wimOptions)}})})})}),$(".close-alert").click(function(){$(this).parent().slideUp(250)}),$(document).ready(function(){});