// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    time_hui:'',
    time_zheng:'hidden',
    grade_hui:'hidden',
    grade_zheng:'show',
    time_check:0,
    grade_check:0,
    keywords:'',
    date:0,//时间
    level:0,//等级
    page:1,//页数
    no_more:'hidden'
  },
  // 点击等级
  grade:function(){
    var that = this
    if (this.data.grade_check == 0){//降序
      this.setData({
        grade_hui: 'show',
        grade_zheng: 'hidden',
        grade_check:1,
        level:1
      })
    } else {//升序
      this.setData({
        grade_hui: 'hidden',
        grade_zheng: 'show',
        grade_check: 0,
        level: 0
      })
    }
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'http://cj.panduo.com.cn/api/index',
      data: {
        dai_who_find: dai_who_find,
        keywords: that.data.keywords,
        page: that.data.page,
        date: that.data.date,
        level: that.data.level,
        getkey: us_user_id_pass,
        us_user_name: that.data.us_user_name,
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
  },
  // 点击时间
  time: function () {
    var that = this
    if (this.data.time_check == 0) {//升序
      this.setData({
        time_hui: 'hidden',
        time_zheng: 'show',
        time_check: 1,
        date:1
      })
    } else {//降序
      this.setData({
        time_hui: 'show',
        time_zheng: 'hidden',
        time_check: 0,
        date: 0
      })
    }
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'http://cj.panduo.com.cn/api/index',
      data: {
        dai_who_find: dai_who_find,
        keywords: that.data.keywords,
        page: that.data.page,
        date: that.data.date,
        level: that.data.level,
        total: 10,
        getkey:us_user_id_pass,
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
  details: function (event){
    var dadd_desc_det = this.data.array[event.currentTarget.dataset.index].dadd_desc_det
    wx.navigateTo({
      url: '../details/details?dadd_desc_det=' + dadd_desc_det,
    })
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
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_i_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'http://cj.panduo.com.cn/api/index',
      data: {
        dai_who_find: dai_who_find,
        keywords: that.data.keywords,
        total: 10,
        getkey: us_user_id_pass,
        page: that.data.page,
        date: that.data.date,
        level: that.data.level,
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
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')

    wx.request({
      url: 'http://cj.panduo.com.cn/api/index',
      data: {
        dai_who_find: dai_who_find,
        keywords: '',
        getkey: us_user_id_pass,
        page:that.data.page,
        date:that.data.date,
        level: that.data.level,
        total: 10
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
          url: 'http://cj.panduo.com.cn/api/index',
          data: {
            dai_who_find: dai_who_find,
            keywords: '',
            getkey: us_user_id_pass,
            page: that.data.page,
            date: that.data.date,
            level: that.data.level,
            total: 10
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