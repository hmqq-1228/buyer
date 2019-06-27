// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    time_hui:'hidden',
    time_zheng:'show',
    grade_hui:'hidden',
    grade_zheng:'show',
    keywords:'',
    // list:'hidden',
    // keyword:'',
    sl_supplier_id:'',
    select:false
  },
// 加号跳转添加页面
  go_supplier:function(){
    wx.navigateTo({
      url: '../supplier_add/supplier_add',
    })
  },
  // 箭头跳转添加页面
  go_complie: function (event) {
    console.log(event.currentTarget.dataset.index)
    var sl_supplier_id = this.data.array[event.currentTarget.dataset.index].sl_supplier_id
    wx.navigateTo({
      url: '../supplier_compile/supplier_compile?sl_supplier_id=' + sl_supplier_id,
    })
  },
  // 输入内容
  change_search(e){
    if(e.detail.value.length > 0){
      this.setData({
        select:true,
        keywords: e.detail.value
      })
    }else{
      this.setData({
        select: false
      })
    }
  },
  
  cha:function(){
    this.setData({
      keywords: ''
    })
  },
  
  //点击键盘上的搜索和搜索图标的时候
  search: function () {
    // wx.showLoading({
    //   title: '加载中',
    // })
    var that = this
      var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      var dai_who_find = wx.getStorageSync('us_user_id')
      wx.request({
        url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/supplier/searchlist',
        data: {
          dai_who_find: wx.getStorageSync('us_user_id'),
          getkey: us_user_id_pass,
          sl_supplier_name: that.data.keywords,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          that.setData({
            array:res.data.data

          })
        }
      })
  },
  supplier_val: function (event) {
    var name = this.data.select_arr[event.currentTarget.dataset.index].sl_supplier_name
    this.setData({
      sl_supplier_name: name,
      supplier_val: name,
      select: 'hidden'
    })

  },

  // 点击取消的时候
  
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
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    var dai_who_find = wx.getStorageSync('us_user_id')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/supplier/searchlist',
      data: {
        dai_who_find: wx.getStorageSync('us_user_id'),
        getkey: us_user_id_pass,
        
        sl_supplier_name: that.data.keywords,
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.status > 0){
            that.setData({
              array:res.data.data
            })
        }
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    that.setData({
      no_more: 'hidden',
      page: 1,
      time_hui: '',
      time_zheng: 'hidden',
      grade_hui: 'hidden',
      grade_zheng: 'show',
      time_check: 0,
      grade_check: 0,
      keywords: ''
    })
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/supplier/searchlist',
      data: {
        dai_who_find: dai_who_find,
        keywords: '',
        getkey: us_user_id_pass,
        page: 1,
        total: 10,

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          array: res.data.data.data
        })
      }
    })
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
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