Page({
    // 跳转到数字地图页
    goToMap() {
      wx.navigateTo({
        url: '../map/map' // 个人信息页路径
      });
    },

     goToMap() {
      wx.navigateTo({
        url: '../map/map' // 个人信息页路径
      });
    },
    
    navigateToSearchPage() {
        wx.navigateTo({
            url: '/pages/plantSearch/plantSearch',
          });
    },
    // 跳转到植物识别页
    goToRecognition() {
      wx.navigateTo({
        url: '../plantSearch/plantSearch' // 历史记录页路径
      });
    }
  });