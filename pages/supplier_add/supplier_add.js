// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sl_supplier_id: '',
    details: '',
    control: '',
    sl_supplier_name: '', //供应商名字
    sl_full_name: '', //供应商全名
    sl_linkman: '', //联系人
    sl_phone: '', //联系电话
    sl_address: '', //联系地址
    sl_homepage: '', //公司主页
    sl_email: '', //联系邮箱
    sl_memo: '', //备注
    exclamation: false, //感叹号
    supplier_word:false

  },
  sl_full_name: function(e) {
    this.setData({
      sl_full_name: e.detail.value
    })
  },
  sl_linkman: function(e) {
    this.setData({
      sl_linkman: e.detail.value
    })
  },
  sl_phone: function(e) {
    this.setData({
      sl_phone: e.detail.value
    })
  },
  sl_address: function(e) {
    this.setData({
      sl_address: e.detail.value
    })
  },
  sl_homepage: function(e) {
    this.setData({
      sl_homepage: e.detail.value
    })
  },
  sl_email: function(e) {
    this.setData({
      sl_email: e.detail.value
    })
  },
  sl_memo: function(e) {
    this.setData({
      sl_memo: e.detail.value
    })
  },
  sl_supplier_name: function (e) {
    this.setData({
      sl_supplier_name: e.detail.value
    })
  },


  //名字不重复
  sl_supplier_name: function(e) {
    var that = this
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/supplier/checksup',
      data: {
        sl_supplier_name: e.detail.value,
        dai_who_find: dai_who_find,
        getkey: us_user_id_pass,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.status == '0') {
          // console.log(res.data.status)
          that.setData({
            sl_supplier_name: e.detail.value,
            exclamation: true,
            supplier_word: true,
          })
          console.log(that.data.exclamation)
          console.log(that.data.supplier_word)
        }else{
          that.setData({
            sl_supplier_name: e.detail.value,
            exclamation: false,
            supplier_word: false
          })
        }
      }
    })
  },


  //保存并启用
  baocun: function() {
    var that = this
    wx.showLoading({
      title: '保存中',
    })
    if (that.data.details.sl_supplier_name == '') {
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else {
      var dai_who_find = wx.getStorageSync('us_user_id')
      var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      // console.log(that.data.sl_supplier_name)
      wx.request({
        url: 'https://cjtest.panduo.com.cn/api/new_products_infomation_input/supplier/insert',
        data: {
          dai_who_find: wx.getStorageSync('us_user_id'),
          getkey: us_user_id_pass,
          sl_supplier_name:that.data.sl_supplier_name ,
          sl_full_name: that.data.sl_full_name,
          sl_linkman: that.data.sl_linkman,
          sl_phone: that.data.sl_phone,
          sl_address: that.data.sl_address,
          sl_homepage: that.data.sl_homepage,
          sl_email: that.data.sl_email,
          sl_memo: that.data.sl_memo,
          control: 1
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.status == 0) {
            // that.setData({
            //   exclamation: true
            // })
            wx.showToast({
              title: '供应商不能为空',
              icon: 'none',
              duration: 2000,
              mask: true
            })
          } else if (res.data.status ==1 ) {
            // that.setData({
            //   exclamation: false
            // })
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
              mask: true
            })
          } else {
            // that.setData({
            //   exclamation: false
            // })
            wx.showToast({
              title: '保存成功',
              icon: 'none',
              duration: 2000,
              mask: true
            })
           
          }

        }
      })
    }
  },
  //保存并退出
  delete: function() {
    var that = this
    wx.showLoading({
      title: '保存中',
    })
    if (that.data.details.sl_supplier_name == '') {
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        duration: 2000,
        mask: true  
      })
    } else {
      var dai_who_find = wx.getStorageSync('us_user_id')
      var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      wx.request({
        url: 'https://cjtest.panduo.com.cn/api/new_products_infomation_input/supplier/insert',
        data: {
          dai_who_find: wx.getStorageSync('us_user_id'),
          getkey: us_user_id_pass,
          sl_supplier_name: that.data.sl_supplier_name,
          sl_full_name: that.data.sl_full_name,
          sl_linkman: that.data.sl_linkman,
          sl_phone: that.data.sl_phone,
          sl_address: that.data.sl_address,
          sl_homepage: that.data.sl_homepage,
          sl_email: that.data.sl_email,
          sl_memo: that.data.sl_memo,
          control: 0
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.status == 0) {
            wx.hideLoading()
            wx.showToast({
              title: '供应商不能为空',
              icon: 'none',
              duration: 2000,
              mask: true
            })
          } else if (res.data.status == 1) {
            wx.showToast({
              title: '供应商重复存在',
              icon: 'none',
              duration: 2000,
              mask: true
            })
          } else {
            wx.showToast({
              title: '保存成功',
              icon: 'none',
              duration: 2000,
              mask: true
            })
          }
          // wx.navigateBack({

          // })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})