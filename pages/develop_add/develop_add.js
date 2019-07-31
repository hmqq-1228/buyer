Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1: ['采购开发'],
    array2: [],
    index1: 0,
    index2: 1,
    select_check:false,
    shenqingren:'',
    zhaohuoren:'',
    us_user_names:[],
    // yanzheng:'',
    dai_who_finds: '',//找货人
    dai_who_apply: '',//开发申请人
    dai_level: '二级',//开发等级
    date: '',//期望完成时间
    dai_bill_id_:'',
    dadd_bill_id:'',
    datete:''
  },
  // 开发类型
  bindPickerChange1(e){
    this.setData({
      index1:0,
    })
  },
  // 开发等级
  bindPickerChange2(e){
    this.setData({
      dai_level: e.detail.value,
      dai_level: this.data.array2[e.detail.value].gc_name
    })
  },
  // 期望完成日期
  bindDateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  // 开发申请人
  shenqingren(e){
    var that = this
    if(e.detail.value.length > 0){
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
        shenqingren:e.detail.value,
        select_check: true
      })
    }else{
      this.setData({
        shenqingren:'',
        zhaohuoren: '',
        select_check: false
      })
    }
  },
  gonghao(event){
    var name = this.data.us_user_names[event.currentTarget.dataset.index].us_user_name
    // console.log(name)
    this.setData({
      shenqingren:name,
      zhaohuoren:name,
      select_check: false
    })
  },
  //点击保存验证
  btn1:function(options){
    var that = this
    if (this.data.shenqingren == '') {
      wx.showToast({
        title: '申请人不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (this.data.date == '') {
      wx.showToast({
        title: '期望完成日期不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (this.data.date <= new Date()){
      wx.showToast({
        title: '期望完成日期最早为第二天',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (this.data.array1 == ''){
      wx.showToast({
        title: '开发类型不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (this.data.dai_level == ''){
      wx.showToast({
        title: '开发等级不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else{
      var dai_who_find = wx.getStorageSync('us_user_id')
      var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      wx.request({
        url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/insert',
        data: {
          dai_who_find: dai_who_find,
          getkey: us_user_id_pass,
          dai_who_finds: that.data.zhaohuoren,
          dai_who_apply: that.data.zhaohuoren,
          dai_type:that.data.array1[0],
          // dai_type: that.data.dai_type,
          dai_level: that.data.dai_level,
          // dai_bill_id_: that.data.dai_bill_id_,
          dai_finish_date: that.data.date,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res){

          var dai_bill_id_ = res.data.data.dadd_bill_id
 
          console.log(dai_bill_id_)
          wx.reLaunch({
            url: '../develop_describe/develop_describe?dadd_bill_id=' + dai_bill_id_,
          })
          
        }
      })
    }
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
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    var dai_who_find = wx.getStorageSync('us_user_id')
    var shenqingren = wx.getStorageSync('us_user_name')
    var myDate = new Date()
    myDate.setTime(myDate.getTime() + 24 * 60 * 60 * 1000);
    var year = myDate.getFullYear()
    var month = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)
    var date1 = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
    this.setData({
      // date: '',
      date:year + '-' + month + '-' + date1,
      shenqingren: wx.getStorageSync('us_user_name'),
      zhaohuoren: wx.getStorageSync('us_user_name'),
      // zhaohuoren: '',
      // dai_type: gc_name,
      // dai_level:'',
      // dai_who_finds:'',
      // zhaohuoren:'',
      // shenqingren:''
    }),
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/get',
      data:{
        dai_who_find: wx.getStorageSync('us_user_id'),
        getkey: us_user_id_pass,
        // keyword: that.data.keyword,
      },
    header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log(res)
        that.setData({
          array2: res.data.data.dai_level,

        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.showToast({
      title: '保存成功',
      icon: 'none',
      duration: 1000,
      mask: true

    })
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