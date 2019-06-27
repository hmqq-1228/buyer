// pages/supplier_compile/supplier_compile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked:'',
    sl_supplier_id:'',
    details:'',
    sl_supplier_name: '',//供应商名字
    sl_full_name: '',//供应商全名
    sl_linkman: '',//联系人
    sl_phone: '',//联系电话
    sl_address: '',//联系地址
    sl_homepage: '',//公司主页
    sl_email: '',//联系邮箱
    sl_memo: '',//备注
    // exclamation:false,//感叹号
  },
  sl_supplier_name:function(e){
    var sl_supplier_name = 'details.sl_supplier_name'
    this.setData({
      [sl_supplier_name]: e.detail.value
    })
  },
  sl_full_name:function(e){
    var sl_full_name = 'details.sl_full_name'
    this.setData({
      [sl_full_name]: e.detail.value
    })
  },
  sl_linkman: function (e) {
    var sl_linkman = 'details.sl_linkman'
    this.setData({
      [sl_linkman]: e.detail.value
    })
  },
  sl_phone: function (e) {
    var sl_phone = 'details.sl_phone'
    this.setData({
      [sl_phone]: e.detail.value
    })
  },
  sl_address: function (e) {
    var sl_address = 'details.sl_address'
    this.setData({
      [sl_address]: e.detail.value
    })
  },
  sl_homepage: function (e) {
    var sl_homepage = 'details.sl_homepage'
    this.setData({
      [sl_homepage]: e.detail.value
    })
  },
  sl_email: function (e) {
    var sl_email = 'details.sl_email'
    this.setData({
      [sl_email]: e.detail.value
    })
  },
  sl_memo: function (e) {
    var sl_memo = 'details.sl_memo'
    this.setData({
      [sl_memo]: e.detail.value
    })
  },
  //名字不重复
  // sl_supplier_name: function (e) {
  //   var that = this
  //   var dai_who_find = wx.getStorageSync('us_user_id')
  //   var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
  //   wx.request({
  //     url: 'http://cjtest.panduo.com.cn/api/new_products_infomation_input/supplier/checksups',
  //     data: {
  //       sl_supplier_name: e.detail.value,
  //       dai_who_find: dai_who_find,
  //       getkey: us_user_id_pass,
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success(res) {
  //       if (res.data.status == '0') {
  //         that.setData({
  //           exclamation: true
  //         })
  //         wx.showToast({
  //           title: res.data.msg,
  //           icon: 'none',
  //           duration: 2000,
  //           mask: true
  //         })
  //       } else {
  //         console.log(11111)
  //         that.setData({
  //           sl_supplier_name: e.detail.value,
  //           exclamation: false
  //         })
  //       }
  //     }
  //   })
  // },





  // 启用状态改变的时候
  changeSwitch1(e) {
    var sl_status = 'details.sl_status'
    this.setData({
      [sl_status]: e.detail.value == false ? 'X' : 'A'
    })
  },
  save:function(){
    var that  = this
    wx.showLoading({
      title: '保存中',
    })
    console.log(that.data.details)
    if (that.data.details.sl_supplier_name == '') {
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else{
      var dai_who_find = wx.getStorageSync('us_user_id')
      var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      wx.request({
        url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/supplier/update',
        data:{
          dai_who_find: wx.getStorageSync('us_user_id'),
          getkey: us_user_id_pass,
          sl_supplier_name: that.data.details.sl_supplier_name,
          sl_full_name: that.data.details.sl_full_name, 
          sl_linkman: that.data.details.sl_linkman,
          sl_phone: that.data.details.sl_phone,
          sl_address: that.data.details.sl_address,
          sl_homepage: that.data.details.sl_homepage,
          sl_email: that.data.details.sl_email,
          sl_memo: that.data.details.sl_memo,
          sl_supplier_id: that.data.details.sl_supplier_id,
          sl_status: that.data.details.sl_status,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res){
          wx.hideLoading()
          if (res.data.status == 1) {
            that.setData({
              exclamation: true
            })
            wx.showToast({
              title: '供应商已经存在',
              icon: 'none',
              duration: 2000,
              mask: true
            })
          } else if (res.data.status == 2) {
            that.setData({
              exclamation: false
            })
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
              mask: true
            })
          } else {
            that.setData({
              exclamation: false
            })
            wx.showToast({
              title: '修改成功',
              icon: 'none',
              duration: 2000,
              mask: true
            })
          }
        }
      })
      
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sl_supplier_id: options.sl_supplier_id
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
    // 编辑详情接口：
    var that = this
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    var dai_who_find = wx.getStorageSync('us_user_id')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/supplier/updatelist',
      data:{
        dai_who_find: wx.getStorageSync('us_user_id'),
        getkey: us_user_id_pass, 
        sl_supplier_id:that.data.sl_supplier_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        that.setData({
          details:res.data.data
        })
        if (res.data.data.sl_status == 'X') {
          that.setData({
            isChecked: false
          })
        } else {
          that.setData({
            isChecked: true
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