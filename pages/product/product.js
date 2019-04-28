Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [], //存放图片的数组
    supplier: ['供应商'],
    supplier_index: 0,
    color: ['颜色'],
    color_index: 0,
    material:['材质'],
    material_index: 0,
    mode: ['采购方式：拿货'],
    mode_index: 0,
  },
  // 供应商
  bindPicker_supplier(e) {
    this.setData({
      supplier_index: e.detail.value
    })
  },
  // 颜色
  bindPicker_color(e) {
    this.setData({
      color_index: e.detail.value
    })
  },
  // 材质
  bindPicker_material(e) {
    this.setData({
      material_index: e.detail.value
    })
  },
  // 采购方式：拿货
  bindPicker_mode(e) {
    this.setData({
      mode_index: e.detail.value
    })
  },
  //点击添加上传图片
  chooseImage: function (e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        if (this.data.images.length <= 2) {
          const images = this.data.images.concat(res.tempFilePaths)
          // 限制最多只能留下2张照片
          this.setData({
            images: images
          })
        } else {
          wx.showToast({
            title: '最多只能选择三张照片',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      }
    })
  },
  // 删除图片
  removeImage(e) {
    const idx = e.target.dataset.idx;
    console.log(e.target.dataset.idx);
    this.data.images.splice(idx, 1);
    var del_image = this.data.images;
    this.setData({
      images: del_image
    })
  },
  // 预览图片
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
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