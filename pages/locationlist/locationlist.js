// pages/locationlist/locationlist.js
var app = getApp()
Page({
  data:{
    testMechAddres:"https://youhui.95516.com/wm-non-biz-web/restlet/bill/billBranchList?&version=1.0&source=1&currentPage=1&pageSize=3",
    address:[
            {"shopdes":"上海西郊百联","locatedes":"上海市仙霞西路88号西郊百联首层","phonenum":"800-900-1380"},
            {"shopdes":"上海卢湾店","locatedes":"淮海中路787号","phonenum":"800-900-1380"}], 
  },
  onLoad:function(options){
    var that = this
    app.showDialog()
    app.request(that.data.testMechAddres+"&cityCd="+options.cityCd+"&billId="+options.billId,function callback(obj){
         
        // console.log(that.data.testMechAddres)
        var jsonArr = new Array()
        for(var i=0; i<obj.length; i++){
          var jsonObj
          var shopdes = obj[i]['addr']
          var amaplatitude = obj[i]['amaplatitude']
          var amaplongitude = obj[i]['amaplongitude']
          var locatedes = obj[i]['name']
          var phonenum = obj[i]['phone']
          jsonObj = {"shopdes":shopdes,"locatedes":locatedes,"phonenum":phonenum,"amaplatitude":amaplatitude,"amaplongitude":amaplongitude}
          jsonArr.push(jsonObj)
        }
        console.log("jsonArr"+jsonArr)
        
        that.setData({address:jsonArr})
      })
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    app.dismissDialog()
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  gotoLocation:function(e){
    wx.navigateTo({
      url: '../location/location?detailUrl='+e.currentTarget.id,

      success: function(res){
        // success
        
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})