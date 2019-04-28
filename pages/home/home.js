// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[
      {
        name:'印花连衣裙',
        paragraph_nums:'3',
        user_name:'张倩文',
        grade:'一级',
        date:'2019/03/30'
      },
      {
        name: '印花连衣裙',
        paragraph_nums: '3',
        user_name: '张倩文',
        grade: '一级',
        date: '2019/03/30'
      }, 
      {
        name: '印花连衣裙',
        paragraph_nums: '3',
        user_name: '张倩文',
        grade: '一级',
        date: '2019/03/30'
      }
    ],
    time_arr:[ '时间','升序','降序'],
    time_arr_index:0,
    grade_arr: ['等级', '升序', '降序'],
    grade_arr_index:0,
    color_time:'',
    time_hui:'',
    time_true:'hidden',
    time_dao:'hidden',
    color_grade:'',
    grade_hui:'',
    grade_true:'hidden',
    grade_dao: 'hidden',
  },
  // 选择时间排列方式
  bindPicker_time(e) {
    console.log(e.detail.value)
    if (e.detail.value == 0){
      this.setData({
        color_time:'color2',
        time_hui: 'show',
        time_true: 'hidden',
        time_dao:'hidden',
        time_arr_index: e.detail.value
      })
    } else if(e.detail.value == 1){
      this.setData({
        color_time: 'color1',
        time_hui: 'hidden',
        time_true: 'show',
        time_dao: 'hidden',
        time_arr_index: e.detail.value
      })
    }else{
      this.setData({
        color_time: 'color1',
        time_hui: 'hidden',
        time_true: 'hidden',
        time_dao: 'show',
        time_arr_index: e.detail.value
      })
    }
  },
  // 选择等级排列方式
  bindPicker_grade(e) {
    if (e.detail.value == 0) {
      this.setData({
        color_grade: 'color2',
        grade_hui: 'show',
        grade_true: 'hidden',
        grade_dao: 'hidden',
        grade_arr_index: e.detail.value
      })
    } else if (e.detail.value == 1) {
      this.setData({
        color_grade: 'color1',
        grade_hui: 'hidden',
        grade_true: 'show',
        grade_dao: 'hidden',
        grade_arr_index: e.detail.value
      })
    }else{
      this.setData({
        color_grade: 'color1',
        grade_hui: 'hidden',
        grade_true: 'hidden',
        grade_dao: 'show',
        grade_arr_index: e.detail.value
      })
    }
  },
  details: function (options){
    wx.navigateTo({
      url: '../details/details',
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