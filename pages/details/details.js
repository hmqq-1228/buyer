Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      {
        num: 'XL492234',
        jieshao: '2019春季新款复古雪纺印花连衣裙，X码...'
      },
      {
        num: 'XL492234',
        jieshao: '2019春季新款复古雪纺印花连衣裙，X码...'
      },
      {
        num: 'XL492234',
        jieshao: '2019春季新款复古雪纺印花连衣裙，X码...'
      }
    ],
    switch: 'hidden',
    check: 0,
    img_arr: ['/images/specimen.png']
  },
  menu_img: function() {
    if (this.data.check == 0) {

      this.setData({
        switch: 'show',
        check: 1
      })
    } else {
      this.setData({
        switch: 'hidden',
        check: 0
      })
    }
  },
  // 预览图片
  // handleImagePreview(e) {
  //   const images = this.data.img_arr
  //   wx.previewImage({
  //     current: images[0], //当前预览的图片
  //     urls: images, //所有要预览的图片
  //   })
  // },
  product: function(options) {
    wx.navigateTo({
      url: '../product/product',
    })
  },
  compile: function(options) {
    wx.navigateTo({
      url: '../compile/compile',
    })
  },
  delete_words: function(options) {
    wx.navigateTo({
      url: '../batch_deletion/batch_deletion',
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