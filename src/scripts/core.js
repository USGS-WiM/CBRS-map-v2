//for jshint
//'use strict';
// Generated on 2015-04-13 using generator-wim 0.0.1

/**
 * Created by bdraper on 4/3/2015.
 */

var map;
var allLayers;
var maxLegendHeight;
var maxLegendDivHeight;
var printCount = 0;
var legendLayers = [];
var measurement;

var queryTask, query;

var polyClicked = false;

require([
    'esri/map',
    'esri/arcgis/utils',
    'esri/config',
    'esri/dijit/Geocoder',
    'esri/dijit/HomeButton',
    'esri/dijit/Legend',
    'esri/dijit/LocateButton',
    'esri/dijit/Measurement',
    'esri/dijit/PopupTemplate',
    'esri/dijit/Search',
    'esri/graphic',
    'esri/graphicsUtils',
    'esri/geometry/Extent',
    'esri/geometry/Multipoint',
    'esri/geometry/Point',
    'esri/geometry/Polygon',
    'esri/layers/ArcGISTiledMapServiceLayer',
    'esri/layers/FeatureLayer',
    'esri/dijit/LayerSwipe',
    'esri/renderers/UniqueValueRenderer',
    'esri/SpatialReference',
    'esri/symbols/PictureMarkerSymbol',
    'esri/tasks/GeometryService',
    'esri/tasks/FindTask',
    'esri/tasks/FindParameters',
    'esri/tasks/FindResult',
    'esri/tasks/IdentifyParameters',
    'esri/tasks/IdentifyTask',
    'esri/InfoTemplate',
    'esri/tasks/query',
    'esri/tasks/QueryTask',
    'esri/tasks/LegendLayer',
    'esri/tasks/PrintTask',
    'esri/tasks/PrintParameters',
    'esri/tasks/PrintTemplate',
    'esri/geometry/webMercatorUtils',
    'esri/urlUtils',
    'dojo/_base/array',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/dnd/Moveable',
    'dojo/query',
    'dojo/on',
    'dojo/domReady!'
], function (
    Map,
    arcgisUtils,
    esriConfig,
    Geocoder,
    HomeButton,
    Legend,
    LocateButton,
    Measurement,
    PopupTemplate,
    Search,
    Graphic,
    graphicsUtils,
    Extent,
    Multipoint,
    Point,
    Polygon,
    ArcGISTiledMapServiceLayer,
    FeatureLayer,
    LayerSwipe,
    UniqueValueRenderer,
    SpatialReference,
    PictureMarkerSymbol,
    GeometryService,
    FindTask,
    FindParameters,
    FindResult,
    IdentifyParameters,
    IdentifyTask,
    InfoTemplate,
    Query,
    QueryTask,
    LegendLayer,
    PrintTask,
    PrintParameters,
    PrintTemplate,
    webMercatorUtils,
    urlUtils,
    array,
    dom,
    domClass,
    Moveable,
    query,
    on
) {

        //bring this line back after experiment////////////////////////////
        //allLayers = mapLayers;

        esriConfig.defaults.io.corsEnabledServers.push("fwsprimary.wim.usgs.gov");
        esri.config.defaults.io.proxyUrl = "https://fwsprimary.wim.usgs.gov/serviceProxy/proxy.ashx";

        esriConfig.defaults.geometryService = new GeometryService("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer");

        /*urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/SecurePrinting/"
                            });
        
        urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/Wetlands"
                            });
    
        urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/Wetlands_Raster"
                            });
    
        urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/Wetlands_Status"
                            });
    
        urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/Riparian"
                            });
    
        urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/Data_Source"
                            });
    
        urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/Historic_Wetlands"
                            });*/

        map = new Map('mapDiv', {
            basemap: 'gray',
            extent: new Extent(-12567000, 2726000, -5053000, 5529000, new SpatialReference({ wkid: 3857 }))
        });

        var home = new HomeButton({
            map: map,
            extent: new Extent(-12567000, 2726000, -5053000, 5529000, new SpatialReference({ wkid: 3857 }))
        }, "homeButton");
        home.startup();

        var locate = new LocateButton({
            map: map,
            scale: 4514,
        }, "locateButton");
        locate.startup();

        measurement = new Measurement({
            map: map,
            advancedLocationUnits: true
        }, dom.byId("measurementDiv"));
        measurement.startup();

        var search = new Search({
            enableButtonMode: false, //this enables the search widget to display as a single button
            enableLabel: false,
            enableInfoWindow: false,
            showInfoWindowOnSelect: false,
            map: map,
            sources: []
        }, "search");

        var sources = search.get("sources");

        sources.push({
            featureLayer: new FeatureLayer("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer/1"),
            searchFields: ["Unit"],
            displayField: "Unit",
            exactMatch: false,
            outFields: ["Unit"],
            name: "Revised Units",
            placeholder: "e.g NJ-07",
            highlightSymbol: new PictureMarkerSymbol("https://js.arcgis.com/3.21/esri/dijit/Search/images/search-pointer.png", 40, 40).setOffset(9, 18),
            maxResults: 6,
            maxSuggestions: 6,
        });

        sources.push({
            featureLayer: new FeatureLayer("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer/0"),
            searchFields: ["Unit"],
            displayField: "Unit",
            exactMatch: false,
            outFields: ["Unit"],
            name: "Existing Units",
            placeholder: "e.g NJ-07",
            highlightSymbol: new PictureMarkerSymbol("https://js.arcgis.com/3.21/esri/dijit/Search/images/search-pointer.png", 40, 40).setOffset(9, 18),
            maxResults: 6,
            maxSuggestions: 6,
        });

        search.set("sources", sources);

        $('#cbrsNav').click(function () {
            search.startup();
        });

        $(document).ready(function () {

            /* $('#search').keypress(function(){
                if ( event.which == 13 ) {
                    $("#btnunitDismiss").trigger("click");
                }
            }); */

            on(search, 'select-result', function (e) {
                $("#btnunitDismiss").trigger("click");
            });

            /* $('#').click(function(){
                $("#btnunitDismiss").trigger("click");
            }); */

        });






        //var utmCoords = $('<tr class="esriMeasurementTableRow" id="utmCoords"><td><span>UTM17</span></td><td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">UTM X</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">UTM Y</span></td></tr>');
        //$('.esriMeasurementResultTable').append(utmCoords);

        //following block forces map size to override problems with default behavior
        $(window).resize(function () {
            if ($("#legendCollapse").hasClass('in')) {
                maxLegendHeight = ($('#mapDiv').height()) * 0.90;
                $('#legendElement').css('height', maxLegendHeight);
                $('#legendElement').css('max-height', maxLegendHeight);
                maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px', ''));
                $('#legendDiv').css('max-height', maxLegendDivHeight);
            }
            else {
                $('#legendElement').css('height', 'initial');
            }
        });

        function showPrintModal() {
            $('#printModal').modal('show');
        }

        $('#printNavButton').click(function () {
            showPrintModal();
        });

        $('#printExecuteButton').click(function (e) {
            e.preventDefault();
            $(this).button('loading');
            printMap();
        });

        $('#getDataButton').click(function () {
            showGetDataModal();
        });

        /* function showGetDataModal() {
            $('#getDataModal').modal('show');
        } */

        /*aoiSymbol = new PictureMarkerSymbol("../images/grn-pushpin.png", 45, 45);
    
        renderer.addValue({
            symbol: aoiSymbol
        });*/



        //displays map scale on map load
        on(map, "load", function () {
            var scale = map.getScale().toFixed(0);
            $('#scale')[0].innerHTML = addCommas(scale);
            var initMapCenter = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
            $('#latitude').html(initMapCenter.y.toFixed(3));
            $('#longitude').html(initMapCenter.x.toFixed(3));


            /* if (document.cookie.includes("CBRScookie")){
                $('#mobileModal').modal('hide');
                $('#welcomeModal').modal('hide');
            } else {
                $('#disclaimerModal').modal('show');
                $('#mobileModal').modal('show');
                $('#welcomeModal').modal('show');
                checkCookie();
            } */
        });

        /*var featureLayerExist = new FeatureLayer("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Project_Mapper_data/FeatureServer/1?token=lS6bN793606uN_Bcn5h3C1SxZ3cSRF-FlgS6c4daB42BgvSgmJOiFC3A0wZqO05gnPXYN2oZYvKxac79HW28sCB0DjJdootDbIBDtRmOE7jBdIHNxbyxU0lEQ2M4xCVYeI89wOC2jthE4kH3gUpFBXg72TRbK0IMxe9kUuDNC15wo7YeaBEoxhBL-hek6u_dmrMPZPdy6kN8VXXFZ2XyW70-gf6yGSbidYzYpWxe6Tc.");
        var featureLayerRevise = new FeatureLayer("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/ArcGIS/rest/services/Project_Mapper_data/FeatureServer/0?token=lS6bN793606uN_Bcn5h3C1SxZ3cSRF-FlgS6c4daB42BgvSgmJOiFC3A0wZqO05gnPXYN2oZYvKxac79HW28sCB0DjJdootDbIBDtRmOE7jBdIHNxbyxU0lEQ2M4xCVYeI89wOC2jthE4kH3gUpFBXg72TRbK0IMxe9kUuDNC15wo7YeaBEoxhBL-hek6u_dmrMPZPdy6kN8VXXFZ2XyW70-gf6yGSbidYzYpWxe6Tc.");
        var layer = featureLayerExist;*/

        /*var layerSwipe = new LayerSwipe({
        type: "horizontal",
        top: 250,
        map: map,
        layers: [ layer ]
      }, "widget");
      layerSwipe.startup();*/

        /*     function setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires="+d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }
        
            function getCookie(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }
        
            function checkCookie() {
                var user = "You have returned!";
                setCookie("CBRScookie", user, 365);
            } */


        //displays map scale on scale change (i.e. zoom level)
        on(map, "zoom-end", function () {
            var scale = map.getScale().toFixed(0);
            $('#scale')[0].innerHTML = addCommas(scale);
        });

        //updates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes "map center" label
        on(map, "mouse-move", function (cursorPosition) {
            $('#mapCenterLabel').css("display", "none");
            if (cursorPosition.mapPoint != null) {
                var geographicMapPt = webMercatorUtils.webMercatorToGeographic(cursorPosition.mapPoint);
                $('#latitude').html(geographicMapPt.y.toFixed(3));
                $('#longitude').html(geographicMapPt.x.toFixed(3));
            }
        });
        //updates lat/lng indicator to map center after pan and shows "map center" label.
        on(map, "pan-end", function () {
            //displays latitude and longitude of map center
            $('#mapCenterLabel').css("display", "inline");
            var geographicMapCenter = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
            $('#latitude').html(geographicMapCenter.y.toFixed(3));
            $('#longitude').html(geographicMapCenter.x.toFixed(3));
        });
        var usgsTopo = new ArcGISTiledMapServiceLayer('https://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer');
        var nationalMapBasemap = new ArcGISTiledMapServiceLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer');
        var usgsImageryTopo = new ArcGISTiledMapServiceLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer');
        //on clicks to swap basemap. map.removeLayer is required for nat'l map b/c it is not technically a basemap, but a tiled layer.
        on(dom.byId('btnStreets'), 'click', function () {
            map.setBasemap('streets');
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
        });
        /*     on(dom.byId('btnSatellite'), 'click', function () {
                map.setBasemap('satellite');
                map.removeLayer(nationalMapBasemap);
                map.removeLayer(usgsTopo);
                map.removeLayer(usgsImageryTopo);
            }); */
        on(dom.byId('btnHybrid'), 'click', function () {
            map.setBasemap('hybrid');
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
        });
        /*     on(dom.byId('btnTerrain'), 'click', function () {
                map.setBasemap('terrain');
                map.removeLayer(nationalMapBasemap);
                map.removeLayer(usgsTopo);
                map.removeLayer(usgsImageryTopo);
            }); */
        on(dom.byId('btnGray'), 'click', function () {
            map.setBasemap('gray');
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
        });
        /*     on(dom.byId('btnNatGeo'), 'click', function () {
                map.setBasemap('national-geographic');
                map.removeLayer(nationalMapBasemap);
                map.removeLayer(usgsTopo);
                map.removeLayer(usgsImageryTopo);
            }); */
        /*     on(dom.byId('btnOSM'), 'click', function () {
                map.setBasemap('osm');
                map.removeLayer(nationalMapBasemap);
                map.removeLayer(usgsTopo);
                map.removeLayer(usgsImageryTopo);
            }); */
        /*     on(dom.byId('btnTopo'), 'click', function () {
                map.setBasemap('topo');
                map.removeLayer(nationalMapBasemap);
                map.removeLayer(usgsTopo);
                map.removeLayer(usgsImageryTopo);
            }); */

        /* on(dom.byId('btnNatlMap'), 'click', function () {
            map.addLayer(nationalMapBasemap, 1);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
            map.removeLayer(usgsImageryTopo);
        }); */

        on(dom.byId('btnUsgsImgTopo'), 'click', function () {
            map.addLayer(usgsImageryTopo, 1);
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
        });

        on(dom.byId('btnUsgsTopo'), 'click', function () {
            map.addLayer(usgsTopo, 1);
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsImageryTopo);
        })

        //start LobiPanel
        $("#siteInfoDiv").lobiPanel({
            unpin: false,
            reload: false,
            minimize: false,
            close: false,
            expand: false,
            editTitle: false,
            Width: 500,
            maxWidth: 520,
            maxHeight: 420,
            minWidth: 500,
            minHeight: 370,
        });

        $("#siteInfoDiv .dropdown").prepend("<div id='selectionClose' tite='close'><b>X</b></div>");
        //$("#siteInfoDiv .dropdown").prepend("<div id='selectionMin' title='collapse'><b>_</b></div>");

        /* $(document).ready(function(){
            $("#siteInfoDiv").load(function(){
                $("#siteInfoDiv").css("top","61%");
            });
        }); */

        $("#selectionMin").click(function () {
            $("#siteInfoDiv").css("visibility", "hidden");
            /*$("#selection-tools-alert").slideDown(250);*/
        });

        $("#selectionClose").click(function () {
            $("#siteInfoDiv").css("visibility", "hidden");
            map.graphics.clear();
        });
        //End LobiPanel

        $(document).ready(function () {
            function showModal() {
                $('#mobileModal').modal({ backdrop: 'static' });
                $('#mobileModal').modal('show');
            }
            $('#hidemobileModal').click(function () {
                $('#mobileModal').modal('hide');
            });

            $('#hideotherModals').click(function () {
                $('#mobileModal').modal('hide');
                $('#welcomeModal').modal('hide');
                $('#firstModal').modal('hide');
                $('#secondModal').modal('hide');
                $('#thirdModal').modal('hide');
            });

            function showWelcomeModal() {
                $('#welcomeModal').click('show');
            }
            $('#showWelcomeModal').click(function () {
                $('#welcomeModal').modal('show');
            });

            function showModal() {
                $('#firstModal').modal('show');
            }
            $('#firstStep').click(function () {
                $('#firstModal').modal('show');
                $('#mobileModal').modal('hide');
            });

            $('#showHelp').click(function () {
                $('#welcomeModal').modal('show');
                $('#mobileModal').modal('show');
                /*$("#swipeDiv").offset({ top: 0, left: 0 });*/
            });

            function showModal() {
                $('#secondModal').modal('show');
            }
            $('#secondStep').click(function () {
                $('#secondModal').modal('show');
            });

            function showModal() {
                $('#thirdModal').modal('show');
            }
            $('#thirdStep').click(function () {
                $('#thirdModal').modal('show');
            });
        });

        //getting rid of the extra modal for the layer walkthrough modal backdrop
        $("#showLayerWalk").click(function () {
            setTimeout(function () {
                var modalBackdrops = 0;
                console.log("checking for backdrops")
                $('.modal-backdrop').each(function () {
                    modalBackdrops++;
                    if (modalBackdrops == 2) {
                        $(this).addClass("mobile-modal-backdrop");
                        console.log("Found mobile backdrop")
                    }
                    if (modalBackdrops == 1) {
                        $(this).addClass("desktop-modal-backdrop");
                        console.log("Found desktop backdrop")
                    }
                });
                $("<style>")
                    .prop("type", "text/css")
                    .html("\
                        @media(max-width:768px){\
                            .desktop-modal-backdrop {\
                                display: none !important\
                            }\
                        }\
                        @media(min-width:768px){\
                            .mobile-modal-backdrop {\
                                display: none !important\
                            }\
                        }")
                    .appendTo("head");
            }, 100);
        });

        $("#showHelp").click(function () {
            setTimeout(function () {
                var modalBackdrops = 0;
                console.log("checking for backdrops")
                $('.modal-backdrop').each(function () {
                    modalBackdrops++;
                    if (modalBackdrops == 2) {
                        $(this).addClass("mobile-modal-backdrop");
                        console.log("Found mobile backdrop")
                    }
                    if (modalBackdrops == 1) {
                        $(this).addClass("desktop-modal-backdrop");
                        console.log("Found desktop backdrop")
                    }
                });
                $("<style>")
                    .prop("type", "text/css")
                    .html("\
                        @media(max-width:768px){\
                            .desktop-modal-backdrop {\
                                display: none !important\
                            }\
                        }\
                        @media(min-width:768px){\
                            .mobile-modal-backdrop {\
                                display: none !important\
                            }\
                        }")
                    .appendTo("head");
            }, 50);
        });

        //getting rid of the extra modal backdrop
        $(document).ready(function () {
            setTimeout(function () {
                var modalBackdrops = 0;
                console.log("checking for backdrops")
                $('.modal-backdrop').each(function () {
                    modalBackdrops++;
                    if (modalBackdrops == 1) {
                        $(this).addClass("mobile-modal-backdrop");
                        console.log("Found mobile backdrop")
                    }
                    if (modalBackdrops == 2) {
                        $(this).addClass("desktop-modal-backdrop");
                        console.log("Found desktop backdrop")
                    }
                });
                $("<style>")
                    .prop("type", "text/css")
                    .html("\
                        @media(max-width:768px){\
                            .desktop-modal-backdrop {\
                                display: none !important\
                            }\
                        }\
                        @media(min-width:768px){\
                            .mobile-modal-backdrop {\
                                display: none !important\
                            }\
                        }")
                    .appendTo("head");
            }, 200);
        });

        on(map, "load", function () {

            $('#disclaimerModal').modal('show');

            var otherProjectsLayer = new FeatureLayer("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/ArcGIS/rest/services/MyMapService/FeatureServer/2");
            var swipeLayerRevised = new FeatureLayer("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer/1");
            var underLayerExist = new FeatureLayer("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer/0");
            var changeLayer = new FeatureLayer("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer/3");


            map.addLayer(swipeLayerRevised);
            map.addLayer(underLayerExist);
            map.addLayer(changeLayer);
            map.addLayer(otherProjectsLayer);
            /*map.reorderLayer(swipeLayer,1);*/

            $("#swipeDiv").on(function () {
                if (map.graphicsLayerIds == 0) {
                    map.removeLayer(swipeLayerRevised);
                }
            });

            //Layer swipe widget
            var swipeWidget = new LayerSwipe({
                type: "vertical",
                left: 700,
                map: map,
                layers: [underLayerExist]
            }, "swipeDiv");

            swipeWidget.startup();

            swipeWidget.on("swipe", function () {
                // console.log(document.getElementsByClassName("vertical")[0].style["top"]);
                document.getElementsByClassName("vertical")[0].style["top"] = "0";
            });
        });

        /* map.on("Click", clickHandler);
                 function clickHandler(event) {
                     $('#outsideCBRS').modal('show');
             }*/
        on(map, "click", function (evt) {
            if (evt.graphic === undefined) {
                $('#outsideCBRS').modal('show');
            }
        });

        on(map, "click", function (evt) {
            if (evt.graphic != undefined && evt.graphic._graphicsLayer.layerId == 2) {

                queryTwo = new Query();
                queryTwo.returnGeometry = true;
                queryTwo.geometry = evt.mapPoint;
                queryTwo.outFields = ["Unit"];
                //identifyTask = new esri.tasks.IdentifyTask("http://50.17.205.92/arcgis/rest/services/NAWQA/DecadalMap/MapServer");
                queryTask = new QueryTask("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer/2");
                queryTask.execute(queryTwo);
                setCursorByID("mainDiv");
                /*var deferredResult = queryTask.execute(query);*/

                var latitude = evt.mapPoint.getLatitude();
                var longitude = evt.mapPoint.getLongitude();

                queryTask.execute(queryTwo, showResults);

                function showResults(featureSet) {

                    if (featureSet.features.length > 0) {

                        var feature = featureSet.features[0];

                        var symbol;
                        symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                new dojo.Color([255, 0, 225]), 2), new dojo.Color([98, 194, 204, 0])
                        );

                        feature.geometry.spatialReference = map.spatialReference;
                        var graphic = feature;
                        graphic.setSymbol(symbol);

                        map.graphics.add(graphic);

                        $("#unitOther").text(feature.attributes["Unit"]);
                    }
                    $('#existingCBRS').modal('show');
                }
            }
        });



        //map click handler
        on(map, "click", function (evt) {

            if (polyClicked == true) {
                polyClicked = false;
                return;
            }

            if (measurement.activeTool != null) {
                return;//
            }

            map.graphics.clear();

            if (evt.graphic != undefined) {

                query = new Query();
                query.returnGeometry = true;
                query.geometry = evt.mapPoint;
                query.outFields = ["Unit", "Name", "Unit_Type", "Change_Type", "Summary_URL", "Project_name", "Project_URL", "Status", "Docket_URL", "Unit_1", "Unit_Type_1", "PR_start_date", "PR_end_date", "Transmittal_Date"];
                //identifyTask = new esri.tasks.IdentifyTask("http://50.17.205.92/arcgis/rest/services/NAWQA/DecadalMap/MapServer");
                queryTask = new QueryTask("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer/3");
                queryTask.execute(query);
                setCursorByID("mainDiv");
                /*var deferredResult = queryTask.execute(query);*/

                var latitude = evt.mapPoint.getLatitude();
                var longitude = evt.mapPoint.getLongitude();

                queryTask.execute(query, showResults);

                function showResults(featureSet) {

                    map.graphics.clear();

                    if (featureSet.features.length > 0) {

                        var feature = featureSet.features[0];

                        var symbol;
                        symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                new dojo.Color([255, 0, 225]), 2), new dojo.Color([98, 194, 204, 0])
                        );

                        feature.geometry.spatialReference = map.spatialReference;
                        var graphic = feature;
                        graphic.setSymbol(symbol);

                        map.graphics.add(graphic);

                        $("#unitNum").text(feature.attributes["Unit"]);
                        $("#unitNumOne").text(feature.attributes["Unit_1"]);

                        $("#unitType").text(feature.attributes["Unit_Type"]);
                        $("#unitTypeOne").text(feature.attributes["Unit_Type_1"]);
                        $("#docketURL").html(feature.attributes["Docket_URL"]);
                        //$("#statusTwo").text(feature.attributes["Status"]);

                        var status = feature.attributes["Status"].toLowerCase();
                        $("#statusTwo").text(status);
                        $("#statusTwo").css("font-weight", "normal");

                        var projURL = feature.attributes["Project_URL"];
                        var projectName = feature.attributes["Project_name"];

                        $("#projName").html('<a href="' + projURL + '" target="_blank">' + projectName + '</a>');

                        //creating value for blue box
                        var blueStatus;
                        if (status.includes("p")) {
                            blueStatus = "proposed";
                        }

                        if (status.includes("f")) {
                            blueStatus = "recommended";
                        }

                        // NO CHANGE PROPOSED --  [Unit] and [Unit_1] in “Change_Polygons” are equal

                        if ((feature.attributes["Unit"]) === feature.attributes["Unit_1"]) {
                            $("#reclassification").html('You have clicked within an area that is ' + blueStatus + ' to remain within the CBRS as ' + feature.attributes["Unit_Type_1"] + ' ' + feature.attributes["Unit_1"] + '.');
                        }

                        // ADDTIONS -- [Unit] is null and [Unit_1] is not null in the “Change_Polygons”
                        if (((feature.attributes["Unit"]) === "") && (feature.attributes["Unit_1"] !== "")) {
                            $("#reclassification").html('You have clicked within an area that is ' + blueStatus + ' for addition to ' + feature.attributes["Unit_Type_1"] + ' ' + feature.attributes["Unit_1"] + '.');
                            // Where 'proposed' is in the previous statement I removed ' + feature.attributes["Status"] + ' because the P was capitalized in the data and that was not desired on the modal. I don't think the status changes at all for Addition but I'm leaving this here just incase.
                        }

                        // REMOVALS -- This modal format appears when [Unit] is not null and [Unit_1] is null in the “Change_Polygons”
                        if (((feature.attributes["Unit"]) !== "") && (feature.attributes["Unit_1"] === "")) {
                            $("#reclassification").html('You have clicked within an area that is ' + blueStatus + ' for removal from ' + feature.attributes["Unit_Type"] + ' ' + feature.attributes["Unit"] + '.');
                        }

                        // RECLASSIFICATIONS -- [Unit] does not equal [Unit_1], neither are null, and [Unit_Type] does not equal [Unit_Type_1] in the “Change_Polygons”
                        if (((feature.attributes["Unit"]) !== feature.attributes["Unit_1"]) && (feature.attributes["Unit"] !== "") && (feature.attributes["Unit_1"]) !== "" && ((feature.attributes["Unit_Type"] !== feature.attributes["Unit_Type_1"]))) {
                            $("#reclassification").html('You have clicked within an area that is ' + blueStatus + ' for reclassification from ' + feature.attributes["Unit_Type"] + ' ' + feature.attributes["Unit"] + ' to ' + feature.attributes["Unit_Type_1"] + ' ' + feature.attributes["Unit_1"] + '.');
                        }

                        // TRANSFERS -- [Unit] does not equal [Unit_1], neither are null, and [Unit_Type] equals [Unit_Type_1] in the “Change_Polygons”
                        if (((feature.attributes["Unit"]) !== feature.attributes["Unit_1"]) && (feature.attributes["Unit"] !== "") && (feature.attributes["Unit_1"] !== "") && ((feature.attributes["Unit_Type"] === feature.attributes["Unit_Type_1"]))) {
                            $("#reclassification").html('You have clicked within an area that is ' + blueStatus + ' for transfer from ' + feature.attributes["Unit_Type"] + ' ' + feature.attributes["Unit"] + ' to ' + feature.attributes["Unit_Type_1"] + ' ' + feature.attributes["Unit_1"] + '.');
                            // took out ' + feature.attributes["Status"] + ' because the Status for these 
                        }

                        // setting project status in modal
                        var prDate = "";
                        var transmittalDate = "";

                        if (feature.attributes["Status"].includes("P")) { // Proposed status

                            var dStartDay = new Date(feature.attributes["PR_start_date"]).getDate();
                            var dStartMonth = new Date(feature.attributes["PR_start_date"]).getMonth();
                            var dStartYear = new Date(feature.attributes["PR_start_date"]).getFullYear();

                            var dEndDay = new Date(feature.attributes["PR_end_date"]).getDate();
                            var dEndMonth = new Date(feature.attributes["PR_end_date"]).getMonth();
                            var dEndYear = new Date(feature.attributes["PR_end_date"]).getFullYear();
                            var fulldate = (dStartMonth + '/' + dStartDay + '/' + dStartYear + ' &#8211; ' + dEndMonth + '/' + dEndDay + '/' + dEndYear);

                            prDate = fulldate;

                            $("#status").html('<strong>' + feature.attributes["Status"] + '</strong>' + "&#8211; Public review open from " + prDate + ". See docket on " + feature.attributes["Docket_URL"] + " to make comments during the comment period and/or view submitted comments.");

                            $("#status").css("font-weight", "normal");

                            $("#finalRecText").hide();

                        } if (feature.attributes["Status"].includes("F")) { // Final recommended status

                            var day = new Date(feature.attributes["Transmittal_Date"]).getDate();
                            var month = new Date(feature.attributes["Transmittal_Date"]).getMonth();
                            var year = new Date(feature.attributes["Transmittal_Date"]).getFullYear();
                            var formattedDate = month + "/" + day + "/" + year;

                            transmittalDate = formattedDate;

                            $("#status").html('<strong>' + feature.attributes["Status"] + '</strong>' + "&#8211; The final recommended boundaries for this project were transmitted to Congress on " + transmittalDate + ". These boundaries will become effective only if adopted by Congress through legislation.");

                            $("#status").css("font-weight", "normal");

                            $("#finalRecText").html("View other information related to this project, including final recommended maps and responses to public comments: " + '<a href="' + projURL + '" target="_blank">' + projURL + '</a>')

                            $("#finalRecText").css("font-weight", "normal");
                            $("#finalRecText").show();

                        }

                        $("#unitName").text(feature.attributes["Name"]);
                        $("#changeTyp").text(feature.attributes["Change_Type"]);
                        $("#siteUnit").text(feature.attributes["Unit"]);

                        var sumURL = feature.attributes["Summary_URL"];
                        $("#summaryUrl").html("View the Service&#146s Summary of " + feature.attributes["Status"] +  " changes for this unit: " + '<a href="' + sumURL + '" target="_blank">' + sumURL + '</a>');

                        $("#summaryUrl").css("font-weight", "normal");



                        $("#siteInfoDiv").css("visibility", "visible");
                        var instance = $('#siteInfoDiv').data('lobiPanel');
                        var docHeight = $(document).height();
                        var docWidth = $(document).width();
                        var percentageOfScreen = 0.9;
                        var siteInfoHeight = docHeight * percentageOfScreen
                        var siteInfoWidth = docWidth * percentageOfScreen;

                        if (docHeight < 500) {
                            $("#siteInfoDiv").height(siteInfoHeight);
                        }
                        if (docWidth < 500) {
                            $("#siteInfoDiv").width(siteInfoWidth);
                        }

                        var instanceX = evt.x;
                        var instanceY = evt.y;


                        instance.setPosition(instanceX, instanceY);
                        if (instance.isPinned() == true) {
                            instance.unpin();
                        }
                    }



                    /*if  (((evt.graphic._graphicsLayer.layerId == 0) && (featureSet.features.length > 0)) || ((evt.graphic._graphicsLayer.layerId == 1) && (featureSet.features.length > 0))) {
                        $( "#changePolygons" ).on( "click", function() {
                            console.log("got it");
                        });
    
                        $("#changePolygons").trigger("click");
                    }*/

                }

            }



            /*deferredResult.addCallback(function(response) {

                if (response.length > 1) {

                    var feature = featureSet.features[0];
                    var attr;
                    var attrStatus;

                    for (var i = 0; i < response.length; i++) {
                        feature = response[i].feature;

                        //getting feature attributes
                        attr = feature.attributes;
                        
                        var symbol;
                        if (response[i].layerId == 0) {
                            $("#siteUnit").text(attr["Unit"]);
                            symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                    new dojo.Color([255,0,225]), 2), new dojo.Color([98,194,204,0])
                            );
                        }
                    }

                    feature.geometry.spatialReference = map.spatialReference;
                    var graphic = feature;
                    graphic.setSymbol(symbol);

                    map.graphics.add(graphic);

                    //ties the above defined InfoTemplate to the feature result returned from a click event

                    setCursorByID("mainDiv", "default");
                    map.setCursor("default");

                    ////map.infoWindow.show(evt.mapPoint);

                } 
        });*/
        });

        // Find CBRS Unit Search

        /* query = new Query();
        query.returnGeometry = true;
        query.geometry = evt.mapPoint;
        query.outFields = ["Unit"];
        query.outSpatialReference = true;
        //identifyTask = new esri.tasks.IdentifyTask("http://50.17.205.92/arcgis/rest/services/NAWQA/DecadalMap/MapServer");
        queryTask = new QueryTask("https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer/2");
        queryTask.execute(query);
        console.log("find unit:", query.outSpatialReference); */

        /* var findCBRS = new FindTask('https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/MyMapService/FeatureServer');
    
        var params = new FindParameters();
            
        params.layerIds = [2];
        params.searchFields = ["Unit"];
        params.outSpatialReference = map.spatialReference;
        params.returnGeometry = true;
        console.log("find unit:", params.outSpatialReference);
        
        function doFind() {
            params.searchText = dom.byId("searchText").value;
            findCBRS.execute(params, showResults);
        }

        $(document).ready(function(){
                $("#btnUnitSearch").click(function(){
                doFind();
                });
            });

        function showResults(results){
            if (results.length > 0){
                var graphics = [];
                var graphic = results[0].feature;
                graphics.push(graphic);
                var graphicsExtent = graphicsUtils.graphicsExtent(graphics);                  
                map.setExtent(graphicsExtent);
            } else {
                    alert("No Results. Please Try again");
            }
            
        } */

        $(document).ready(function () {
            function showModal() {
                $('#cbrsModal').modal('show');
            }

            $('#cbrsNav').click(function () {
                showModal();
            });
        });

        $("#clearSelection").click(function () {
            map.graphics.clear();
        });



        /*map.on("layers-add-result", function (evt) {
        var layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
          return {layer:layer.layer, title:layer.layer.name};
        });
        if (layerInfo.length > 0) {
          var legendDijit = new Legend({
            map: map,
            layerInfos: layerInfo
          }, "legendDiv");
          legendDijit.startup();
        }
      });*/

        /*var geocoder = new Geocoder({
            value: '',
            maxLocations: 25,
            autoComplete: true,
            arcgisGeocoder: true,
            autoNavigate: false,
            map: map
        }, 'geosearch');
        geocoder.startup();
        geocoder.on('select', geocodeSelect);
        geocoder.on('findResults', geocodeResults);
        geocoder.on('clear', clearFindGraphics);
        on(geocoder.inputNode, 'keydown', function (e) {
            if (e.keyCode == 13) {
                setSearchExtent();
            }
        });*/

        // Symbols
        /*var sym = createPictureSymbol('../images/purple-pin.png', 0, 12, 13, 24);*/

        map.on('load', function () {
            map.infoWindow.set('highlight', false);
            map.infoWindow.set('titleInBody', false);
        });

        // create search_api widget in element "geosearch"
        search_api.create("geosearch", {
            on_result: function (o) {
                // what to do when a location is found
                // o.result is geojson point feature of location with properties

                // zoom to location
                require(["esri/geometry/Extent"], function (Extent) {
                    var noExtents = ["GNIS_MAJOR", "GNIS_MINOR", "ZIPCODE", "AREACODE"];
                    var noExtentCheck = noExtents.indexOf(o.result.properties["Source"])
                    $("#geosearchModal").modal('hide');
                    if (noExtentCheck == -1) {
                        map.setExtent(
                            new esri.geometry.Extent({
                                xmin: o.result.properties.LonMin,
                                ymin: o.result.properties.LatMin,
                                xmax: o.result.properties.LonMax,
                                ymax: o.result.properties.LatMax,
                                spatialReference: { "wkid": 4326 }
                            }),
                            true
                        );
                    } else {
                        //map.setCenter();
                        require(["esri/geometry/Point"], function (Point) {
                            map.centerAndZoom(
                                new Point(o.result.properties.Lon, o.result.properties.Lat),
                                12
                            );
                        });
                    }

                });

            },
            "include_usgs_sw": true,
            "include_usgs_gw": true,
            "include_usgs_sp": true,
            "include_usgs_at": true,
            "include_usgs_ot": true,
            "include_huc2": true,
            "include_huc4": true,
            "include_huc6": true,
            "include_huc8": true,
            "include_huc10": true,
            "include_huc12": true,

            on_failure: function (o) {
                $("#test").html("Sorry, a location could not be found in search for '" + o.val() + "'");
                $("#invalidSearchLocationModal").modal('show');
            }
        });

        $(document).ready(function () {
            function showModal() {
                $('#invalidSearchLocationModal').modal('show');
            }
        });

        // Geosearch functions
        /*on(dom.byId('btnGeosearch'),'click', geosearch);*/

        // Optionally confine search to map extent
        /*function setSearchExtent (){
            geocoder.activeGeocoder.searchExtent = null;*/
        /*if (dom.byId('chkExtent').checked === 1) {
            geocoder.activeGeocoder.searchExtent = map.extent;
        } else {
            geocoder.activeGeocoder.searchExtent = null;
        }*/
        /*}*/
        /*function geosearch() {
            setSearchExtent();
            var def = geocoder.find();
            def.then(function (res){
                geocodeResults(res);
            });
            // Close modal
            $('#geosearchModal').modal('hide');
        }
        function geocodeSelect(item) {
            clearFindGraphics();
            var g = (item.graphic ? item.graphic : item.result.feature);
            g.setSymbol(sym);
            //addPlaceGraphic(item.result,g.symbol);
            // Close modal
            //$('#geosearchModal').modal('hide');
        }
        function geocodeResults(places) {
            places = places.results;
            if (places.length > 0) {
                clearFindGraphics();
                var symbol = sym;
                // Create and add graphics with pop-ups
                for (var i = 0; i < places.length; i++) {
                    //addPlaceGraphic(places[i], symbol);
                }
                //zoomToPlaces(places);
                if (places[0].extent != null) {
                    map.setExtent(places[0].extent, true)
                } else {
                    var centerPoint = new Point(places[0].feature.geometry);
                    map.centerAndZoom(centerPoint, 17);
                }
            } else {
                //alert('Sorry, address or place not found.');  // TODO
            }
        }
        function stripTitle(title) {
            var i = title.indexOf(',');
            if (i > 0) {
                title = title.substring(0,i);
            }
            return title;
        }
        function addPlaceGraphic(item,symbol)  {
            var place = {};
            var attributes,infoTemplate,pt,graphic;
            pt = item.feature.geometry;
            place.address = item.name;
            place.score = item.feature.attributes.Score;
            // Graphic components
            attributes = { address:stripTitle(place.address), score:place.score, lat:pt.getLatitude().toFixed(2), lon:pt.getLongitude().toFixed(2) };
            infoTemplate = new PopupTemplate({title:'{address}', description: 'Latitude: {lat}<br/>Longitude: {lon}'});
            graphic = new Graphic(pt,symbol,attributes,infoTemplate);
            // Add to map
            map.graphics.add(graphic);
        }
    
        function zoomToPlaces(places) {
            var multiPoint = new Multipoint(map.spatialReference);
            for (var i = 0; i < places.length; i++) {
                multiPoint.addPoint(places[i].feature.geometry);
            }
            map.setExtent(multiPoint.getExtent().expand(2.0));
        }
    
        function clearFindGraphics() {
            map.infoWindow.hide();
            map.graphics.clear();
        }
    
        function createPictureSymbol(url, xOffset, yOffset, xWidth, yHeight) {
            return new PictureMarkerSymbol(
                {
                    'angle': 0,
                    'xoffset': xOffset, 'yoffset': yOffset, 'type': 'esriPMS',
                    'url': url,
                    'contentType': 'image/png',
                    'width':xWidth, 'height': yHeight
                });
        }*/

        // FAQ Modal controls.
        $('#faq1header').click(function () { $('#faq1body').slideToggle(250); });
        $('#faq2header').click(function () { $('#faq2body').slideToggle(250); });
        $('#faq3header').click(function () { $('#faq3body').slideToggle(250); });
        $('#faq4header').click(function () { $('#faq4body').slideToggle(250); });
        $('#faq5header').click(function () { $('#faq5body').slideToggle(250); });
        $('#faq6header').click(function () { $('#faq6body').slideToggle(250); });
        $('#faq7header').click(function () { $('#faq7body').slideToggle(250); });
        $('#faq8header').click(function () { $('#faq8body').slideToggle(250); });
        $('#faq9header').click(function () { $('#faq9body').slideToggle(250); });
        $('#faq10header').click(function () { $('#faq10body').slideToggle(250); });
        $('#faq11header').click(function () { $('#faq11body').slideToggle(250); });

        $('.fullsize').click(function () {
            var data = "<img src='" + $(this).attr('src') + "'/>";
            var myWindow = window.open("data:text/html," + encodeURIComponent(data), "_blank");
            myWindow.focus();
        });

        function printMap() {

            var printParams = new PrintParameters();
            printParams.map = map;

            var template = new PrintTemplate();
            template.exportOptions = {
                width: 500,
                height: 400,
                dpi: 300
            };
            template.format = "PDF";
            template.layout = "Letter ANSI A Landscape cbrs projects";
            template.preserveScale = false;

            var existingLegendLayer = new LegendLayer();
            existingLegendLayer.layerId = "existingPoly";

            var revisedLegendLayer = new LegendLayer();
            revisedLegendLayer.layerId = "revisedPoly";

            var changeLegendLayer = new LegendLayer();
            changeLegendLayer.layerId = "changePoly"
            //legendLayer.subLayerIds = [*];

            var userTitle = $("#printTitle").val();
            //if user does not provide title, use default. otherwise apply user title
            if (userTitle == "") {
                template.layoutOptions = {
                    "titleText": "Wetlands",
                    "authorText": "Coastal Barrier Resources System (CBRS)",
                    "copyrightText": "This page was produced by the CBRS Projects Map",
                    "legendLayers": [existingLegendLayer, revisedLegendLayer, changeLegendLayer]
                };
            } else {
                template.layoutOptions = {
                    "titleText": userTitle,
                    "authorText": "Coastal Barrier Resources System (CBRS)",
                    "copyrightText": "This page was produced by the CBRS Projects Map",
                    "legendLayers": [existingLegendLayer, revisedLegendLayer, changeLegendLayer]
                };
            }

            //"legendLayers": [legendLayer]
            var docTitle = template.layoutOptions.titleText;
            printParams.template = template;
            var printMap = new PrintTask("https://fwsprimary.wim.usgs.gov/server/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");
            printMap.execute(printParams, printDone, printError);

            /* $.get("https://fwsprimary.wim.usgs.gov/pdfLoggingService/pdfLog.asmx/Log?printInfo=" + map.getScale() + "," + map.extent.xmin + "," + map.extent.ymax + "," + map.extent.xmax + "," + map.extent.ymin + ",NWIV2", function (data) {
                //console.log(data);
            }); */

            function printDone(event) {
                //alert(event.url);
                //window.open(event.url, "_blank");
                printCount++;
                //var printJob = $('<a href="'+ event.url +'" target="_blank">Printout ' + printCount + ' </a>');
                var printJob = $('<p><label>' + printCount + ': </label>&nbsp;&nbsp;<a href="' + event.url + '" target="_blank">' + docTitle + ' </a></p>');
                //$("#print-form").append(printJob);
                $("#printJobsDiv").find("p.toRemove").remove();
                $("#printModalBody").append(printJob);
                $("#printTitle").val("");
                $("#printExecuteButton").button('reset');
            }

            function printError(event) {
                alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem");
            }
        }

        function setCursorByID(id, cursorStyle) {
            var elem;
            if (document.getElementById &&
                (elem = document.getElementById(id))) {
                if (elem.style) elem.style.cursor = cursorStyle;
            }
        }

        // Show modal dialog; handle legend sizing (both on doc ready)
        $(document).ready(function () {

            function showSiteModal() {
                $('#siteInfoDiv').modal('hide');
                $('#outsideCBRS').modal('hide');
            }

            $('#siteModal').load(function () {
                showSiteModal();
                alert("worked");
            });


            function showModal() {
                $('#faqModal').modal('show');
            }
            $('#faqNav').click(function () {
                $('#faqModal').modal('show');
            });

            function showModal() {
                $('#geosearchModal').modal('show');
            }
            // Geosearch nav menu is selected
            $('#geosearchNav').click(function () {
                showModal();
            });

            function showAboutModal() {
                $('#aboutModal').modal('show');
            }
            $('#aboutNav').click(function () {
                showAboutModal();
            });

            function showDisclaimerModal() {
                $('#disclaimerModal').modal('show');
            }

            function showCBRSModal() {
                $('#outsideCBRS').modal('show');
            }

            function showExisitngCBRSModal() {
                $('#existingCBRS').modal('show');
            }

            $("#html").niceScroll();
            $("#sidebar").niceScroll();
            $("#sidebar").scroll(function () {
                $("#sidebar").getNiceScroll().resize();
            });

            // gets rid of the "Other" label representing the defaultSymbol in the UniqueValueRenderer
            $("#legendElement").click(function () {
                setTimeout(function () {
                    var esriClass = 0;
                    console.log("checking for esri table class")
                    $('table.esriLegendLayer').each(function () {
                        esriClass++;
                        if (esriClass == 1) {
                            console.log("found esri labels")
                        }
                        if (esriClass == 2) {
                            $(this).addClass("esriLegendOther");
                            console.log("Found the Other class");
                        }
                    });
                    $("<style>")
                        .prop("type", "text/css")
                        .html("\
                            {\
                            .esriLegendOther {\
                                display: none !important\
                            }\
                        }\
                        ")
                        .appendTo("head");
                }, 370);
            });


            $("#layersPanel").click(function () {
                setTimeout(function () {
                    var esriClass = 0;
                    console.log("checking for esri table class")
                    $('table.esriLegendLayer').each(function () {
                        esriClass++;
                        if (esriClass == 1) {
                            console.log("found esri labels")
                        }
                        if (esriClass == 2) {
                            $(this).addClass("esriLegendOther");
                            console.log("Found the Other class");
                        }
                    });
                    $("<style>")
                        .prop("type", "text/css")
                        .html("\
                            {\
                            .esriLegendOther {\
                                display: none !important\
                            }\
                        }\
                        ")
                        .appendTo("head");
                });
            });

            maxLegendHeight = ($('#mapDiv').height()) * 0.90;
            $('#legendElement').css('max-height', maxLegendHeight);
            maxLegendDivHeight = (maxLegendHeight) - parseInt($('#legendHeading').css("height").replace('px', ''));
            $('#legendDiv').css('max-height', maxLegendDivHeight);

            $('#legendCollapse').on('shown.bs.collapse', function () {
                if (legendDiv.innerHTML.length == 0) {
                    var legend = new Legend({
                        map: map,
                        layerInfos: legendLayers
                    }, "legendDiv");
                    legend.startup();

                    $("#legendDiv").niceScroll();

                    /*legend.addCallback(function(response) { 
                        maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
                        $('#legendElement').css('max-height', maxLegendHeight);
                        maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px',''));
                        $('#legendDiv').css('max-height', maxLegendDivHeight);
                    });*/
                }
            });

            $('#legendCollapse').on('hide.bs.collapse', function () {
                $('#legendElement').css('height', 'initial');
            });

            $('#measurementCollapse').on('shown.bs.collapse', function () {
                //show label when the collapse panel is expanded(for mobile, where label is hidden while collapsed)
                $('#measureLabel').show();
            });
            $('#measurementCollapse').on('hide.bs.collapse', function () {
                //hide label on collapse if window is small (mobile)
                if (window.innerWidth <= 767) {
                    $('#measureLabel').hide();
                }
            });

        });

        require([
            'esri/InfoTemplate',
            'esri/tasks/locator',
            'esri/tasks/query',
            'esri/tasks/QueryTask',
            'esri/graphicsUtils',
            'esri/geometry/Point',
            'esri/geometry/Extent',
            'esri/layers/ArcGISDynamicMapServiceLayer',
            'esri/layers/ArcGISImageServiceLayer',
            'esri/layers/FeatureLayer',
            'esri/layers/WMSLayer',
            'esri/layers/WMSLayerInfo',
            'esri/tasks/GeometryService',
            'esri/dijit/LayerSwipe',
            'dijit/form/CheckBox',
            'dijit/form/RadioButton',
            'dojo/query',
            'dojo/dom',
            'dojo/dom-class',
            'dojo/dom-construct',
            'dojo/dom-style',
            'dojo/on'
        ], function (
            InfoTemplate,
            Locator,
            Query,
            QueryTask,
            graphicsUtils,
            Point,
            Extent,
            ArcGISDynamicMapServiceLayer,
            ArcGISImageServiceLayer,
            FeatureLayer,
            WMSLayer,
            WMSLayerInfo,
            GeometryService,
            LayerSwipe,
            CheckBox,
            RadioButton,
            query,
            dom,
            domClass,
            domConstruct,
            domStyle,
            on
        ) {

                var layersObject = [];
                var layerArray = [];
                var staticLegendImage;
                var identifyTask, identifyParams;
                var navToolbar;
                var locator;

                var geomService = new GeometryService("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer");

                //create global layers lookup
                var mapLayers = [];

                $.each(allLayers, function (index, group) {
                    console.log('processing: ', group.groupHeading)


                    //sub-loop over layers within this groupType
                    $.each(group.layers, function (layerName, layerDetails) {



                        //check for exclusiveGroup for this layer
                        var exclusiveGroupName = '';
                        if (layerDetails.wimOptions.exclusiveGroupName) {
                            exclusiveGroupName = layerDetails.wimOptions.exclusiveGroupName;
                        }

                        if (layerDetails.wimOptions.layerType === 'agisFeature') {
                            var layer = new FeatureLayer(layerDetails.url, layerDetails.options);
                            if (layerDetails.wimOptions.renderer !== undefined) {
                                layer.setRenderer(layerDetails.wimOptions.renderer);
                            }
                            //check if include in legend is true
                            if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true) {
                                legendLayers.unshift({ layer: layer, title: layerName });
                            }
                            addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                            //addMapServerLegend(layerName, layerDetails);
                        }

                        else if (layerDetails.wimOptions.layerType === 'agisWMS') {
                            var layer = new WMSLayer(layerDetails.url, { resourceInfo: layerDetails.options.resourceInfo, visibleLayers: layerDetails.options.visibleLayers }, layerDetails.options);
                            //check if include in legend is true
                            if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true) {
                                legendLayers.unshift({ layer: layer, title: layerName });
                            }
                            //map.addLayer(layer);
                            addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                            //addMapServerLegend(layerName, layerDetails);
                        }

                        else if (layerDetails.wimOptions.layerType === 'agisDynamic') {
                            var layer = new ArcGISDynamicMapServiceLayer(layerDetails.url, layerDetails.options);
                            //check if include in legend is true
                            if (layerDetails.visibleLayers) {
                                layer.setVisibleLayers(layerDetails.visibleLayers);
                            }
                            if (layerDetails.wimOptions && layerDetails.wimOptions.layerDefinitions) {
                                var layerDefs = [];
                                $.each(layerDetails.wimOptions.layerDefinitions, function (index, def) {
                                    layerDefs[index] = def;
                                });
                                layer.setLayerDefinitions(layerDefs);
                            }
                            if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true) {
                                legendLayers.unshift({ layer: layer, title: layerName });
                            }
                            //map.addLayer(layer);
                            addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                            //addMapServerLegend(layerName, layerDetails);
                        }

                        else if (layerDetails.wimOptions.layerType === 'agisImage') {
                            var layer = new ArcGISImageServiceLayer(layerDetails.url, layerDetails.options);
                            //check if include in legend is true
                            if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true) {
                                legendLayers.unshift({ layer: layer, title: layerName });
                            }
                            if (layerDetails.visibleLayers) {
                                layer.setVisibleLayers(layerDetails.visibleLayers);
                            }
                            //map.addLayer(layer);
                            addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                            //addMapServerLegend(layerName, layerDetails);
                        }
                    });
                });






                function addLayer(groupHeading, showGroupHeading, layer, layerName, exclusiveGroupName, options, wimOptions) {

                    //add layer to map
                    //layer.addTo(map);
                    map.addLayer(layer);

                    if (layer.id == 'aoi') {
                        on(layer, 'load', function (evt) {
                            on(layer, 'click', function (evt) {
                                aoiClicked = true;
                                var linkValue = evt.graphic.attributes.HYPERLINK_2;
                                if (linkValue == "None") {
                                    var template = new InfoTemplate("${NAME}",
                                        "Type: ${TYPE}<br/>" +
                                        "Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>" +
                                        "Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>" +
                                        "Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>"
                                    );
                                    layer.setInfoTemplate(template);
                                } else {//
                                    var template = new InfoTemplate("${NAME}",
                                        "Type: ${TYPE}<br/>" +
                                        "Ramsar: <a id='ramsarLink' target='_blank' href='${HYPERLINK_2}'>click here</a><br/>" +
                                        "Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>" +
                                        "Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>" +
                                        "Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>"
                                    );
                                    layer.setInfoTemplate(template);
                                }
                            });
                        });
                    }

                    //add layer to layer list
                    mapLayers.push([exclusiveGroupName, camelize(layerName), layer]);

                    //check if its an exclusiveGroup item
                    if (exclusiveGroupName) {

                        if (!$('#' + camelize(exclusiveGroupName)).length) {
                            var exGroupRoot;
                            if (exclusiveGroupName == "Data Source") {
                                var exGroupRoot = $('<div id="' + camelize(exclusiveGroupName + " Root") + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + exclusiveGroupName + '<span id="info' + camelize(exclusiveGroupName) + '" title="Data Source identifies the scale, year and emulsion of the imagery that was used to map the wetlands and riparian areas for a given area. It also identifies areas that have Scalable data, which is an interim data product in areas of the nation where standard compliant wetland data is not yet available. Click for more info on Scalable data." class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity' + camelize(exclusiveGroupName) + '" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button> </div>');
                            } else {
                                var exGroupRoot = $('<div id="' + camelize(exclusiveGroupName + " Root") + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + exclusiveGroupName + '</button> </div>');
                            }

                            exGroupRoot.click(function (e) {
                                exGroupRoot.find('i.glyphspan').toggleClass('fa-check-square-o fa-square-o');

                                $.each(mapLayers, function (index, currentLayer) {

                                    var tempLayer = map.getLayer(currentLayer[2].id);

                                    if (currentLayer[0] == exclusiveGroupName) {
                                        if ($("#" + currentLayer[1]).find('i.glyphspan').hasClass('fa-dot-circle-o') && exGroupRoot.find('i.glyphspan').hasClass('fa-check-square-o')) {
                                            console.log('adding layer: ', currentLayer[1]);
                                            map.addLayer(currentLayer[2]);
                                            var tempLayer = map.getLayer(currentLayer[2].id);
                                            tempLayer.setVisibility(true);
                                        } else if (exGroupRoot.find('i.glyphspan').hasClass('fa-square-o')) {
                                            console.log('removing layer: ', currentLayer[1]);
                                            //map.removeLayer(currentLayer[2]);
                                            var tempLayer = map.getLayer(currentLayer[2].id);
                                            tempLayer.setVisibility(false);
                                        }

                                    }

                                });
                            });

                            var exGroupDiv = $('<div id="' + camelize(exclusiveGroupName) + '" class="btn-group-vertical" data-toggle="buttons"></div>');
                            $('#toggle').append(exGroupDiv);
                        }

                        //create radio button
                        //var button = $('<input type="radio" name="' + camelize(exclusiveGroupName) + '" value="' + camelize(layerName) + '"checked>' + layerName + '</input></br>');
                        if (layer.visible) {
                            var button = $('<div id="' + camelize(layerName) + '" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' + camelize(exclusiveGroupName) + '" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o ' + camelize(exclusiveGroupName) + '"></i>&nbsp;&nbsp;' + layerName + '</label> </div>');
                        } else {
                            var button = $('<div id="' + camelize(layerName) + '" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' + camelize(exclusiveGroupName) + '" autocomplete="off"><i class="glyphspan fa fa-circle-o ' + camelize(exclusiveGroupName) + '"></i>&nbsp;&nbsp;' + layerName + '</label> </div>');
                        }

                        $('#' + camelize(exclusiveGroupName)).append(button);

                        //click listener for radio button
                        button.click(function (e) {

                            if ($(this).find('i.glyphspan').hasClass('fa-circle-o')) {
                                $(this).find('i.glyphspan').toggleClass('fa-dot-circle-o fa-circle-o');

                                var newLayer = $(this)[0].id;

                                $.each(mapLayers, function (index, currentLayer) {

                                    if (currentLayer[0] == exclusiveGroupName) {
                                        if (currentLayer[1] == newLayer && $("#" + camelize(exclusiveGroupName + " Root")).find('i.glyphspan').hasClass('fa-check-square-o')) {
                                            console.log('adding layer: ', currentLayer[1]);
                                            map.addLayer(currentLayer[2]);
                                            var tempLayer = map.getLayer(currentLayer[2].id);
                                            tempLayer.setVisibility(true);
                                            //$('#' + camelize(currentLayer[1])).toggle();
                                        }
                                        else if (currentLayer[1] == newLayer && $("#" + camelize(exclusiveGroupName + " Root")).find('i.glyphspan').hasClass('fa-square-o')) {
                                            console.log('group heading not checked');
                                        }
                                        else {
                                            console.log('removing layer: ', currentLayer[1]);
                                            //map.removeLayer(currentLayer[2]);
                                            var tempLayer = map.getLayer(currentLayer[2].id);
                                            tempLayer.setVisibility(false);
                                            if ($("#" + currentLayer[1]).find('i.glyphspan').hasClass('fa-dot-circle-o')) {
                                                $("#" + currentLayer[1]).find('i.glyphspan').toggleClass('fa-dot-circle-o fa-circle-o');
                                            }
                                            //$('#' + camelize(this[1])).toggle();
                                        }

                                    }
                                });
                                /*if (layerName == 'Revised Polygons') {
                                    console.log("hi");
        
                                    var changeLayer = ()                            
                                    map.addLayer();
                                }*/
                            }
                        });
                    }

                    //not an exclusive group item
                    else if (wimOptions.includeInLayerList) {

                        //create layer toggle
                        //var button = $('<div align="left" style="cursor: pointer;padding:5px;"><span class="glyphspan glyphicon glyphicon-check"></span>&nbsp;&nbsp;' + layerName + '</div>');
                        if ((layer.visible && wimOptions.hasOpacitySlider)) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');
                        } else if ((!layer.visible && wimOptions.hasOpacitySlider)) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity' + camelize(layerName) + '" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');
                        } else if (layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');
                        } else if ((!layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true)) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span>' + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');
                        } else if ((layer.visible)) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span>' + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');
                        } else if ((!layer.visible)) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');
                        } else if (layer.visible) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '</button></span></div>');
                        } else {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '</button> </div>');
                        }


                        //click listener for regular
                        button.click(function (e) {

                            //toggle checkmark
                            $(this).find('i.glyphspan').toggleClass('fa-check-square-o fa-square-o');
                            $(this).find('button').button('toggle');



                            //$('#' + camelize(layerName)).toggle();

                            //layer toggle
                            if (layer.visible) {
                                layer.setVisibility(false);
                            } else {
                                layer.setVisibility(true);
                            }

                            if (wimOptions.otherLayersToggled) {
                                $.each(wimOptions.otherLayersToggled, function (key, value) {
                                    var lyr = map.getLayer(value);
                                    lyr.setVisibility(layer.visible);
                                });
                            }

                        });
                    }

                    //group heading logic
                    if (showGroupHeading !== undefined) {

                        //camelize it for divID
                        var groupDivID = camelize(groupHeading);

                        //check to see if this group already exists
                        if (!$('#' + groupDivID).length) {
                            //if it doesn't add the header
                            if (showGroupHeading) {
                                var groupDiv = $('<div id="' + groupDivID + '"><div class="alert alert-info" role="alert"><strong>' + groupHeading + '</strong></div></div>');
                            } else {
                                var groupDiv = $('<div id="' + groupDivID + '"></div>');
                            }
                            $('#toggle').append(groupDiv);
                        }

                        //if it does already exist, append to it

                        if (exclusiveGroupName) {
                            //if (!exGroupRoot.length)$("#slider"+camelize(layerName))
                            $('#' + groupDivID).append(exGroupRoot);
                            $('#' + groupDivID).append(exGroupDiv);
                            if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
                                var id = "#info" + camelize(exclusiveGroupName);
                                var moreinfo = $(id);
                                moreinfo.click(function (e) {
                                    window.open(wimOptions.moreinfo, "_blank");
                                    e.preventDefault();
                                    e.stopPropagation();
                                });
                            }
                            if ($("#opacity" + camelize(exclusiveGroupName)).length > 0) {
                                var id = "#opacity" + camelize(exclusiveGroupName);
                                var opacity = $(id);
                                opacity.click(function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    $(".opacitySlider").remove();
                                    var currOpacity = map.getLayer(options.id).opacity;
                                    var slider = $('<div class="opacitySlider"><label id="opacityValue">Opacity: ' + currOpacity + '</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');
                                    $("body").append(slider);
                                    $("#slider")[0].value = currOpacity * 100;
                                    $(".opacitySlider").css('left', event.clientX - 180);
                                    $(".opacitySlider").css('top', event.clientY - 50);

                                    $(".opacitySlider").mouseleave(function () {
                                        $(".opacitySlider").remove();
                                    });

                                    $(".opacityClose").click(function () {
                                        $(".opacitySlider").remove();
                                    });
                                    $('#slider').change(function (event) {
                                        //get the value of the slider with this call
                                        var o = ($('#slider')[0].value) / 100;
                                        console.log("o: " + o);
                                        $("#opacityValue").html("Opacity: " + o)
                                        map.getLayer(options.id).setOpacity(o);

                                        if (wimOptions.otherLayersToggled) {
                                            $.each(wimOptions.otherLayersToggled, function (key, value) {
                                                var lyr = map.getLayer(value);
                                                lyr.setOpacity(o);
                                            });
                                        }
                                        //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                                        //var e = '#' + $(this).attr('data-wjs-element');
                                        //$(e).css('opacity', o)
                                    });

                                });
                            }
                        } else {
                            $('#' + groupDivID).append(button);
                            if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
                                var id = "#info" + camelize(layerName);
                                var moreinfo = $(id);
                                moreinfo.click(function (e) {
                                    window.open(wimOptions.moreinfo, "_blank");
                                    e.preventDefault();
                                    e.stopPropagation();
                                });
                            }
                            if ($("#opacity" + camelize(layerName)).length > 0) {
                                $("#opacity" + camelize(layerName)).click(function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    $(".opacitySlider").remove();
                                    var currOpacity = map.getLayer(options.id).opacity;
                                    var slider = $('<div class="opacitySlider"><label id="opacityValue">Opacity: ' + currOpacity + '</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');
                                    $("body").append(slider);[0]

                                    $("#slider")[0].value = currOpacity * 100;
                                    $(".opacitySlider").css('left', event.clientX - 180);
                                    $(".opacitySlider").css('top', event.clientY - 50);

                                    $(".opacitySlider").mouseleave(function () {
                                        $(".opacitySlider").remove();
                                    });

                                    $(".opacityClose").click(function () {
                                        $(".opacitySlider").remove();
                                    });
                                    $('#slider').change(function (event) {
                                        //get the value of the slider with this call
                                        var o = ($('#slider')[0].value) / 100;
                                        console.log("o: " + o);
                                        $("#opacityValue").html("Opacity: " + o)
                                        map.getLayer(options.id).setOpacity(o);

                                        if (wimOptions.otherLayersToggled) {
                                            $.each(wimOptions.otherLayersToggled, function (key, value) {
                                                var lyr = map.getLayer(value);
                                                lyr.setOpacity(o);
                                            });
                                        }
                                        //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                                        //var e = '#' + $(this).attr('data-wjs-element');
                                        //$(e).css('opacity', o)
                                    });
                                });
                            }
                        }
                    }

                    else {
                        //otherwise append
                        $('#toggle').append(button);
                        if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
                            var id = "#info" + camelize(layerName);
                            var moreinfo = $(id);
                            moreinfo.click(function (e) {
                                alert(e.currentTarget.id);
                                e.preventDefault();
                                e.stopPropagation();
                            });
                        }
                    }
                }


                //get visible and non visible layer lists
                /*function addMapServerLegend(layerName, layerDetails) {
        
        
                    if (layerDetails.wimOptions.layerType === 'agisFeature') {
        
                        //for feature layer since default icon is used, put that in legend
                        var legendItem = $('<div align="left" id="' + camelize(layerName) + '"><img alt="Legend Swatch" src="https://raw.githubusercontent.com/Leaflet/Leaflet/master/dist/images/marker-icon.png" /><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                        $('#legendDiv').append(legendItem);
        
                    }
        
                    else if (layerDetails.wimOptions.layerType === 'agisWMS') {
        
                        //for WMS layers, for now just add layer title
                        var legendItem = $('<div align="left" id="' + camelize(layerName) + '"><img alt="Legend Swatch" src="http://placehold.it/25x41" /><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                        $('#legendDiv').append(legendItem);
        
                    }
        
                    else if (layerDetails.wimOptions.layerType === 'agisDynamic') {
        
                        //create new legend div
                        var legendItemDiv = $('<div align="left" id="' + camelize(layerName) + '"><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                        $('#legendDiv').append(legendItemDiv);
        
                        //get legend REST endpoint for swatch
                        $.getJSON(layerDetails.url + '/legend?f=json', function (legendResponse) {
        
                            console.log(layerName,'legendResponse',legendResponse);
        
        
        
                            //make list of layers for legend
                            if (layerDetails.options.layers) {
                                //console.log(layerName, 'has visisble layers property')
                                //if there is a layers option included, use that
                                var visibleLayers = layerDetails.options.layers;
                            }
                            else {
                                //console.log(layerName, 'no visible layers property',  legendResponse)
        
                                //create visibleLayers array with everything
                                var visibleLayers = [];
                                $.grep(legendResponse.layers, function(i,v) {
                                    visibleLayers.push(v);
                                });
                            }
        
                            //loop over all map service layers
                            $.each(legendResponse.layers, function (i, legendLayer) {
        
                                //var legendHeader = $('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong>');
                                //$('#' + camelize(layerName)).append(legendHeader);
        
                                //sub-loop over visible layers property
                                $.each(visibleLayers, function (i, visibleLayer) {
        
                                    //console.log(layerName, 'visibleLayer',  visibleLayer);
        
                                    if (visibleLayer == legendLayer.layerId) {
        
                                        console.log(layerName, visibleLayer,legendLayer.layerId, legendLayer)
        
                                        //console.log($('#' + camelize(layerName)).find('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong></br>'))
        
                                        var legendHeader = $('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong></br>');
                                        $('#' + camelize(layerName)).append(legendHeader);
        
                                        //get legend object
                                        var feature = legendLayer.legend;
                                        /*
                                         //build legend html for categorized feautres
                                         if (feature.length > 1) {
                                         */

                //placeholder icon
                //<img alt="Legend Swatch" src="http://placehold.it/25x41" />

                /*$.each(feature, function () {

                    //make sure there is a legend swatch
                    if (this.imageData) {
                        var legendFeature = $('<img alt="Legend Swatch" src="data:image/png;base64,' + this.imageData + '" /><small>' + this.label.replace('<', '').replace('>', '') + '</small></br>');

                        $('#' + camelize(layerName)).append(legendFeature);
                    }
                });
                /*
                 }
                 //single features
                 else {
                 var legendFeature = $('<img alt="Legend Swatch" src="data:image/png;base64,' + feature[0].imageData + '" /><small>&nbsp;&nbsp;' + legendLayer.layerName + '</small></br>');

                 //$('#legendDiv').append(legendItem);
                 $('#' + camelize(layerName)).append(legendFeature);

                 }
                 */
                /*}
            }); //each visible layer
        }); //each legend item
    }); //get legend json
}
}*/
                /* parse layers.js */

                //var outSR = new SpatialReference(26917);
                /*measurement.on("measure-end", function(evt){
                    //$("#utmCoords").remove();//
                    //var resultGeom = evt.geometry;
                    //var utmResult;
                    //var absoluteX = (evt.geometry.x)*-1;
                    /*if ( absoluteX < 84 && absoluteX > 78 ){
                        geomService.project ( [ resultGeom ], outSR, function (projectedGeoms){
                            utmResult = projectedGeoms[0];
                            console.log(utmResult);
                            var utmX = utmResult.x.toFixed(0);
                            var utmY = utmResult.y.toFixed(0);
                            $("#utmX").html(utmX);
                            $("#utmY").html(utmY);
                            //var utmCoords = $('<tr id="utmCoords"><td dojoattachpoint="pinCell"><span>UTM17</span></td> <td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">' + utmX + '</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">' + utmY + '</span></td></tr>');
                            //$('.esriMeasurementResultTable').append(utmCoords);
                        });
        
                    } else {
                        //$("#utmX").html("out of zone");
                        $("#utmX").html('<span class="label label-danger">outside zone</span>');
                        //$("#utmY").html("out of zone");
                        $("#utmY").html('<span class="label label-danger">outside zone</span>');
                    }*/


                //geomService.project ( [ resultGeom ], outSR, function (projectedGeoms){
                //utmResult = projectedGeoms[0];
                //console.log(utmResult);
                //});

                //});//

            });//end of require statement containing legend building code

    });

$(".close-alert").click(function () {
    $(this).parent().slideUp(250);
});


// Hiding "Other" esriLegendLabel which belongs to the "Default Symbol"
$("#legendElement").click(function () {
    setTimeout(function () {
        var esriClass = 0;
        console.log("checking for esri table class")
        $('table.esriLegendLayer').each(function () {
            esriClass++;
            if (esriClass == 1) {
                console.log("found esri labels")
            }
            if (esriClass == 2) {
                $(this).addClass("esriLegendOther");
                console.log("Found the Other class");
            }
        });
        $("<style>")
            .prop("type", "text/css")
            .html("\
                            {\
                            .esriLegendOther {\
                                display: none !important\
                            }\
                        }\
                        ")
            .appendTo("head");
    }, 500);
});