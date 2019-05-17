Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [], //存放图片的数组
    select_arr: [],
    select_arr: [],
    select: 'hidden',
    supplier_val: '',
    unit: [],
    unit_index: 0,
    mode: ['拿货', '定制'],
    mode_index: 0,
    dard_sup_no: '', //供货方号
    dard_supp_unit: '',//供货单位
    dard_prod_name: '', //商品名称
    dard_supplier_id: '', //供应商
    dard_material: '', //材质
    dard_color: '', //颜色 
    dard_buy_price: '', //采购单价
    dard_buy_style: '', //采购方式
    dard_min_order: '', //最小起订量
    dard_order_days: '', //供货周期
    dard_convers_cnt: '', //转换基数
    dard_purchase_memo: '', //采购备注
    dard_reply_det:'',//编号
    details:'',//详情数据
    checks:0,
    dard_bill_ids:''
  },
  select: function (e) {
    var that = this
    if (e.detail.value.length > 0) {
      this.setData({
        select: 'show',
        dard_supplier_id: e.detail.value
      })
      var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      var dai_who_find = wx.getStorageSync('us_user_id')
      wx.request({
        url: 'http://cj.panduo.com.cn/api/new_products_infomation_input/find',
        data: {
          keyword: e.detail.value,
          getkey: us_user_id_pass,
          dai_who_find: dai_who_find,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          that.setData({
            select_arr: res.data.data
          })
        }
      })
    } else {
      this.setData({
        select: 'hidden'
      })
    }

  },
  supplier_val: function (event) {
    var name = this.data.select_arr[event.currentTarget.dataset.index].sl_supplier_name
    var dard_supplier_id = 'details.dard_supplier_id'
    this.setData({
      [dard_supplier_id]: name
    })
  },
  // 供方单位
  bindPicker_unit(e) {
    var dard_supp_unit = 'details.dard_supp_unit'
    this.setData({
      unit_index: e.detail.value,
      [dard_supp_unit]: this.data.unit[e.detail.value].gc_name
    })
  },
  // 采购方式：拿货
  bindPicker_mode(e) {
    var dard_buy_style = 'details.dard_buy_style'
    this.setData({
      mode_index: e.detail.value,
      [dard_buy_style]: this.data.mode[e.detail.value]
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
          // 限制最多只能留下3张照片
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
    console.log(images, '-------------', idx)
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },

  //供货方号
  supply_blur: function (e) {
    var dard_sup_no = 'details.dard_sup_no'
    this.setData({
      [dard_sup_no]: e.detail.value
    })
  },
  //商品名称
  name: function (e) {
    var dard_prod_name = 'details.dard_prod_name'
    this.setData({
      [dard_prod_name]: e.detail.value
    })
  },
  //供应商
  supplier: function (e) {
    var dard_supplier_id = 'details.dard_supplier_id'
    this.setData({
      [dard_supplier_id]: e.detail.value,
      select: 'hidden',
    })
  },
  //颜色
  color: function (e) {
    var dard_color = 'details.dard_color'
    this.setData({
      [dard_color]: e.detail.value
    })
  },
  //材质
  texture: function (e) {
    var dard_material = 'details.dard_material'
    this.setData({
      [dard_material]: e.detail.value
    })
  },
  //采购单价
  purchase_price: function (e) {
    var dard_buy_price = 'details.dard_buy_price'
    this.setData({
      [dard_buy_price]: e.detail.value
    })
  },
  //最小起订量
  moq: function (e) {
    var dard_min_order = 'details.dard_min_order'
    this.setData({
      [dard_min_order]: e.detail.value
    })
  },
  //供货周期
  delivery_cycle: function (e) {
    var dard_order_days = 'details.dard_order_days'
    this.setData({
      [dard_order_days]: e.detail.value
    })
  },
  //转换基数
  zhjs: function (e) {
    var dard_convers_cnt = 'details.dard_convers_cnt'
    this.setData({
      [dard_convers_cnt]: e.detail.value
    })
  },
  //采购备注
  note: function (e) {
    var dard_purchase_memo = 'details.dard_purchase_memo'
    this.setData({
      [dard_purchase_memo]: e.detail.value
    })
  },
  //删除
  delete: function () {
    var that = this
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'http://cj.panduo.com.cn/api/new_products_infomation_input/delete',
      data: {
        dard_reply_det: that.data.dard_reply_det,
        getkey: us_user_id_pass,
        dai_who_find: dai_who_find,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  // 保存并继续
  baocun: function () {
    var that = this
    var img_str = that.data.images.join(";");
    if (that.data.details.dard_sup_no == '') {
      wx.showToast({
        title: '供货方号不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_supp_unit == '') {
      wx.showToast({
        title: '供货单位不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_prod_name == '') {
      wx.showToast({
        title: '商品名称不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (img_str == '') {
      wx.showToast({
        title: '图片不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_supplier_id == '') {
      wx.showToast({
        title: '供应商不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_color == '') {
      wx.showToast({
        title: '颜色不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_material == '') {
      wx.showToast({
        title: '材质不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_buy_price == '') {
      wx.showToast({
        title: '采购单价不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_buy_price <= 0) {
      wx.showToast({
        title: '采购单价不能小于0',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_buy_style == '') {
      wx.showToast({
        title: '采购方式不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_min_order == '') {
      wx.showToast({
        title: '最小起订量不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_min_order <= 0) {
      wx.showToast({
        title: '最小起订量不能小于0',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_order_days == '') {
      wx.showToast({
        title: '供货周期不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_order_days <= 0) {
      wx.showToast({
        title: '供货周期不能小于0',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (that.data.details.dard_convers_cnt == '') {
      wx.showToast({
        title: '转换基数不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })

    } else if (that.data.details.dard_convers_cnt <= 0) {
      wx.showToast({
        title: '转换基数不能小于0',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else {
      var img_arrs = [];
      var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      for (var i = 0; i < that.data.images.length; i++) {
        wx.uploadFile({
          url: 'http://cj.panduo.com.cn/api/upload',
          filePath: that.data.images[i],
          name: 'dard_prod_pic_path',
          formData: {
            dard_bill_id: that.data.dadd_bill_id,
            getkey: us_user_id_pass,
          },
          success: function (res) {
            var jsonObj = JSON.parse(res.data);
            img_arrs.push(jsonObj.data.imgsname);
            that.setData({
              img_strs: img_arrs
            });
            if (that.data.images.length == that.data.img_strs.length) {
              var img_str = that.data.img_strs.join(",")
              var dai_who_find = wx.getStorageSync('us_user_id')
              var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
              wx.request({
                url: 'http://cj.panduo.com.cn/api/new_products_infomation_input/update',
                method: 'POST',
                data: {
                  dard_reply_det: that.data.dard_reply_det,
                  dard_sup_no: that.data.details.dard_sup_no,
                  dard_supp_unit: that.data.details.dard_supp_unit,
                  dard_prod_name: that.data.details.dard_prod_name,
                  dard_prod_pic_path: img_str,
                  dard_supplier_id: that.data.details.dard_supplier_id,
                  dard_material: that.data.details.dard_material,
                  dard_color: that.data.details.dard_color,
                  dard_buy_price: that.data.details.dard_buy_price,
                  dard_buy_style: that.data.details.dard_buy_style,
                  dard_min_order: that.data.details.dard_min_order,
                  dard_order_days: that.data.details.dard_order_days,
                  dard_convers_cnt: that.data.details.dard_convers_cnt,
                  dard_purchase_memo: that.data.details.dard_purchase_memo,
                  getkey: us_user_id_pass,
                  dai_who_find: dai_who_find,
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded" // 默认值
                },
                success(res) {
                  wx.showToast({
                    title: '修改成功',
                    icon: 'none',
                    duration: 2000,
                    mask: true
                  })
                }
              })
            }
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      dard_reply_det: options.dard_reply_det
    })
    wx.showLoading({
      title: '加载中',
    })
    //查找制定元素在数组中的索引值
    function findIndex(l, o) {
      var objStr = JSON.stringify(o)
      return l.reduce((index, ele, i) => {
        if (JSON.stringify(ele) === objStr) {
          return i
        } else {
          return index
        }
      }, -1)
    }
    var that = this
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    wx.request({
      url: 'http://cj.panduo.com.cn/api/new_products_infomation_input/other',
      data: {
         getkey: us_user_id_pass,
        dai_who_find: dai_who_find,
         },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          unit: res.data.data.dard_supp_unit
        })
        var dai_who_find = wx.getStorageSync('us_user_id')
        var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
        wx.request({
          url: 'http://cj.panduo.com.cn/api/new_products_infomation_input/updateindex',
          data: {
            dard_reply_det: that.data.dard_reply_det,
            getkey: us_user_id_pass,
            dai_who_find: dai_who_find,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            var len = res.data.data.dard_prod_pic_path.length
            var dard_bill_ids = res.data.data.dard_bill_id
            var dadd_prod_pic_path = res.data.data.dard_prod_pic_path.substring(0, len).split(':');
            that.setData({
              images: dadd_prod_pic_path
            })
            that.data.images.forEach(function (item, index, arr) {
              var item_ = "http://cjimage.panduo.com.cn/api/upload/NEW_PROD_DEVELOP_PIC"+dard_bill_ids+'/' + item
              var items = "images[" + index + "]";
              that.setData({
                [items]: item_
              })
            })
            that.setData({
              checks: 1
            })
            var obj = { gc_name: res.data.data.dard_supp_unit }
            var indexs = findIndex(that.data.unit, obj)
            if (res.data.data.dard_buy_style == "N") {
              that.setData({
                mode_index: 0
              })
            } else {
              that.setData({
                mode_index: 1
              })
            }
            that.setData({
              details: res.data.data,
              unit_index: indexs
            })
            wx.hideLoading()
          }
        })
      }
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