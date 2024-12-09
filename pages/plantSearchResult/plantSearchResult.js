// pages/plantSearchResult/plantSearchResult.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selected:4,
        resultList: [],  // 存储传递过来的识别结果
        imagePath:"../../sources/images/zijinghua.jpeg"
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
            console.log("switch to homepage");
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

    floatToPercentage(value) {
        // 将浮点数乘以100，保留到整数部分
        const percentage = Math.round(value * 100);
        return percentage + '%'; // 加上百分号
    },
    backToSearchPage() {
        wx.redirectTo({
            url: `/pages/plantSearch/plantSearch?resultList=&imagePath=`,
          });
    },
   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.showTabBar({
            animated: true // 使用动画效果
        });
        // 接收并解析通过 URL 传递的 resultList
        if (options.resultList) {
          const resultList = JSON.parse(decodeURIComponent(options.resultList));
          this.setData({
            resultList: resultList
          });
        }
        if (options.imagePath) {
            const imagePath = JSON.parse(decodeURIComponent(options.imagePath));
            this.setData({
              imagePath: imagePath
            });
          }
        // const resultList = [
        //     { name: '吉娃莲', score: 0.5321 },
        //     { name: '兰花', score: 0.2125 },
        //     { name: '玫瑰', score: 0.1523 },
        //   ];
        const resultList = this.data.resultList;
          const resultList1 = resultList.map(item => {
            item.scorePercentage = this.floatToPercentage(item.score);
            return item;
          });
          this.setData({
            resultList: resultList1 // 更新页面的 resultList 数据
          });
          console.log(this.data.resultList)
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
        this.setData({
            selected:4
        })
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