/**
 * TODO
 * config {def_lat, def_lng, wrapper_id, provider, zoom}
 */
var ascript_loaded = false,
    bscript_loaded = false,
    gscript_loaded = false,
    amap = amarker = null,
    bmap = bmarker = null,
    gmap = gmarker = null,
    map_wrapper = "map_wrapper",
    def_lat = "",
    def_lng = "",
    def_zoom = 17,
    def_scrollwheel = true,
    info_content = "",
    jump_content = "";

function loadmap(config) {
    def_lat = config.def_lat;
    def_lng = config.def_lng;

    if (config.wrapper_id) {
        map_wrapper = config.wrapper_id;
    }
    if (config.zoom && !isNaN(config.zoom)) {
        def_zoom = config.zoom;
    }
    if (typeof config.scroll_wheel == 'boolean') {
        def_scrollwheel = config.scroll_wheel;
    }
    if (config.info_content) {
        info_content = config.info_content;
    }
    if (config.jump_content) {
        jump_content = config.jump_content;
    }

    if ('amap' == config.provider) {
        if (ascript_loaded) {
            init_amap();
        } else {
            var ascript = document.createElement("script");
            ascript.type = "text/javascript";
            ascript.src = "http://webapi.amap.com/maps?v=1.3&key=d2e90e747faeec35d8a19ab78d554055&callback=init_amap";
            document.body.appendChild(ascript);
        }
    } else if ('bmap' == config.provider) {
        if (bscript_loaded) {
            init_bmap();
        } else {
            // ak bUAro67wevKhdpWznTvaeios
            var bscript = document.createElement("script");
            bscript.src = "http://api.map.baidu.com/api?v=2.0&ak=biM0gQrgHeBX3GuPI99X3qc8uqlHDIiR&callback=init_bmap";
            document.body.appendChild(bscript);
        }
    } else if ('gmap' == config.provider) {
        if (gscript_loaded) {
            init_gmap();
        } else {
            var gscript = document.createElement("script");
            gscript.type = "text/javascript";
            gscript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAcWzVFvCP5MFyViAZ3YpQFcJ-Vx6TWy0o&signed_in=true&callback=init_gmap";
            document.body.appendChild(gscript);
        }
    }
}

function init_amap() {
    ascript_loaded = true;
    bmap = gmap = null; // 把b|gmap清空

    if (!amap) {
        amap = new AMap.Map(map_wrapper);
        amap.plugin(["AMap.ToolBar"], function () {
            amap.addControl(new AMap.ToolBar());
        });
        amap.setStatus({scrollWheel: def_scrollwheel});
    }
    var point = [def_lng, def_lat];
    amap.setCenter(point);
    amap.setZoom(def_zoom);

    if (amarker) {
        amarker.setMap();
    }
    amarker = new AMap.Marker({
        position: point,
        offset: new AMap.Pixel(-10, -34)
    });
//    amarker.content = '<p>1</p><p>2</p><p><a href="http://www.baidu.com" target="_blank">Baidu</a></p>';
    amarker.setMap(amap);

    // TODO infowindow
//    var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
//    amarker.on('click', function(e) {
//        infoWindow.setContent(e.target.content);
//        infoWindow.open(amap, e.target.getPosition());
//    });
}

function init_bmap() {
    bscript_loaded = true;
    amap = gmap = null;

    // 如果不加timeout, 那么总是出现marker错位, 总是panto被终止.
    setTimeout(function() {
        if (!bmap) {
            bmap = new BMap.Map(map_wrapper, {enableMapClick: false});
            bmap.addControl(new BMap.NavigationControl());
            bmap.addControl(new BMap.ScaleControl());
            if (!def_scrollwheel) {
                bmap.disableScrollWheelZoom();
            }
        }

        bmap.clearOverlays();

        var point = new BMap.Point(def_lng, def_lat);
        bmap.centerAndZoom(point, def_zoom);

        bmarker = new BMap.Marker(point);
        bmap.addOverlay(bmarker);

        if (info_content) {
            var opts = {};
            var jumpurl = 'http://api.map.baidu.com/marker?location='
                + def_lat + ',' + def_lng
                + '&title=' + encodeURIComponent('位置')
                + '&content=' + encodeURIComponent(jump_content)
                + '&output=html'
                + '&src=miotweb';
            info_content += '<p><a href="' +jumpurl+ '" target="_blank">去百度地图查看路线</a></p>';
            var infoWindow = new BMap.InfoWindow(info_content, opts);

            bmarker.openInfoWindow(infoWindow);
            bmarker.addEventListener("click", function(e) {
                var p = e.target;
                p.openInfoWindow(infoWindow);
            });
        }
    }, 300);
}

function init_gmap() {
    gscript_loaded = true;
    amap = bmap = null;

    if (!gmap) {
        gmap = new google.maps.Map(document.getElementById(map_wrapper));
    }

    point = {lat: parseFloat(def_lat), lng: parseFloat(def_lng)};
    gmap.setCenter(point);
    gmap.setZoom(def_zoom);

    gmarker = new google.maps.Marker({
        position: point,
        map: gmap
    });

    // TODO infowindow
//    var markerInfo = new google.maps.InfoWindow({
//        content: info_content
//    });

//    gmarker.addEventListener("click", function () {
//        markerInfo.open(gmap, gmarker);
//    });
}