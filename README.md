# map api marker demo
    
    地图API 标记调用演示, 支持百度地图, 高德地图和谷歌地图,可随意切换使用

## usage

    申请相应的地图API key, 使用坐标拾趣工具获取你的标注坐标经纬度. 修改信息为你自己的即可
    amap,  bmap ,  gmap
    
    百度地图坐标拾取 http://api.map.baidu.com/lbsapi/getpoint/index.html

	注意在你的页面中定义 mapview 样式[地图展示区域样式]
     <!-- for map -->
        <div class="mapview" id="map_wrapper">

        </div>
        <script type='text/javascript' src='map.js?v=1.0'></script>
        <script>
            loadmap({
                provider: "bmap",
                def_lat: "40.084616",
                def_lng: "116.233808",
                scroll_wheel: true,
                info_content: '<div class="t16 mb5"><B>医修库北京总部</B></div><div class="t12 light mb10">电话: 010-57266033 Email: zgdcf@msn.com <BR>北京市 海淀区永澄北路2号院1号楼A座4层405-390号</div>',
                jump_content: '医修库北京总部'
            });
        </script>



### more demo

    http://dev.yunnan.ws
    


