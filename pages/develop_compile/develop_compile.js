Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1: ['销售开发','运营开发','采购开发'],
    array2: ['一级', '二级', '三级', ],
    index1: '',
    index2: '',
    date: '',
    array: [],
    ifName: false,
    select_check: false,
    no_more: 'hidden',
    zanwu: 'hidden',
    shenqingren: '',
    dadd_bill_id: '',
    dai_bill_id: '',
    dai_finish_date: '', //期望完成日期
    dai_level: '', //等级
    dai_type: '', //类型
    dai_who_apply: '', //找货人
    dai_who_find: '', //开发申请人
    dadd_desc_det: '',
    dadd_prod_desc: ''
  },


  dai_who_apply: function(e) {
    this.setData({
      dai_who_apply: e.detail.value
    })
  },

  // 开发类型
  bindPickerChange1(e) {
    var index = this.data.index1
    this.setData({
      index1: e.detail.value
    })
  },
  // 开发等级
  bindPickerChange2(e) {
    var index = this.data.index2
    this.setData({
      index2: e.detail.value
    })
  },
  // 期望完成日期
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 开发申请人
  shenqingren(e) {
    var that = this
    if (e.detail.value.length > 0) {
      var dai_who_find = wx.getStorageSync('us_user_id')
      var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      wx.request({
        url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/gets',
        data: {
          dai_who_find: dai_who_find,
          keyword: e.detail.value,
          getkey: us_user_id_pass,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          that.setData({
            us_user_names: res.data.data
          })
        }
      })
      this.setData({
        zhaohuoren: e.detail.value,
        shenqingren: e.detail.value,
        select_check: true
      })
    } else {
      this.setData({
        shenqingren: '',
        zhaohuoren: '',
        select_check: false
      })
    }
  },
  gonghao(event) {
    var name = this.data.us_user_names[event.currentTarget.dataset.index].us_user_name
    // console.log(name)
    this.setData({
      shenqingren: name,
      zhaohuoren: name,
      select_check: false
    })
  },
  //编辑跳转

  compile: function(event) {
    var dadd_desc_det = this.data.array[event.currentTarget.dataset.index].dadd_desc_det
    wx.navigateTo({
      url: '/pages/develop_compile_describe/develop_compile_describe?dadd_desc_det=' + dadd_desc_det,
    })
  },

  //添加描述
  product: function() {
    var dai_bill_id_ = this.data.dadd_bill_id
    wx.navigateTo({
      url: '/pages/develop_describe/develop_describe?dadd_bill_id=' + dai_bill_id_,
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      dadd_bill_id: options.dadd_bill_id
    })
  },
  submit: function() {
    this.setData({
      ifName: !this.data.ifName
    })
  },
  setValue: function(e) {
    this.setData({
      summary_content: e.detail.value
    })
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
    var that = this
    //console.log(options)
    // var myDate = new Date();
    // var y = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    // var m = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
    // var d = myDate.getDate()+1;        //获取当前日(1-31)
    this.setData({
      // date: '',
      // date: y + '-' + m + '-' + d,
      shenqingren: wx.getStorageSync('us_user_name')
    })
    
    // wx.showLoading({
    //   title: '加载中',
    // })
    that.setData({
      no_more: 'hidden',
      page: 1
    })
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/updatelist',
      data: {
        dai_who_find: dai_who_find,
        getkey: us_user_id_pass,
        dai_bill_id: that.data.dadd_bill_id,

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.data[0][0].dai_type == 'A') {
          that.setData({
            index1: 0
          })
        } else if (res.data.data[0][0].dai_type == 'B') {
          that.setData({
            index1: 1
          })
        } else if (res.data.data[0][0].dai_type == 'C') {
          that.setData({
            index1: 2
          })
        }
        if (res.data.data[0][0].dai_level == 'A') {
          that.setData({
            index2: 0
          })
        } else if (res.data.data[0][0].dai_level == 'B') {
          that.setData({
            index2: 1
          })
        } else if (res.data.data[0][0].dai_level == 'C') {
          that.setData({
            index2: 2
          })
        }
        that.setData({
          date: res.data.data[0][0].dai_finish_date,
          zhaohuoren: res.data.data[0][0].apply_name,
          array: res.data.data[1]

        })
      },
    })
  },






  default: function() {
    var that = this
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/update',
      data: {
        dai_who_find: dai_who_find,
        getkey: us_user_id_pass,
        dai_type: that.data.array1[that.data.index1],
        dai_level: that.data.array2[that.data.index2],
        dai_who_apply: that.data.shenqingren,
        dai_who_finds: that.data.shenqingren,
        dai_bill_id: that.data.dadd_bill_id,
        dai_finish_date: that.data.date,

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.showToast({
          title: '保存成功',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        // wx.navigateBack({
        //   delta: 1
        // })
        // wx.navigateTo({
        //   url: '/pages/develop_describe/develop_describe?dai_bill_id_=' + that.data.dadd_bill_id,
        // })
        wx.navigateTo({
          url: '/pages/develop/develop' ,
        })
      }
    })
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})