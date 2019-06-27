// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    time_hui: 'hidden',
    time_zheng: 'show',
    grade_hui: 'hidden',
    grade_zheng: 'show',
    time_check: 1,
    grade_check: 1,
    menu: 0, //菜单
    keyword: '',
    date: 1, //时间
    level: '', //等级
    page: 1, //页数
    gc_name: '',
    switch: 'hidden',
    check_menu: 0,
    no_more: 'hidden',
    dai_bill_id: '',
    dadd_desc_det: '',
    dai_level: [],
    dai_levels: [],
    dai_status: [],
    aaa: []
  },
  // 点击等级
  grade: function() {
    var that = this
    console.log(this.data)
    if (this.data.grade_check == 0) { //降序
      this.setData({
        grade_hui: 'show',
        grade_zheng: 'hidden',
        grade_check: 1,
        no_more: 'hidden',
        page: 1,
        level: 2,
        date: ''
      })
    } else { //升序
      this.setData({
        grade_hui: 'hidden',
        grade_zheng: 'show',
        grade_check: 0,
        page: 1,
        no_more: 'hidden',
        level: 1,
        date: ''
      })
    }
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/index',
      data: {
        dai_who_find: dai_who_find,
        keyword: that.data.keyword,
        page: 1,
        date: that.data.date,
        level: that.data.level,
        getkey: us_user_id_pass,
        total: 10,

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        for (let dai_levels of res.data.data.data) {
          if (dai_levels.dai_level == 'A') {
            dai_levels.level_str = '一级'
          } else if (dai_levels.dai_level == 'B') {
            dai_levels.level_str = '二级'
          } else if (dai_levels.dai_level == 'C') {
            dai_levels.level_str = '三级'
          }
          if (dai_levels.dai_status == 'A') {
            dai_levels.active_str = '活动'
          } else if (dai_levels.dai_status == 'N') {
            dai_levels.active_str = '新建'
          } else if (dai_levels.dai_status == 'X') {
            dai_levels.active_str = '删除'
          }
          that.data.aaa = dai_levels.dai_status
        }
        that.setData({
          array: res.data.data.data,

        })
      }
    })
  },
  // 点击时间
  time: function() {
    var that = this
    if (this.data.time_check == 1) { //降序
      this.setData({
        time_hui: 'hidden',
        time_zheng: ' show',
        time_check: 0,
        page: 1,
        date: 2,
        no_more: 'hidden',
        level: '',
      })
    } else { //升序
      this.setData({
        time_hui: 'show',
        time_zheng: 'hidden',
        time_check: 1,
        page: 1,
        no_more: 'hidden',
        date: 1,
        level: '',
      })
    }
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/index',
      data: {
        dai_who_find: dai_who_find,
        keyword: that.data.keyword,
        page: 1,
        date: that.data.date,
        level: that.data.level,
        total: 10,
        getkey: us_user_id_pass,

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        for (let dai_levels of res.data.data.data) {
          if (dai_levels.dai_level == 'A') {
            dai_levels.level_str = '一级'
          } else if (dai_levels.dai_level == 'B') {
            dai_levels.level_str = '二级'
          } else if (dai_levels.dai_level == 'C') {
            dai_levels.level_str = '三级'
          }
          if (dai_levels.dai_status == 'A') {
            dai_levels.active_str = '活动'
          } else if (dai_levels.dai_status == 'N') {
            dai_levels.active_str = '新建'
          } else if (dai_levels.dai_status == 'X') {
            dai_levels.active_str = '删除'
          }
          that.data.aaa = dai_levels.dai_status
        }
        that.setData({
          array: res.data.data.data,
          no_more: 'hidden',
        })
      }
    })
  },
  details: function(event) {
    var dadd_bill_id = this.data.array[event.currentTarget.dataset.index].dai_bill_id
    var dai_status = this.data.array[event.currentTarget.dataset.index].dai_status
    if (dai_status == 'N') {
      wx.navigateTo({
        url: '/pages/develop_compile/develop_compile?dadd_bill_id=' + dadd_bill_id,
      })
    }
  },
  //跳转退回页面
  send_back: function() {
    var dadd_bill_id_ = this.data.array
    for (let qrId of dadd_bill_id_) {
      var dadd_bill_id = qrId.dai_bill_id
    }
    console.log(dadd_bill_id)
    wx.navigateTo({
      url: '/pages/send_back/send_back?dadd_bill_id=' + dadd_bill_id,
    })
  },
  //删除跳转
  delete: function() {
    var dadd_bill_id_ = this.data.array
    for (let qrId of dadd_bill_id_) {
      var dadd_bill_id = qrId.dai_bill_id
    }
    console.log(dadd_bill_id)
    wx.navigateTo({
      url: '/pages/delete/delete?dadd_bill_id=' + dadd_bill_id,
    })
  },
  //审核跳转确认
  check: function() {
    var dadd_bill_id_ = this.data.array
    for (let qrId of dadd_bill_id_) {
      var dadd_bill_id = qrId.dai_bill_id
    }
    console.log(dadd_bill_id)
    wx.navigateTo({
      url: '/pages/affirm/affirm?dadd_bill_id=' + dadd_bill_id,
    })
  },
  // 搜索输入框失去焦点的时候
  change_search: function(e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  //点击键盘上的搜索和搜索图标的时候
  search: function(e) {
    var that = this
    this.setData({
      page: 1
    })
    console.log(that.data.keyword)
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/find',
      data: {
        dai_who_find: dai_who_find,
        keyword: that.data.keyword,
        total:10,
        getkey: us_user_id_pass,
        page: 1,
        date: that.data.date,
        level: that.data.level,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        for (let dai_levels of res.data.data) {
          if (dai_levels.dai_level == 'A') {
            dai_levels.level_str = '一级'
          } else if (dai_levels.dai_level == 'B') {
            dai_levels.level_str = '二级'
          } else if (dai_levels.dai_level == 'C') {
            dai_levels.level_str = '三级'
          }
          if (dai_levels.dai_status == 'A') {
            dai_levels.active_str = '活动'
          } else if (dai_levels.dai_status == 'N') {
            dai_levels.active_str = '新建'
          } else if (dai_levels.dai_status == 'X') {
            dai_levels.active_str = '删除'
          }
          that.data.aaa = dai_levels.dai_status
        }
        that.setData({
          array: res.data.data,
          no_more: 'hidden',
        })
      }
    })
  },
  cancel: function() {
    this.setData({
      keyword: ''
    })
  },
  // 输入内容
  search_img(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        select: true,
        keyword: e.detail.value
      })
    } else {
      this.setData({
        select: false
      })
    }
  },
  //菜单
  menu: function() {
    if (this.data.check_menu == 0) {
      this.setData({
        switch: 'show',
        check_menu: 1
      })
    } else {
      this.setData({
        switch: 'hidden',
        check_menu: 0
      })
    }
  },
  //添加跳转
  add: function() {
    wx.navigateTo({
      url: '/pages/develop_add/develop_add',
    })
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
    var that = this
   
    that.setData({
      switch: 'hidden',
      check_menu: 0,
      no_more: 'hidden',
      page: 1,
      time_hui: 'hidden',
      time_zheng: 'show',
      grade_hui: 'hidden',
      grade_zheng: 'show',
      time_check: 0,
      grade_check: 0,
      menu: 0, //菜单
      keyword: ''
    })
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/index',
      data: {
        dai_who_find: dai_who_find,
        keyword: '',
        getkey: us_user_id_pass,
        page: 1,
        date: 1,
        // level: 0,
        total: 10,

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        for (let dai_levels of res.data.data.data) {
          if (dai_levels.dai_level == 'A') {
            dai_levels.level_str = '一级'
          } else if (dai_levels.dai_level == 'B') {
            dai_levels.level_str = '二级'
          } else if (dai_levels.dai_level == 'C') {
            dai_levels.level_str = '三级'
          }
          if (dai_levels.dai_status == 'A') {
            dai_levels.active_str = '活动'
          } else if (dai_levels.dai_status == 'N') {
            dai_levels.active_str = '新建'
          } else if (dai_levels.dai_status == 'X') {
            dai_levels.active_str = '删除'
          }
          that.data.aaa = dai_levels.dai_status
        }
        if (res.data.status > 0) {
          that.setData({
            array: res.data.data.data
          })
        }
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
      keyword: ''
    })
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')

    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/index',
      data: {
        dai_who_find: dai_who_find,
        keyword: '',
        getkey: us_user_id_pass,
        page: 1,
        date: '',
        level: 0,
        total: 10,

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log('777', res)
        for (let dai_levels of res.data.data.data) {
          console.log('888', dai_levels)
          if (dai_levels.dai_level == 'A') {
            dai_levels.level_str = '一级'
          } else if (dai_levels.dai_level == 'B') {
            dai_levels.level_str = '二级'
          } else if (dai_levels.dai_level == 'C') {
            dai_levels.level_str = '三级'
          }
          if (dai_levels.dai_status == 'A') {
            dai_levels.active_str = '活动'
          } else if (dai_levels.dai_status == 'N') {
            dai_levels.active_str = '新建'
          } else if (dai_levels.dai_status == 'X') {
            dai_levels.active_str = '删除'
          }
          that.data.aaa = dai_levels.dai_status
        }
        that.setData({
          array: res.data.data.data
        })
      }
    })
    //模拟加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    if (that.data.no_more == 'hidden') {
      that.setData({
        load: false,
        loading: true, //加载动画的显示
        page: that.data.page * 1 + 1,
      })
      var dai_who_find = wx.getStorageSync('us_user_id')
      var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      wx.request({
        url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/index',
        data: {
          dai_who_find: dai_who_find,
          keyword: '',
          getkey: us_user_id_pass,
          page: that.data.page,
          date: that.data.date,
          level: that.data.level,
          total: 10,

        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          for (let dai_levels of res.data.data.data) {
            // console.log(dai_levels.dai_level)
            if (dai_levels.dai_level == 'A') {
              console.log(111, dai_levels)
              dai_levels.level_str = '一级'
            } else if (dai_levels.dai_level == 'B') {
              dai_levels.level_str = '二级'
            } else if (dai_levels.dai_level == 'C') {
              dai_levels.level_str = '三级'
            }
            if (dai_levels.dai_status == 'A') {
              console.log(111, dai_levels)
              dai_levels.active_str = '活动'
            } else if (dai_levels.dai_status == 'N') {
              dai_levels.active_str = '新建'
            } else if (dai_levels.dai_status == 'X') {
              dai_levels.active_str = '删除'
            }
          }
          var content = that.data.array.concat(res.data.data.data) //将放回结果放入content
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
  onShareAppMessage: function() {

  }
})