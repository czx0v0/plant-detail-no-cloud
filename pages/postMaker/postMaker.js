// pages/postMaker/postMaker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '', // 存储选择的图片路径
  },

  navigateToDiyPoster() {
    wx.navigateTo({
      url: `/pages/diyPoster/diyPoster?photoUrl=${encodeURIComponent(JSON.stringify(this.data.imagePath))}`,
    });
  },

  chooseImage() {
    wx.chooseImage({
      count: 1, // 只选择一张图片
      sizeType: ['original', 'compressed'], // 支持原图或压缩图
      sourceType: ['album', 'camera'], // 支持相册和相机
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]; // 获取第一张图片的路径
        console.log('选择的图片路径:', tempFilePath); // 打印图片路径，确保正确
        this.setData({
          imagePath: tempFilePath, // 更新 imagePath 显示图片 
        });
        wx.setStorageSync('photoUrl', this.data.imagePath);
      },
      fail: (err) => {
        console.error('选择图片失败:', err);
      }
    });
  },

  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  goBack: function () {
    console.log('back111');
    wx.switchTab({
      url: 'pages/home/home',
    })
  },
  onTabChange(e) {
    const index = e.detail.index;
    console.log("tab changed");
    // console.log(e);
    this.setData({
      selected: index
    });
    // console.log(index);
    // console.log(typeof index); 
    if (parseInt(index) === 0) {
        console.log("switch to map");
        wx.navigateTo({
            url: '/pages/postMaker/postMaker',
        });
      } else if (parseInt(index) === 1) {
        console.log("switch to detail");
        wx.switchTab({
          url: '/pages/home/home'
        });
      } else if (parseInt(index) === 2) {
        console.log("switch to detail");
        wx.switchTab({
          url: '/pages/avatar/avatar'
        });
      }
    },
})