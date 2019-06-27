Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: "scaleToFill",
    arr: [
      '/images/banner.jpg',
      '/images/banner1.jpg',
      '/images/banner2.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    us_user_name: '',
    gongyingshang_id:'',
    caigou_id:'',
    renwu_id:'',
    fn_func_name:'',
    dadd_creator:'',
    us_user_id: '',
    dai_who_find:'',
    nav:[],
    name:'',
    total:'',
  },
  // 供应商管理验证
  manage: function () {
    var that = this
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/check',
      data: {
        dai_who_find: wx.getStorageSync('us_user_id'),
        getkey: us_user_id_pass,
        fn_func_id: that.data.gongyingshang_id,
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        if(res.data.status == 1){
          wx.navigateTo({
            url: '/pages/supplier_management/supplier_management',
          })
        }else{
          wx.showToast({
            title: '没有权限访问',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      }
    })                                                                                                                                                                                                                                                                            
  },
  // 新品开发任务
  task: function () {
    var that = this
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/check',
      data: {
        dai_who_find: wx.getStorageSync('us_user_id'),
        fn_func_id: that.data.renwu_id,
        getkey: us_user_id_pass,
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.status == 1) {
          wx.navigateTo({
            url: "/pages/develop/develop",
          })
        } else {
          wx.showToast({
            title: '没有权限访问',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      }
    })
  },
  // 采购找货任务
  find: function () {
    var that = this
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/check',
      data: {
        dai_who_find: wx.getStorageSync('us_user_id'),
        getkey: us_user_id_pass,
        fn_func_id: that.data.caigou_id,
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.status == 1) {
          wx.navigateTo({
            url: '/pages/home/home',
          })
        } else {
          wx.showToast({
            title: '没有权限访问',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var username = wx.getStorageSync('us_user_name')
    that.setData({
      name: username
    })
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/home',
      data: {
        dai_who_find: wx.getStorageSync('us_user_id'),
        getkey: us_user_id_pass,
      },
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
       
        that.setData({
          // console.log(res.data.data[0]),
          nav:[],
          nav: res.data.data[0],
          total: res.data.data[1].total,
          gongyingshang_id: res.data.data[0][0].fn_func_id,
          renwu_id: res.data.data[0][1].fn_func_id,
          caigou_id: res.data.data[0][2].fn_func_id,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})