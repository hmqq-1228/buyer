// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[{
      // monicker: "桃桃食品",
      // thicker:"张道乐",
      // linkman:'张希斌',
      // tel:'0518149649849'
    }],
    time_hui:'hidden',
    time_zheng:'show',
    grade_hui:'hidden',
    grade_zheng:'show',
    keywords:'',

  },

  // 搜索输入框失去焦点的时候
  change_search:function(e){
    this.setData({
      keywords:e.detail.value
    })
  },
  //点击键盘上的搜索和搜索图标的时候
  search: function (e) {
    var that = this
    this.setData({
      page: 1
    })
    console.log(that.data.keywords)
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/index',
      data: {
        dai_who_find: dai_who_find,
        keywords: that.data.keywords,
        total: 10,
        getkey: us_user_id_pass,
        page: 1,
        date: that.data.date,
        level: that.data.level,
        env:'false'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data.data)
        that.setData({
          array: res.data.data.data,
          no_more: 'hidden',
        })
      }
    })
  },
  // 点击取消的时候
  cancel:function(){
    this.setData({
      keywords: ''
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
    that.setData({
      no_more: 'hidden',
      page:1,
      time_hui: 'hidden',
      time_zheng: 'show',
      grade_hui: 'hidden',
      grade_zheng: 'show',
      time_check: 0,
      grade_check: 0,
      keywords: ''
    })
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/index',
      data: {
        dai_who_find: dai_who_find,
        keywords: '',
        getkey: us_user_id_pass,
        page:1,
        date:'',
        // level: 0,
        total: 10,
        env:'false'
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
      url: 'https://cj.panduo.com.cn/api/index',
      data: {
        dai_who_find: dai_who_find,
        keywords: '',
        getkey: us_user_id_pass,
        page: 1,
        date: '',
        level: 0,
        total: 10,
        env:'false'
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
    var that = this;
      if (that.data.no_more =='hidden'){
        that.setData({
          load: false,
          loading: true,//加载动画的显示
          page: that.data.page * 1 + 1,
        })
        var dai_who_find = wx.getStorageSync('us_user_id')
        var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
        wx.request({
          url: 'https://cj.panduo.com.cn/api/index',
          data: {
            dai_who_find: dai_who_find,
            keywords: '',
            getkey: us_user_id_pass,
            page: that.data.page,
            date: that.data.date,
            level: that.data.level,
            total: 10,
            env:'false'
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            var content = that.data.array.concat(res.data.data.data)//将放回结果放入content
            that.setData({
              array: content,
              load: true,
              loading: false,
            })
            if (res.data.data.data.length < 10) {
              that.setData({
                no_more: 'show'
              })
            }
          }
        })
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})