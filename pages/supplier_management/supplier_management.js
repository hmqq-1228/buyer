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
    keyword:'',
    sl_supplier_name:'',//供应商名字
    sl_full_name:'',//供应商全名
    sl_linkman:'',//联系人
    sl_phone:'',//联系电话
    sl_address:'',//联系地址
    sl_homepage:'',//公司主页
    sl_email:'',//联系邮箱
    sl_memo:'',//备注
  },
// 加号跳转添加页面
  go_supplier:function(){
    var that = this
    wx.navigateTo({
      url: '/pages/supplier_add/supplier_add',
    })
  },
  // 箭头跳转添加页面
  go_complie: function () {
    var that = this
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    var dai_who_find = wx.getStorageSync('us_user_id')
    wx.request({
      url: 'http://local.test.com/api/new_products_infomation_input/supplier/insert',
      data:{
        dai_who_find: wx.getStorageSync('us_user_id'),
        getkey: us_user_id_pass,
        env: 'false',
        keyword: that.data.keyword,
        sl_supplier_name: that.data.sl_supplier_name,
        sl_full_name: that.data.sl_full_name,
        sl_linkman: that.data.sl_linkman,
        sl_phone: that.data.sl_phone,
        sl_address: that.data.sl_address,
        sl_homepage: that.data.sl_homepage,
        sl_email: that.data.sl_email,
        sl_memo: that.data.sl_memo
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        
      }
    })
    // wx.navigateTo({
    //   url: '/pages/supplier_compile/supplier_compile',
    // })
  },
  // 搜索输入框失去焦点的时候
  
  //点击键盘上的搜索和搜索图标的时候
  search: function (e) {
    var that = this
    if (e.detail.value.length > 0) {
      this.setData({
        select: 'show',
        sl_supplier_name: e.detail.value
      })
      var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      var dai_who_find = wx.getStorageSync('us_user_id')
      wx.request({
        url: 'http://local.test.com/api/new_products_infomation_input/supplier/searchlist',
        data: {
          dai_who_find: wx.getStorageSync('us_user_id'),
          getkey: us_user_id_pass,
          env: 'false',
          keyword: that.data.keyword,
          sl_supplier_name: that.data.sl_supplier_name
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
    } else {
      this.setData({
        select: 'hidden',
        sl_supplier_name: ''
      })
    }

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
    wx.request({
      url: 'http://local.test.com/api/new_products_infomation_input/supplier/search',
      data:{
        dai_who_find: wx.getStorageSync('us_user_id'),
        getkey: us_user_id_pass,
        env: 'false',
        keyword: that.data.keyword,
        sl_supplier_name: that.data.sl_supplier_name
      },
       header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        that.setData({

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