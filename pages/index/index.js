//index.js
//获取应用实例
var app = getApp()
function initSubMenuDisplay() { 
     return ['hidden', 'hidden', 'hidden'];
}

Page({
    data:{
        root:"https://youhui.95516.com/",
        detail:"https://youhui.95516.com/detail/bill.html?",
        categoryUrl:"https://youhui.95516.com/wm-non-biz-web/restlet/payBill/allBillList?isSeckill=&secondTypeCd=&cardIssusers=&cardLevel=&currentPage=1&pageSize=9&showBillTp10=1&version=1.0&source=1",
  
        city:['上海市'],
        citys:['上海市','北京市'],
        cityCd:['310000'],
        
        imgUrls: [
          '../image/1.png',
          '../image/2.png',
          '../image/3.png',
          '../image/4.png'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,

        title:["全部商户","全城商圈","默认排序"],

        titleNochange:["全部商户","全城商圈","默认排序"],

        indexX: 0,
        indexY: 0,
        indexZ: 0,

        SubMenuItem : [
          ['全部商户','美食','购物','休闲娱乐','丽人','生活服务','酒店'],
          ['全城商圈','浦东新区','奉贤区','闵行区','普陀区'],
          ['默认排序','发布时间','热门程度','评价最高']
        ],
        shanghai:[
          ['全部商户','美食','购物','休闲娱乐','丽人','生活服务','酒店'],
          ['全城商圈','浦东新区','奉贤区','闵行区','普陀区'],
          ['默认排序','发布时间','热门程度','评价最高']
        ],
        paking:[
          ['全部商户','美食','购物','休闲娱乐','丽人','生活服务','酒店'],
          ['全城商圈','朝阳区','海淀区','山里屯','东城区'],
          ['默认排序','发布时间','热门程度','评价最高']
        ],
        
        couponList: [],
        subMenuDisplay:initSubMenuDisplay(),
        citySubMenuDisplay:['hidden']
    },
    onLoad:function(e){
      var that = this
      app.showDialog()
      app.request(that.data.categoryUrl+"&cityCd="+that.data.cityCd+"&firstTypeCd="+""+"&bizAreaCd="+""+"&orderType="+4, function callback(obj){
        app.dismissDialog()
        var jsonArr = new Array();
        for(var i=0; i<obj.length; i++){
          var id
          var vendorType
          var picUrl
          var createTime
          var counponUrl
          var couponName
          var companyName
          var requrie
          var des
          var detailUrl
          var brandId
          var billId
          var cityCd
          var branchNum
          brandId = obj[i]['brandId']
          billId = obj[i]['billId']
          counponUrl = that.data.root+obj[i]['billPicPath'];
          couponName = obj[i]['brandNm']
          createTime = obj[i]['updTime']
          cityCd = that.data.cityCd
          branchNum = "("+obj[i]['branchNum']+"店通用）"
          //处理时间格式
          var time = createTime.substring(0, 8)
          createTime = time.substring(0,4)+"年"+time.substring(4,6)+"月"+time.substring(6,8)+"日"

          des = obj[i]['ticketNm']
          detailUrl = that.data.detail + "billId="+billId+"&brandId="+brandId+"&updTime="+createTime;
          var jsonObj = {"branchNum":branchNum,"cityCd":cityCd,"brandId":brandId,"billId":billId,"counponUrl":counponUrl,"createTime":createTime,"couponName":couponName,"detailUrl":detailUrl,"des":des}
          jsonArr.push(jsonObj)
        }

        that.setData({
          couponList:jsonArr
        })
      })
    },
    tapMainMenu: function(e) {
        //获取当前显示的一级菜单标识
        var index = parseInt(e.currentTarget.dataset.index); 
        // console.log(index)       
        // 生成数组，全为hidden的，只对当前的进行显示
        var newSubMenuDisplay = initSubMenuDisplay();
        // 如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
        if(this.data.subMenuDisplay[index] == 'hidden') {
            newSubMenuDisplay[index] = 'show';
        } else {
            newSubMenuDisplay[index] = 'hidden';
        }        
        // 设置为新的数组
        this.setData({
            subMenuDisplay: newSubMenuDisplay
        });
  
        //关掉地域表单
        this.setData({
          citySubMenuDisplay: ['hidden']
        })
        
    },
    tapSubMenu: function(e) {        
      // 隐藏所有一级菜单
        this.setData({//
          subMenuDisplay: initSubMenuDisplay(),
          //点击子项目之后实现筛选
          // jobList: this.data.jobListnew
        });        
        // 处理二级菜单，首先获取当前显示的二级菜单标识

        var indexArray = e.currentTarget.dataset.index.split('-');        // 初始化状态
        // console.log(indexArray)
        //初始化indexX, indexY与indexZ
        if(0 == indexArray[0]){
          this.setData({
            indexX: indexArray[1]
          })
        }else if(1 == indexArray[0]){
          this.setData({
            indexY: indexArray[1]
          })
        }else if(2 == indexArray[0]){
          this.setData({
            indexZ: indexArray[1]
          })
        }
        
        var tempIndexX
        if(this.data.indexX == 0){
          tempIndexX = ""
        }else if(this.data.indexX == 1){
          tempIndexX = 1
        }else if(this.data.indexX == 2){
          tempIndexX = 2
        }else if(this.data.indexX == 3){
          tempIndexX = 3
        }else if(this.data.indexX == 4){
          tempIndexX = 4
        }else if(this.data.indexX == 5){
          tempIndexX = 5
        }else if(this.data.indexX == 6){
          tempIndexX = 7
        }  

         

        var tempIndexY
        if(this.data.cityCd == 310000){
          if(this.data.indexY == 0){
            tempIndexY = ""
          }else if(this.data.indexY == 1){
            tempIndexY = 150
          }else if(this.data.indexY == 2){
            tempIndexY = 2101
          }else if(this.data.indexY == 3){
            tempIndexY = 2102
          }else if(this.data.indexY == 4){
            tempIndexY = 2225
          }
        } else if(this.data.cityCd == 110000){
          if(this.data.indexY == 0){
            tempIndexY = ""
          }else if(this.data.indexY == 1){
            tempIndexY = 3513
          }else if(this.data.indexY == 2){
            tempIndexY = 3684
          }else if(this.data.indexY == 3){
            tempIndexY = 3839
          }else if(this.data.indexY == 4){
            tempIndexY = 3981
          }
        } 


        var tempIndexZ
        if(this.data.indexZ == 0){
          tempIndexZ = 4
        }else if(this.data.indexZ == 1){
          tempIndexZ = 1
        }else if(this.data.indexZ == 2){
          tempIndexZ = 3
        }else if(this.data.indexZ == 3){
          tempIndexZ = 5
        }
        
        console.log(this.data.cityCd+" === "+tempIndexX + " === " + tempIndexY+" === "+ tempIndexZ)

        var that = this
        app.showDialog()
        console.log("==============")
        console.log(that.data.categoryUrl+"&cityCd="+that.data.cityCd+"&firstTypeCd="+tempIndexX+"&bizAreaCd="+tempIndexY+"&orderType="+tempIndexZ)
        app.request(that.data.categoryUrl+"&cityCd="+that.data.cityCd+"&firstTypeCd="+tempIndexX+"&bizAreaCd="+tempIndexY+"&orderType="+tempIndexZ, function callback(obj){
          app.dismissDialog()
          console.log("that.data.cityCd"+that.data.cityCd)
          var jsonArr = new Array();
          for(var i=0; i<obj.length; i++){
            var id
            var vendorType
            var picUrl
            var createTime
            var counponUrl
            var couponName
            var companyName
            var requrie
            var des
            var detailUrl
            var brandId
            var billId
            var cityCd
            var branchNum
            brandId = obj[i]['brandId']
            billId = obj[i]['billId']
            counponUrl = that.data.root+obj[i]['billPicPath'];
            couponName = obj[i]['brandNm']
            createTime = obj[i]['updTime']
            cityCd = that.data.cityCd
            branchNum = "("+obj[i]['branchNum']+"店通用）"
            //处理时间格式
            var time = createTime.substring(0, 8)
            createTime = time.substring(0,4)+"年"+time.substring(4,6)+"月"+time.substring(6,8)+"日"

            des = obj[i]['ticketNm']
            detailUrl = that.data.detail + "billId="+billId+"&brandId="+brandId+"&updTime="+createTime;
            // console.log(detailUrl)
            var jsonObj = {"branchNum":branchNum,"cityCd":cityCd,"billId":billId,"brandId":brandId,"counponUrl":counponUrl,"createTime":createTime,"couponName":couponName,"detailUrl":detailUrl,"des":des}
            // console.log(jsonObj)
            jsonArr.push(jsonObj)
          }
          console.log("fuck"+jsonArr[0]['cityCd'])
          that.setData({
            couponList:jsonArr,
            cityCd:cityCd
          })
          console.log("fuck you"+that.data.couponList[0]['cityCd'])
        })

        var initSubMenuHighLight = [
              ['','','','',''],
              ['',''],
              ['','','']
            ];
        var newSubMenuHighLight = initSubMenuHighLight;
        for (var i = 0; i < initSubMenuHighLight.length; i++) {            
          // 如果点中的是一级菜单，则先清空状态，即非高亮模式，然后再高亮点中的二级菜单；
          //如果不是当前菜单，而不理会。经过这样处理就能保留其他菜单的高亮状态
            if (indexArray[0] == i) {                
              for (var j = 0; j < initSubMenuHighLight[i].length; j++) {                    
                    // 实现清空
                    initSubMenuHighLight[i][j] = '';
                }    // 将当前菜单的二级菜单设置回去
            }
        }        // 与一级菜单不同，这里不需要判断当前状态，只需要点击就给class赋予highlight即可
        initSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';        // 设置为新的数组
        this.data.title[indexArray[0]] = this.data.SubMenuItem[indexArray[0]][indexArray[1]];
        // console.log(this.data.title[indexArray[0]])
        this.setData({
            subMenuHighLight: initSubMenuHighLight,
            title:this.data.title
        });
    },
    youhuijuan: function(e){
      var detailUrl = e.currentTarget.id
      wx.navigateTo({
        url: '../detail/detail?detailUrl='+detailUrl,
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
    },
    cityMainMenu:function(e){
      var newSubMenuDisplay = initSubMenuDisplay();
      console.log("==================")
      for(var i=0; i<3; i++){
        newSubMenuDisplay[i] = 'hidden'
      }      
      // 设置为新的数组
      this.setData({
          subMenuDisplay: newSubMenuDisplay
      });
      console.log("ssssssssssss")
      if(this.data.citySubMenuDisplay == 'hidden'){
        this.setData({
          citySubMenuDisplay:['show']
        })
      }else{
        this.setData({
          citySubMenuDisplay: ['hidden']
        })
      }
    },
    citySubMenu:function(e){
      if(this.data.citySubMenuDisplay == 'hidden'){
        this.setData({
          citySubMenuDisplay:['show']
        })
      }else{
        this.setData({
          citySubMenuDisplay: ['hidden']
        })
      }
      var indexArray = e.currentTarget.dataset.index

      var tempCityIndex
      if(indexArray == 0){
        tempCityIndex = 310000
      }else if(indexArray == 1){
        tempCityIndex = 110000
      }
      // else if(indexArray == 2){
      //   tempCityIndex = 440100
      // }else if(indexArray == 3){
      //   tempCityIndex = 330100
      // }else if(indexArray == 4){
      //   tempCityIndex = 320100
      // }
      if(tempCityIndex ==310000){
        this.setData({
          SubMenuItem: this.data.shanghai,
          title:this.data.titleNochange
        })
      }else if(tempCityIndex == 110000){
        this.setData({
          SubMenuItem: this.data.paking,
          title:this.data.titleNochange
        })
      }

      this.setData({
        city:this.data.citys[indexArray],
        cityCd:tempCityIndex
      })
    }
});
