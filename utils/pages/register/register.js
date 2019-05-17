const md5 = require('../../utils/md5.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    us_user_name:'',
    us_password:'',
    btn:'',
    util:'',
    items: [
      { name: '1', value: '记住密码', checked: '' },
    ],
    check:false,
    type:'password',
    type_check:0
  },
  checkboxChange(e) {
    if (e.detail.value == 1){
      this.setData({
        check: true
      })
    }else{
      this.setData({
        check: false
      })
    }
  },
  showPassword: function () {
    if (this.data.type_check == 0) {
      console.log('text')
      this.setData({
        type_check: 1,
        type: "text"
      })
    } else {
      console.log('password')
      this.setData({
        type_check: 0,
        type: "password"
      })
    }
  },
  username:function(e){
    this.setData({
      us_user_name:e.detail.value,

    })
  },
  password: function (e) {
    this.setData({
      us_password: e.detail.value
    })
  },
  btn: function (event) {
    var that = this
    wx.request({
      url: 'http://cj.panduo.com.cn/api/new_products_infomation_input/login',
      data: {
        us_user_name: that.data.us_user_name,
        us_password: that.data.us_password,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.status == 0){
          var util = md5.hexMD5(res.data.us_user_id + 'panduo2234!@#' + res.data.us_user_id)
          wx.setStorage({
            key: 'us_user_id_pass',
            data: util,
          })
          wx.setStorage({
            key: 'us_user_id',
            data: res.data.us_user_id,
          })
          wx.navigateTo({
            url: '../home/home',
          })
          if (that.data.check == 1) {
            wx.setStorage({
              key: 'us_password',
              data: that.data.us_password,
            })
          } else {
            wx.removeStorage({
              key: 'us_password',
              success: function (res) { },
            })
          }
          wx.setStorage({
            key: 'us_user_name',
            data: that.data.us_user_name,
          })
        } else if(res.data.status == 1){
          wx.showToast({
            title: '账号不存在',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        } else if (res.data.status == 2) {
          wx.showToast({
            title: '密码错误',
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
    var us_user_name = wx.getStorageSync('us_user_name')
    var us_password = wx.getStorageSync('us_password')
    var checked = 'items.[' + 0 + '].checked'
    if (us_user_name == '' && us_password == '') {
      that.setData({
        [checked]: '',
        check: 0,
        us_user_name: '',
        us_password: '',
      })
    } else if (us_user_name != '' && us_password == ''){
      that.setData({
        [checked]: '',
        check: 0,
        us_user_name: us_user_name,
        us_password: '',
      })
    }else{
      that.setData({
        [checked]: true,
        us_user_name: us_user_name,
        us_password: us_password,
        check: 1
      })
    }
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