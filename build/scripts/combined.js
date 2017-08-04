function addCommas(e){e+="";for(var t=e.split("."),a=t[0],i=t.length>1?"."+t[1]:"",o=/(\d+)(\d{3})/;o.test(a);)a=a.replace(o,"$1,$2");return a+i}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,t){return 0===t?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}var allLayers,renderer;require(["esri/map","esri/InfoTemplate","esri/renderers/UniqueValueRenderer","esri/symbols/PictureMarkerSymbol","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/Color","dojo/domReady!"],function(e,t,a,i,o,n,s){var r=new o(o.STYLE_NULL,new n(n.STYLE_NULL,new s([85,255,0,1])),new s([85,255,0,.54])),l=new o(o.STYLE_NULL,new n(n.STYLE_NULL,new s([61,196,255]),2),new s([61,196,255,2])),c=new o(o.STYLE_NULL,new n(n.STYLE_NULL,new s([225,0,0]),2),new s([255,0,0,2])),d=new o(o.STYLE_NULL,new n(n.STYLE_NULL,new s([255,255,190,0])),new s([255,255,190,.54])),p=new o(o.STYLE_NULL,new n(n.STYLE_NULL,new s([38,115,0]),2),new s([38,115,0,.25])),u=new o(o.STYLE_NULL,new n(n.STYLE_NULL,new s([255,0,0,.25])),new s([255,0,0,.25])),m=new a(r,"Change_Type");m.addValue("Addition",l),m.addValue("Removal",c),m.addValue("No Change",d),m.addValue("Reclassification to System Unit",u),m.addValue("Reclassification to OPA",p);var r=new o(o.STYLE_NULL,new n(n.STYLE_NULL,new s([85,255,0,1])),new s([85,255,0,.54])),g=new o(o.STYLE_SOLID,new n(n.STYLE_SOLID,new s([255,0,0,.25])),new s([255,0,0,.25])),y=new o(o.STYLE_SOLID,new n(n.STYLE_SOLID,new s([190,225,232,1])),new s([255,0,0,.25])),h=new a(r,"Unit_Type");h.addValue("System Unit",g),h.addValue("Otherwise Protected Area",y)});var map,allLayers,maxLegendHeight,maxLegendDivHeight,printCount=0,legendLayers=[],measurement,queryTask,query,polyClicked=!1;require(["esri/map","esri/arcgis/utils","esri/config","esri/dijit/Geocoder","esri/dijit/HomeButton","esri/dijit/Legend","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Extent","esri/geometry/Multipoint","esri/geometry/Point","esri/geometry/Polygon","esri/layers/ArcGISTiledMapServiceLayer","esri/layers/FeatureLayer","esri/dijit/LayerSwipe","esri/renderers/UniqueValueRenderer","esri/SpatialReference","esri/symbols/PictureMarkerSymbol","esri/tasks/GeometryService","esri/tasks/IdentifyParameters","esri/tasks/IdentifyTask","esri/InfoTemplate","esri/tasks/query","esri/tasks/QueryTask","esri/tasks/LegendLayer","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/geometry/webMercatorUtils","esri/urlUtils","dojo/_base/array","dojo/dom","dojo/dom-class","dojo/dnd/Moveable","dojo/query","dojo/on","dojo/domReady!"],function(e,t,a,i,o,n,s,r,l,c,d,p,u,m,g,y,h,f,b,v,L,w,k,T,S,_,x,q,U,C,M,O,I,P,R,E,D,N){function H(){$("#printModal").modal("show")}function j(){$("#getDataModal").modal("show")}function z(e,t,a){var i=new Date;i.setTime(i.getTime()+24*a*60*60*1e3);var o="expires="+i.toUTCString();document.cookie=e+"="+t+";"+o+";path=/"}function Y(){var e="You have returned!";z("CBRScookie",e,365)}function B(){function e(e){printCount++;var t=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+l+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(t),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function t(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem")}var a=new U;a.map=map;var i=new C;i.exportOptions={width:500,height:400,dpi:300},i.format="PDF",i.layout="Letter ANSI A Landscape Test",i.preserveScale=!1;var o=new x;o.layerId="existingPoly";var n=new x;n.layerId="revisedPoly";var s=new x;s.layerId="changePoly";var r=$("#printTitle").val();""==r?i.layoutOptions={titleText:"Wetlands",authorText:"Coastal Barrier Resources System (CBRS)",copyrightText:"This page was produced by the CBRS Projects Map",legendLayers:[o,n,s]}:i.layoutOptions={titleText:r,authorText:"Coastal Barrier Resources System (CBRS)",copyrightText:"This page was produced by the CBRS Projects Map",legendLayers:[o,n,s]};var l=i.layoutOptions.titleText;a.template=i;var c=new q("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");c.execute(a,e,t),$.get("https://fwsmapper.wim.usgs.gov/pdfLoggingService/pdfLog.asmx/Log?printInfo="+map.getScale()+","+map.extent.xmin+","+map.extent.ymax+","+map.extent.xmax+","+map.extent.ymin+",NWIV2",function(e){})}function G(e,t){var a;document.getElementById&&(a=document.getElementById(e))&&a.style&&(a.style.cursor=t)}a.defaults.io.corsEnabledServers.push("fwsmapper.wim.usgs.gov"),esri.config.defaults.io.proxyUrl="https://fwsmapper.wim.usgs.gov/serviceProxy/proxy.ashx",a.defaults.geometryService=new L("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),map=new e("mapDiv",{basemap:"gray",extent:new d(-8514e3,4741e3,-8045e3,4912e3,new b({wkid:3857}))});var F=new o({map:map,extent:new d(-8514e3,4741e3,-8045e3,4912e3,new b({wkid:3857}))},"homeButton");F.startup();var A=new s({map:map,scale:4514},"locateButton");A.startup(),measurement=new r({map:map,advancedLocationUnits:!0},P.byId("measurementDiv")),measurement.startup(),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#printNavButton").click(function(){H()}),$("#printExecuteButton").click(function(e){e.preventDefault(),$(this).button("loading"),B()}),$("#getDataButton").click(function(){j()}),N(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var t=M.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3)),document.cookie.includes("CBRScookie")?($("#mobileModal").modal("hide"),$("#welcomeModal").modal("hide")):($("#mobileModal").modal("show"),$("#welcomeModal").modal("show"),Y())}),N(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),N(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var t=M.webMercatorToGeographic(e.mapPoint);$("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3))}}),N(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=M.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var V=new g("https://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer"),W=new g("https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer"),Q=new g("https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer");N(P.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(W),map.removeLayer(V),map.removeLayer(Q)}),N(P.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(W),map.removeLayer(V),map.removeLayer(Q)}),N(P.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(W),map.removeLayer(V),map.removeLayer(Q)}),N(P.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(W),map.removeLayer(V),map.removeLayer(Q)}),N(P.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(W),map.removeLayer(V),map.removeLayer(Q)}),N(P.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(W),map.removeLayer(V),map.removeLayer(Q)}),N(P.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(W),map.removeLayer(V),map.removeLayer(Q)}),N(P.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(W),map.removeLayer(V),map.removeLayer(Q)}),N(P.byId("btnNatlMap"),"click",function(){map.addLayer(W,1),map.removeLayer(V),map.removeLayer(Q),map.removeLayer(Q)}),N(P.byId("btnUsgsImgTopo"),"click",function(){map.addLayer(Q,1),map.removeLayer(W),map.removeLayer(V)}),N(P.byId("btnUsgsTopo"),"click",function(){map.addLayer(V,1),map.removeLayer(W),map.removeLayer(Q)}),$("#selectionDiv").lobiPanel({unpin:!1,reload:!1,minimize:!1,close:!1,expand:!1,editTitle:!1,maxWidth:800,maxHeight:550}),$("#selectionDiv .dropdown").prepend("<div id='selectionClose' tite='close'><b>X</b></div>"),$("#selectionMin").click(function(){$("#selectionDiv").css("visibility","hidden")}),$("#selectionClose").click(function(){$("#selectionDiv").css("visibility","hidden"),map.graphics.clear()}),$(document).ready(function(){$("#hidemobileModal").click(function(){$("#mobileModal").modal("hide")}),$("#hideotherModals").click(function(){$("#mobileModal").modal("hide"),$("#welcomeModal").modal("hide"),$("#firstModal").modal("hide"),$("#secondModal").modal("hide"),$("#thirdModal").modal("hide")}),$("#showWelcomeModal").click(function(){$("#welcomeModal").modal("show")}),$("#firstStep").click(function(){$("#firstModal").modal("show"),$("#mobileModal").modal("hide")}),$("#showHelp").click(function(){$("#welcomeModal").modal("show"),$("#mobileModal").modal("show")}),$("#secondStep").click(function(){$("#secondModal").modal("show")}),$("#thirdStep").click(function(){$("#thirdModal").modal("show")})}),$("#showLayerWalk").click(function(){setTimeout(function(){var e=0;console.log("checking for backdrops"),$(".modal-backdrop").each(function(){e++,2==e&&($(this).addClass("mobile-modal-backdrop"),console.log("Found mobile backdrop")),1==e&&($(this).addClass("desktop-modal-backdrop"),console.log("Found desktop backdrop"))}),$("<style>").prop("type","text/css").html("                        @media(max-width:768px){                            .desktop-modal-backdrop {                                display: none !important                            }                        }                        @media(min-width:768px){                            .mobile-modal-backdrop {                                display: none !important                            }                        }").appendTo("head")},100)}),$("#showHelp").click(function(){setTimeout(function(){var e=0;console.log("checking for backdrops"),$(".modal-backdrop").each(function(){e++,2==e&&($(this).addClass("mobile-modal-backdrop"),console.log("Found mobile backdrop")),1==e&&($(this).addClass("desktop-modal-backdrop"),console.log("Found desktop backdrop"))}),$("<style>").prop("type","text/css").html("                        @media(max-width:768px){                            .desktop-modal-backdrop {                                display: none !important                            }                        }                        @media(min-width:768px){                            .mobile-modal-backdrop {                                display: none !important                            }                        }").appendTo("head")},50)}),$(document).ready(function(){setTimeout(function(){var e=0;console.log("checking for backdrops"),$(".modal-backdrop").each(function(){e++,1==e&&($(this).addClass("mobile-modal-backdrop"),console.log("Found mobile backdrop")),2==e&&($(this).addClass("desktop-modal-backdrop"),console.log("Found desktop backdrop"))}),$("<style>").prop("type","text/css").html("                        @media(max-width:768px){                            .desktop-modal-backdrop {                                display: none !important                            }                        }                        @media(min-width:768px){                            .mobile-modal-backdrop {                                display: none !important                            }                        }").appendTo("head")},200)}),N(map,"click",function(e){function t(e){if(map.graphics.clear(),e.features.length>0){var t,a=e.features[0];t=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,0,225]),2),new dojo.Color([98,194,204,0])),a.geometry.spatialReference=map.spatialReference;var i=a;i.setSymbol(t),map.graphics.add(i),$("#unitNum").text(a.attributes.Unit),$("#unitNumOne").text(a.attributes.Unit_1),$("#projName").text(a.attributes.Project_name),$("#unitType").text(a.attributes.Unit_Type),$("#unitTypeOne").text(a.attributes.Unit_Type_1),$("#status").text(a.attributes.Status),$("#docketURL").html(a.attributes.Docket_URL),$("#prStart").html(a.attributes.PR_start_date),$("#prEnd").html(a.attributes.PR_end_date),null!=a.attributes.Transmittal_Date&&$("#transmittalURL").html("Final Recommended—The final recommended boundaries for this project were transmitted to Congress on "+a.attributes.Transmittal_Date+".  These boundaries will become effective only if adopted by Congress through legislation."),a.attributes.Unit==a.attributes.Unit_1&&$("#reclassification").html("You have clicked within an area that is proposed to remain within the CBRS as "+a.attributes.Unit_Type_1+" "+a.attributes.Unit_1+"."),""==a.attributes.Unit&&""!=a.attributes.Unit_1&&$("#reclassification").html("You have clicked within an area that is proposed for addition to "+a.attributes.Unit_Type_1+" "+a.attributes.Unit_1+"."),""!=a.attributes.Unit&&""==a.attributes.Unit_1&&$("#reclassification").html("You have clicked within an area that is "+a.attributes.Status+" for removal from "+a.attributes.Unit_Type+", "+a.attributes.Unit+"."),a.attributes.Unit!=a.attributes.Unit_1&&""!=a.attributes.Unit&&""!=a.attributes.Unit_1&&a.attributes.Unit_Type!=a.attributes.Unit_Type_1&&$("#reclassification").html("You have clicked within an area that is "+a.attributes.Status+" for reclassification from "+a.attributes.Unit_Type+" "+a.attributes.Unit+" to "+a.attributes.Unit_Type_1+" "+a.attributes.Unit_1+"."),a.attributes.Unit!=a.attributes.Unit_1&&""!=a.attributes.Unit&&""!=a.attributes.Unit_1&&a.attributes.Unit_Type==a.attributes.Unit_Type_1&&$("#reclassification").html("You have clicked within an area that is "+a.attributes.Status+" for reclassification from"+a.attributes.Unit_Type+" "+a.attributes.Unit+" to "+a.attributes.Unit_Type_1+" "+a.attributes.Unit_1+"."),$("#unitName").text(a.attributes.Name),$("#changeTyp").text(a.attributes.Change_Type),$("#siteUnit").text(a.attributes.Unit),$("#summaryUrl").html('<a href="'+a.attributes.Summary_URL)+$("#summaryUrl").text(a.attributes.Summary_URL)}$("#selectionDiv").css("visibility","visible");var o=$("#selectionDiv").data("lobiPanel"),n=$(document).height(),s=$(document).width(),r=.5*s-.5*$("#selectionDiv").width(),l=.8*n-1*$("#selectionDiv").height();o.setPosition(r,l),1==o.isPinned()&&o.unpin()}function t(e){if(e.features.length>0){var t,a=e.features[0];t=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,0,225]),2),new dojo.Color([98,194,204,0])),a.geometry.spatialReference=map.spatialReference;var i=a;i.setSymbol(t),map.graphics.add(i),$("#unitOther").text(a.attributes.Unit)}$("#existingCBRS").modal("show")}if(1==polyClicked)return void(polyClicked=!1);if(null==measurement.activeTool)if(map.graphics.clear(),void 0!=e.graphic&&1==e.graphic._graphicsLayer.layerId)console.log("other layers");else if(void 0!=e.graphic&&0==e.graphic._graphicsLayer.layerId||void 0!=e.graphic&&2==e.graphic._graphicsLayer.layerId){D=new S,D.returnGeometry=!0,D.geometry=e.mapPoint,D.outFields=["Unit","Name","Unit_Type","Change_Type","Summary_URL","Project_name","Status","Docket_URL","Unit_1","Unit_Type_1","PR_start_date","PR_end_date","Transmittal_Date"],queryTask=new _("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer/2"),queryTask.execute(D),G("mainDiv");e.mapPoint.getLatitude(),e.mapPoint.getLongitude();queryTask.execute(D,t)}else if(void 0===e.graphic)$("#outsideCBRS").modal("show");else if(3==e.graphic._graphicsLayer.layerId){queryTwo=new S,queryTwo.returnGeometry=!0,queryTwo.geometry=e.mapPoint,queryTwo.outFields=["Unit"],queryTask=new _("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer/3"),queryTask.execute(queryTwo),G("mainDiv");e.mapPoint.getLatitude(),e.mapPoint.getLongitude();queryTask.execute(queryTwo,t)}}),$("#clearSelection").click(function(){map.graphics.clear()}),N(map,"load",function(){$("#disclaimerModal").modal("show");var e=new y("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/ArcGIS/rest/services/MyMapService/FeatureServer/3"),t=new y("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer/0"),a=new y("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer/1"),i=new y("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Project_Mapper_data/FeatureServer/2");map.addLayer(a),map.addLayer(t),map.addLayer(i),map.addLayer(e),$("#swipeDiv").on(function(){0==map.graphicsLayerIds&&map.removeLayer(t)});var o=new h({type:"vertical",left:700,map:map,layers:[t]},"swipeDiv");o.startup(),o.on("swipe",function(){console.log(document.getElementsByClassName("vertical")[0].style.top),document.getElementsByClassName("vertical")[0].style.top="0"})}),map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),search_api.create("geosearch",{on_result:function(e){require(["esri/geometry/Extent"],function(t){var a=["GNIS_MAJOR","GNIS_MINOR","ZIPCODE","AREACODE"],i=a.indexOf(e.result.properties.Source);$("#geosearchModal").modal("hide"),-1==i?map.setExtent(new esri.geometry.Extent({xmin:e.result.properties.LonMin,ymin:e.result.properties.LatMin,xmax:e.result.properties.LonMax,ymax:e.result.properties.LatMax,spatialReference:{wkid:4326}}),!0):require(["esri/geometry/Point"],function(t){map.centerAndZoom(new t(e.result.properties.Lon,e.result.properties.Lat),12)})})},include_usgs_sw:!0,include_usgs_gw:!0,include_usgs_sp:!0,include_usgs_at:!0,include_usgs_ot:!0,include_huc2:!0,include_huc4:!0,include_huc6:!0,include_huc8:!0,include_huc10:!0,include_huc12:!0,on_failure:function(e){$("#test").html("Sorry, a location could not be found in search for '"+e.val()+"'"),$("#invalidSearchLocationModal").modal("show")}}),$(document).ready(function(){}),$("#faq1header").click(function(){$("#faq1body").slideToggle(250)}),$("#faq2header").click(function(){$("#faq2body").slideToggle(250)}),$("#faq3header").click(function(){$("#faq3body").slideToggle(250)}),$("#faq4header").click(function(){$("#faq4body").slideToggle(250)}),$("#faq5header").click(function(){$("#faq5body").slideToggle(250)}),$("#faq6header").click(function(){$("#faq6body").slideToggle(250)}),$("#faq7header").click(function(){$("#faq7body").slideToggle(250)}),$("#faq8header").click(function(){$("#faq8body").slideToggle(250)}),$("#faq9header").click(function(){$("#faq9body").slideToggle(250)}),$("#faq10header").click(function(){$("#faq10body").slideToggle(250)}),$("#faq11header").click(function(){$("#faq11body").slideToggle(250)}),$("#faq12header").click(function(){$("#faq12body").slideToggle(250)}),$("#faq13header").click(function(){$("#faq13body").slideToggle(250)}),$("#faq14header").click(function(){$("#faq14body").slideToggle(250)}),$("#faq15header").click(function(){$("#faq15body").slideToggle(250)}),$("#faq16header").click(function(){$("#faq16body").slideToggle(250)}),$("#faq17header").click(function(){$("#faq17body").slideToggle(250)}),$("#faq18header").click(function(){$("#faq18body").slideToggle(250)}),$("#faq19header").click(function(){$("#faq19body").slideToggle(250)}),$("#faq20header").click(function(){$("#faq20body").slideToggle(250)}),$("#faq21header").click(function(){$("#faq21body").slideToggle(250)}),$("#faq22header").click(function(){$("#faq22body").slideToggle(250)}),$("#faq23header").click(function(){$("#faq23body").slideToggle(250)}),$("#faq24header").click(function(){$("#faq24body").slideToggle(250)}),$("#faq25header").click(function(){$("#faq25body").slideToggle(250)}),$("#faq26header").click(function(){$("#faq26body").slideToggle(250)}),$("#faq27header").click(function(){$("#faq27body").slideToggle(250)}),$("#faq28header").click(function(){$("#faq28body").slideToggle(250)}),$(".fullsize").click(function(){var e="<img src='"+$(this).attr("src")+"'/>",t=window.open("data:text/html,"+encodeURIComponent(e),"_blank");t.focus()}),$(document).ready(function(){function e(){$("#selectionDiv").modal("hide"),$("#outsideCBRS").modal("hide")}function t(){$("#faqModal").modal("show")}function t(){$("#geosearchModal").modal("show")}function a(){$("#aboutModal").modal("show")}$("#siteModal").load(function(){e(),alert("worked")}),$("#faqNav").click(function(){$("#faqModal").modal("show")}),$("#geosearchNav").click(function(){t()}),$("#aboutNav").click(function(){a()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),$("#legendElement").click(function(){setTimeout(function(){var e=0;console.log("checking for esri table class"),$("table.esriLegendLayer").each(function(){e++,1==e&&console.log("found esri labels"),2==e&&($(this).addClass("esriLegendOther"),console.log("Found the Other class"))}),$("<style>").prop("type","text/css").html("                            {                            .esriLegendOther {                                display: none !important                            }                        }                        ").appendTo("head")},370)}),$("#layersPanel").click(function(){setTimeout(function(){var e=0;console.log("checking for esri table class"),$("table.esriLegendLayer").each(function(){e++,1==e&&console.log("found esri labels"),2==e&&($(this).addClass("esriLegendOther"),console.log("Found the Other class"))}),$("<style>").prop("type","text/css").html("                            {                            .esriLegendOther {                                display: none !important                            }                        }                        ").appendTo("head")})}),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=maxLegendHeight-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight),$("#legendCollapse").on("shown.bs.collapse",function(){if(0==legendDiv.innerHTML.length){var e=new n({map:map,layerInfos:legendLayers},"legendDiv");e.startup(),$("#legendDiv").niceScroll()}}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")}),$("#measurementCollapse").on("shown.bs.collapse",function(){$("#measureLabel").show()}),$("#measurementCollapse").on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()})}),require(["esri/InfoTemplate","esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/FeatureLayer","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","esri/tasks/GeometryService","esri/dijit/LayerSwipe","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,t,a,i,o,n,s,r,l,c,d,p,u,m,g,y,h,f,b,v,L,w){function k(t,a,i,o,n,s,r){if(map.addLayer(i),"aoi"==i.id&&w(i,"load",function(t){w(i,"click",function(t){aoiClicked=!0;var a=t.graphic.attributes.HYPERLINK_2;if("None"==a){var o=new e("${NAME}","Type: ${TYPE}<br/>Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>");i.setInfoTemplate(o)}else{var o=new e("${NAME}","Type: ${TYPE}<br/>Ramsar: <a id='ramsarLink' target='_blank' href='${HYPERLINK_2}'>click here</a><br/>Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>");i.setInfoTemplate(o)}})}),T.push([n,camelize(o),i]),n){if(!$("#"+camelize(n)).length){var l;if("Data Source"==n)var l=$('<div id="'+camelize(n+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+'<span id="info'+camelize(n)+'" title="Data Source identifies the scale, year and emulsion of the imagery that was used to map the wetlands and riparian areas for a given area. It also identifies areas that have Scalable data, which is an interim data product in areas of the nation where standard compliant wetland data is not yet available. Click for more info on Scalable data." class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(n)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button> </div>');else var l=$('<div id="'+camelize(n+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+"</button> </div>");l.click(function(e){l.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(T,function(e,t){var a=map.getLayer(t[2].id);if(t[0]==n)if($("#"+t[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&l.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",t[1]),map.addLayer(t[2]);var a=map.getLayer(t[2].id);a.setVisibility(!0)}else if(l.find("i.glyphspan").hasClass("fa-square-o")){console.log("removing layer: ",t[1]);var a=map.getLayer(t[2].id);a.setVisibility(!1)}})});var c=$('<div id="'+camelize(n)+'" class="btn-group-vertical" data-toggle="buttons"></div>');$("#toggle").append(c)}if(i.visible)var d=$('<div id="'+camelize(o)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(n)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(n)+'"></i>&nbsp;&nbsp;'+o+"</label> </div>");else var d=$('<div id="'+camelize(o)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(n)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(n)+'"></i>&nbsp;&nbsp;'+o+"</label> </div>");$("#"+camelize(n)).append(d),d.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var t=$(this)[0].id;$.each(T,function(e,a){if(a[0]==n)if(a[1]==t&&$("#"+camelize(n+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",a[1]),map.addLayer(a[2]);var i=map.getLayer(a[2].id);i.setVisibility(!0)}else if(a[1]==t&&$("#"+camelize(n+" Root")).find("i.glyphspan").hasClass("fa-square-o"))console.log("group heading not checked");else{console.log("removing layer: ",a[1]);var i=map.getLayer(a[2].id);i.setVisibility(!1),$("#"+a[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+a[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o")}})}})}else if(r.includeInLayerList){if(i.visible&&r.hasOpacitySlider)var d=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+'<span id="opacity'+camelize(o)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');else if(!i.visible&&r.hasOpacitySlider)var d=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(o)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');else if(i.visible&&void 0!==r.hasOpacitySlider&&1==r.hasOpacitySlider)var d=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(i.visible||void 0===r.hasOpacitySlider||1!=r.hasOpacitySlider)if(i.visible)var d=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(o)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(i.visible)if(i.visible)var d=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+"</button></span></div>");else var d=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+o+"</button> </div>");else var d=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else var d=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(o)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');d.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),i.visible?i.setVisibility(!1):i.setVisibility(!0),r.otherLayersToggled&&$.each(r.otherLayersToggled,function(e,t){var a=map.getLayer(t);a.setVisibility(i.visible)})})}if(void 0!==a){var p=camelize(t);if(!$("#"+p).length){if(a)var u=$('<div id="'+p+'"><div class="alert alert-info" role="alert"><strong>'+t+"</strong></div></div>");else var u=$('<div id="'+p+'"></div>');$("#toggle").append(u);
}if(n){if($("#"+p).append(l),$("#"+p).append(c),void 0!==r.moreinfo&&r.moreinfo){var m="#info"+camelize(n),g=$(m);g.click(function(e){window.open(r.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}if($("#opacity"+camelize(n)).length>0){var m="#opacity"+camelize(n),y=$(m);y.click(function(e){e.preventDefault(),e.stopPropagation(),$(".opacitySlider").remove();var t=map.getLayer(s.id).opacity,a=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+t+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(a),$("#slider")[0].value=100*t,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var t=$("#slider")[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(s.id).setOpacity(t),r.otherLayersToggled&&$.each(r.otherLayersToggled,function(e,a){var i=map.getLayer(a);i.setOpacity(t)})})})}}else{if($("#"+p).append(d),void 0!==r.moreinfo&&r.moreinfo){var m="#info"+camelize(o),g=$(m);g.click(function(e){window.open(r.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}$("#opacity"+camelize(o)).length>0&&$("#opacity"+camelize(o)).click(function(e){e.preventDefault(),e.stopPropagation(),$(".opacitySlider").remove();var t=map.getLayer(s.id).opacity,a=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+t+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(a),$("#slider")[0].value=100*t,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var t=$("#slider")[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(s.id).setOpacity(t),r.otherLayersToggled&&$.each(r.otherLayersToggled,function(e,a){var i=map.getLayer(a);i.setOpacity(t)})})})}}else if($("#toggle").append(d),void 0!==r.moreinfo&&r.moreinfo){var m="#info"+camelize(o),g=$(m);g.click(function(e){alert(e.currentTarget.id),e.preventDefault(),e.stopPropagation()})}}var T=(new u("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),[]);$.each(allLayers,function(e,t){console.log("processing: ",t.groupHeading),$.each(t.layers,function(e,a){var i="";if(a.wimOptions.exclusiveGroupName&&(i=a.wimOptions.exclusiveGroupName),"agisFeature"===a.wimOptions.layerType){var o=new c(a.url,a.options);void 0!==a.wimOptions.renderer&&o.setRenderer(a.wimOptions.renderer),a.wimOptions&&1==a.wimOptions.includeLegend&&legendLayers.unshift({layer:o,title:e}),k(t.groupHeading,t.showGroupHeading,o,e,i,a.options,a.wimOptions)}else if("agisWMS"===a.wimOptions.layerType){var o=new d(a.url,{resourceInfo:a.options.resourceInfo,visibleLayers:a.options.visibleLayers},a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&legendLayers.unshift({layer:o,title:e}),k(t.groupHeading,t.showGroupHeading,o,e,i,a.options,a.wimOptions)}else if("agisDynamic"===a.wimOptions.layerType){var o=new r(a.url,a.options);if(a.visibleLayers&&o.setVisibleLayers(a.visibleLayers),a.wimOptions&&a.wimOptions.layerDefinitions){var n=[];$.each(a.wimOptions.layerDefinitions,function(e,t){n[e]=t}),o.setLayerDefinitions(n)}a.wimOptions&&1==a.wimOptions.includeLegend&&legendLayers.unshift({layer:o,title:e}),k(t.groupHeading,t.showGroupHeading,o,e,i,a.options,a.wimOptions)}else if("agisImage"===a.wimOptions.layerType){var o=new l(a.url,a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&legendLayers.unshift({layer:o,title:e}),a.visibleLayers&&o.setVisibleLayers(a.visibleLayers),k(t.groupHeading,t.showGroupHeading,o,e,i,a.options,a.wimOptions)}})})})}),$(".close-alert").click(function(){$(this).parent().slideUp(250)}),$("#legendElement").click(function(){setTimeout(function(){var e=0;console.log("checking for esri table class"),$("table.esriLegendLayer").each(function(){e++,1==e&&console.log("found esri labels"),2==e&&($(this).addClass("esriLegendOther"),console.log("Found the Other class"))}),$("<style>").prop("type","text/css").html("                            {                            .esriLegendOther {                                display: none !important                            }                        }                        ").appendTo("head")},500)});