// pages/batch_deletion/batch_deletion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[
      { id: 1,order: 'XL492234', jianjie: '2019春季新款复古雪纺印花连衣裙V领长袖衬衫裙子长款女装' },
      { id: 2,order: 'XL492234', jianjie: '2019春季新款复古雪纺印花连衣裙V领长袖衬衫裙子长款女装' },
      { id: 1, order: 'XL492234', jianjie: '2019春季新款复古雪纺印花连衣裙V领长袖衬衫裙子长款女装'}
    ],
    checks_all: [
      { name: '1', value: '全选', checked:''}
    ]
  },
  // 点击全选
  check_all: function (e) {
    var that = this
    if (e.detail.value[0] == 1) {//全选
      that.data.array.forEach((item, index, arr) => {
        var checks = "array[" + index + "].checked"; //选中状态
        that.setData({
          [checks]: "true",
        })
      })
    } else {//全不选
      that.data.array.forEach((item, index, arr) => {
        var checks = "array[" + index + "].checked"; //选中状态
        that.setData({
          [checks]: "",
        })
      })
    }
  },
  checkboxChange(e) {
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