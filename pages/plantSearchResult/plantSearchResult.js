// pages/plantSearchResult/plantSearchResult.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        resultList: [],  // 存储传递过来的识别结果
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 接收并解析通过 URL 传递的 resultList
        if (options.resultList) {
          const resultList = JSON.parse(decodeURIComponent(options.resultList));
          this.setData({
            resultList: resultList
          });
        }
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

    }
})