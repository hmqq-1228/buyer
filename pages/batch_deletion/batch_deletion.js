// pages/batch_deletion/batch_deletion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    checks_all: [
      { name: '1', value: '全选', checked:''}
    ],
    dadd_desc_det:'',
    str:'',
    no_more: 'hidden',
    page:1
  },
  // 点击全选
  check_all: function (e) {
    var that = this
    if (e.detail.value[0] == 1) {//全选
      var str_ = ''
      that.data.array.forEach((item, index, arr) => {
        var checks = "array[" + index + "].checked"; //选中状态
        str_ += item.dard_reply_det+','
        that.setData({
          [checks]: "true",
          str: str_
        })
      })
    } else {//全不选
      that.data.array.forEach((item, index, arr) => {
        var checks = "array[" + index + "].checked"; //选中状态
        that.setData({
          [checks]: "",
          str:''
        })
      })
    }
  },
  checkboxChange(e) {
    var str = e.detail.value.join(',')
    this.setData({
      str: str,
    })
    console.log(this.data.str)
    var that = this
    var checked = "checks_all[0].checked"; //选中状态
    if (e.detail.value.length == that.data.array.length){
      that.setData({
        [checked]: "true",
      })
    }else{
      that.setData({
        [checked]: "",
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dadd_desc_det: options.dadd_desc_det
    })
  },
  // 确认删除
  delete:function(){
    var that = this
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/del',
      data: {
        str:that.data.str,
        getkey: us_user_id_pass,
        dai_who_find: dai_who_find,
        env: 'true'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
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
      no_more: 'hidden'
    })
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/dellist',
      data: {
        dadd_desc_det: this.data.dadd_desc_det,
        page: 1,
        total: 10,
        getkey: us_user_id_pass,
        dai_who_find: dai_who_find,
        env: 'true'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          array:res.data.data.data
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
    if (that.data.no_more == 'hidden') {
      that.setData({
        load: false,
        loading: true,//加载动画的显示
        page: that.data.page * 1 + 1,
      })
      var dai_who_find = wx.getStorageSync('us_user_id')
      var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      wx.request({
        url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/dellist',
        data: {
          dadd_desc_det: this.data.dadd_desc_det,
          page: that.data.page,
          total: 10,
          getkey: us_user_id_pass,
          dai_who_find: dai_who_find,
          env: 'true'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
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