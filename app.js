//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },

   request:function(obj, callback){
    wx.request({
        url: obj, //仅为示例，并非真实的接口地址
        data: {
          x: '',
          y: '',
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          callback(res.data['data'])
        }
      })
    },
    requestJsonObj:function(obj, callback){
      wx.request({
          url: obj, //仅为示例，并非真实的接口地址
          data: {
          x: '' ,
          y: ''
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            callback(res.data)
          }
      })
    },
    requestCallback:function(obj){

    },

    showDialog: function() {
      wx.showToast({
        title:'数据加载中',
        icon:'loading',
        duration:100000
      })
    },

    //打印
    dismissDialog: function(){
      wx.hideToast()
    }
})