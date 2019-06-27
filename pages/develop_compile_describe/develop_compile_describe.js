Page({

  /**
   * 页面的初始数据
   */
  data: {
    index1: 0,
    index2: 0,
    images: [], //存放图片的数组
    images_arr: [],
    select_check: false,
    details: '',
    shenheren: '',
    chanpinxian: '',
    yuguxian: '',
    dadd_prod_desc: '', //产品描述
    dadd_need_qty: '', //需求款数
    pc_class_name: '', //预估产品线的名字
    dadd_find_mode: '拿货开发', //找货模式
    dadd_desc_det: '', //任务编号
    dai_bill_id_: '',
    dadd_prod_pic_path: '',
    dadd_prod_no_easter: '', //复活产品编号
    dadd_bill_ids: '',
    supplier_val: '', //预估产品线的名字
    checks: 0,
    us_user_name: '',
  },

  // 开发申请人
  yuguxian(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        yuguxian: e.detail.value,
        select_check: true
      })
    } else {
      this.setData({
        select_check: false
      })
    }
  },
  //点击添加上传图片
  chooseImage: function(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log('666666666', res)
        if (this.data.images.length <= 2) {
          const images = this.data.images.concat(res.tempFilePaths)
          // 限制最多只能留下2张照片
          this.setData({
            checks: 1,
            images: images
          })
          console.log('77777777', images)
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
  delete: function() {

  },
  dadd_prod_desc: function(e) {
    this.setData({
      dadd_prod_desc: e.detail.value
    })
  },
  dadd_need_qty: function(e) {
    this.setData({
      dadd_need_qty: e.detail.value
    })
  },
  //模糊查询
  pc_class_name: function(e) {
    var that = this
    if (e.detail.value.length > 0) {
      that.setData({
        select: 'show',
        dard_supplier_id: e.detail.value,
        supplier_val: e.detail.value
      })
      var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      var dai_who_find = wx.getStorageSync('us_user_id')
      wx.request({
        url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/getclass',
        data: {
          keyword: e.detail.value,
          dai_who_find: dai_who_find,
          getkey: us_user_id_pass,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data.data)
          that.setData({
            select_arr: res.data.data
          })
        }
      })
    } else {
      that.setData({
        select: 'hidden',
        dard_supplier_id: '',
        supplier_val: ''
      })
    }
  },

  supplier_val: function(event) {
    var name = this.data.select_arr[event.currentTarget.dataset.index].pc_class_name
    this.setData({
      supplier_val: name,
      dard_supplier_id: name,
      shenheren: name,
      select: 'hidden'
    })
  },
  dadd_find_mode: function(e) {
    this.setData({
      dadd_find_mode: e.detail.value
    })
  },
  dadd_desc_det: function(e) {
    this.setData({
      dadd_desc_det: e.detail.value
    })
  },
  dadd_prod_no_easter: function(e) {
    this.setData({
      dadd_prod_no_easter: e.detail.value
    })
  },

  //点击删除
  delete: function() {
    var that = this
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/del',
      data: {
        dai_who_find: dai_who_find,
        getkey: us_user_id_pass,
        dadd_desc_det: that.data.dadd_desc_det,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // wx.showToast({
        //   title: '删除成功',
        //   icon: 'none',
        //   duration: 2000,
        //   mask: true
        // })
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  supplier_val: function(event) {
    var name = this.data.select_arr[event.currentTarget.dataset.index].pc_class_name
    this.setData({
      supplier_val: name,
      dard_supplier_id: name,
      shenheren: name,
      select: 'hidden'
    })
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    var dai_who_find = wx.getStorageSync('us_user_id')
    var that = this

    wx.request({
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/getss',
      data: {
        dai_who_find: dai_who_find,
        getkey: us_user_id_pass,
        pc_prod_class: that.data.supplier_val
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          us_user_name: res.data.data[0].us_user_name
        })

      }
    })
  },
  //点击保存
  baocun: function() {
    var that = this
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    if (that.data.dadd_prod_desc == '') {
      wx.showToast({
        title: '产品描述不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.supplier_val == '') {
      wx.showToast({
        title: '预估产品线不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.dadd_need_qty == '') {
      wx.showToast({
        title: '需求款数不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else{
      if (that.data.images.length > 0) {
        var img_arrs = [];
        for (var i = 0; i < that.data.images.length; i++) {
          wx.getImageInfo({
            src: that.data.images[i],
            success(res) {
              wx.uploadFile({
                url: 'https://cj.panduo.com.cn/api/upload',
                filePath: res.path,
                name: 'dard_prod_pic_path',
                formData: {
                  dard_bill_id: that.data.dadd_bill_ids,
                  getkey: us_user_id_pass,
                  directory_name: 'NEW_PROD_REPLY_PIC',
                },
                success: function (res) {
                  var jsonObj = JSON.parse(res.data);
                  // console.log('jsonObj.data', that.data.dadd_bill_ids)
                  // console.log('jsonObj.data22', res)
                  img_arrs.push(jsonObj.data.imgsname);
                  that.setData({
                    img_strs: img_arrs
                  });
                  if (that.data.images.length == that.data.img_strs.length) {
                    var img_str = that.data.img_strs.join(":") + ':'
                    wx.request({
                      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/updates',
                      data: {
                        dai_who_find: dai_who_find,
                        getkey: us_user_id_pass,
                        dadd_desc_det: that.data.dadd_desc_det,
                        dadd_prod_desc: that.data.dadd_prod_desc,
                        dadd_need_qty: that.data.dadd_need_qty,
                        pc_class_name: that.data.supplier_val,
                        dadd_find_mode: that.data.dadd_find_mode,
                        dadd_prod_pic_path: img_str,
                        dadd_prod_no_easter: that.data.dadd_prod_no_easter,

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
                        
                        
                        // wx.navigateTo({

                        //   url: '/pages/develop_compile/develop_compile?dadd_desc_det=' + that.data.dadd_desc_det,
                        // })
                      }
                    })
                  }
                }
              })
            }
          })

        }
      } else {
        wx.request({
          url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/updates',
          data: {
            dai_who_find: dai_who_find,
            getkey: us_user_id_pass,
            dadd_desc_det: that.data.dadd_desc_det,
            dadd_prod_desc: that.data.dadd_prod_desc,
            dadd_need_qty: that.data.dadd_need_qty,
            pc_class_name: that.data.supplier_val,
            dadd_find_mode: that.data.dadd_find_mode,
            dadd_prod_pic_path: '',
            dadd_prod_no_easter: that.data.dadd_prod_no_easter,

          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            if (res.data.data.status == '0') {
              wx.showToast({
                title: '该产品线不存在！',
                icon: 'none',
                duration: 2000,
                mask: true
              })
            } else if (res.data.data.status == '1') {
              wx.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 2000,
                mask: true
              })
              wx.navigateBack({
                delta: 1
              })
            }
           
            // wx.navigateTo({

            //   url: '/pages/develop_compile/develop_compile?dadd_desc_det=' + that.data.dadd_desc_det,
            // })
          }
        })
      }
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      dadd_desc_det: options.dadd_desc_det,
    })
    //console.log(options)
    var myDate = new Date();
    var y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var m = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    var d = myDate.getDate() + 1; //获取当前日(1-31)
    this.setData({
      date: y + '-' + m + '-' + d,
      shenqingren: wx.getStorageSync('us_user_name')
    })
    var that = this
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
      url: 'https://cj.panduo.com.cn/api/new_products_infomation_input/new/updatelists',
      data: {
        dai_who_find: dai_who_find,
        getkey: us_user_id_pass,
        dadd_desc_det: that.data.dadd_desc_det,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log('888888', res)
        var dadd_bill_ids = res.data.data.dadd_bill_id
        that.setData({
          dadd_prod_desc: res.data.data.dadd_prod_desc,
          supplier_val: res.data.data.pc_class_name,
          shenheren: res.data.data.pc_class_name,
          us_user_name: res.data.data.us_user_name,
          dadd_need_qty: res.data.data.dadd_need_qty,
          images_arr: res.data.data.dadd_prod_pic_path,
          dadd_bill_ids: res.data.data.dadd_bill_id
        })
        if (res.data.data.dadd_prod_pic_path != null) {
          var len = res.data.data.dadd_prod_pic_path.length
          var dadd_prod_pic_path_ = res.data.data.dadd_prod_pic_path.substring(0, len - 1).split(':');
          that.setData({
            images: dadd_prod_pic_path_
          })
          that.data.images.forEach(function(item, index, arr) {
            var item_ = "https://cjimage.panduo.com.cn/upload/NEW_PROD_REPLY_PIC/" + dadd_bill_ids + '/' + item
            var items = "images[" + index + "]";
            that.setData({
              checks: 1,
              [items]: item_
            })
          })
        } else {
          that.setData({
            images: []
          })
        }
      },
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