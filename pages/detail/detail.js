var app = getApp()
Page({
    data: {
        root:"https://youhui.95516.com/",
        details:"https://youhui.95516.com/detail/bill.html?",
        ndicatorDots: true,
        autoplay: true,
        interval: 4000,
        duration: 2000, 
        testMechAddres:"https://youhui.95516.com/wm-non-biz-web/restlet/bill/billBranchList?&version=1.0&source=1&currentPage=1&pageSize=3",
        detail:{
            "cityCd":"",
            "billId":"",
            "id":"",
            "couponName":"",
            "des":"",
            "counponUrl":"",
            "requrie":"",
            "validtime":"",
            "remainder":"",
            "userule":"",
            "shopdec":""
        },
        address:[
            {"amaplatitude":"" ,"amaplongitude":"","shopdes":"","locatedes":"","phonenum":""},
            {"amaplatitude":"" ,"amaplongitude":"","shopdes":"","locatedes":"","phonenum":""}
        ]
    },

    onLoad: function(options) {
        var detailUrl = options.detailUrl
        var itemArr = detailUrl.split("_");
        var last = itemArr[itemArr.length-1]
        var cityCdTmp = last.split(".")[0]
        console.log(cityCdTmp);
        var that = this
        app.showDialog()   
        app.requestJsonObj(detailUrl,function callback(obj){
            app.dismissDialog()
            var jsonArr = new Array();
            var jsonDataBrandDetail = obj['data-brand-detail']['data']
            var jsonDataBrandBill = obj['data-brand-bill-list']['data']
            var mechtObject = jsonDataBrandBill[0]
            var couponName
            var des
            var counponUrl
            var requrie
            var validtime
            var remainder
            var userule
            var shopdec
            var billId
            var cityCd
            var jsonArr = new Array();

            couponName = mechtObject['brandNm']
            des = mechtObject['activityDesc']
            counponUrl = that.data.root+mechtObject['billPicPath'];
            requrie = mechtObject['billRule']
            validtime = mechtObject['billBeginDt']+" 至 "+ mechtObject['billEndDt']
            remainder = mechtObject['leftNumt']
            userule = mechtObject['userInstructions']
            shopdec = jsonDataBrandDetail['brandDesc']
            billId = mechtObject['billId']
            cityCd = cityCdTmp
            console.log("logggggggg"+cityCd)

            app.showDialog()   
            app.request(that.data.testMechAddres+"&billId="+billId+"&cityCd="+cityCd,function callback(obj){     
                app.dismissDialog()
                // console.log("loghhhhhhhhhh"+cityCd)
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
            })
            var jsonObj = {
                "cityCd":cityCd,
                "billId":billId,
                "couponName":couponName,
                "des":des,
                "counponUrl":counponUrl,
                "requrie":requrie,
                "validtime":validtime,
                "remainder":remainder,
                "userule":userule,
                "shopdec":shopdec,
                "address":jsonArr
             }
             that.setData({detail:jsonObj})
             that.setData({address:jsonObj['address']})
        })
    }
})
