//location.js
//获取应用实例
var app = getApp()
Page( {
  data: {
    from:"我的位置",
    dis:"到这里去",
    point:{
      latitude: 23.114155,
      longitude: 113.318977
    },
    markers: []
  },
  onLoad: function(options) {
    app.showDialog()
    var locationArr = options.detailUrl.split("_");

    console.log( options.detailUrl )

    var that = this;
    wx.getLocation( {
      type: 'wgs84',
      success: function( res ) {
        //我这里测试获取的数据一直是一样的（TIT创意园），官方接口没真正开放，还是没发布的原因
        var latitude = locationArr[0]
        var longitude = locationArr[1]
        that.setData({dis:locationArr[2]})
         console.log( latitude)
        var speed = res.speed
        var accuracy = res.accuracy;
        var point={
             latitude: latitude,
             longitude: longitude
        }
        var markers = [ {
          latitude: latitude,
          longitude: longitude,
          name: '地图定位',
          desc: locationArr[2]
        }];
        that.setData({markers:markers} );
        console.log(point)
         that.setData({point:point});
      },
      fail: function() {
           latitude: this.data.point['latitude'];
           longitude: this.data.point['longitude']
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
    app.dismissDialog()
  },
})
