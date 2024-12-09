Page({
    // 跳转到数字地图页
    data: {
        selected: 1,  // 默认选中第一个 tab，
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

    onShow() {
        this.setData({
            selected:1
        });
    },
    navigateToMapPage() {
        wx.navigateTo({
            url: '/pages/map/map',
        });
    },
    // 跳转到植物识别页
    // goToRecognition() {
    //   wx.navigateTo({
    //     url: '../plantSearch/plantSearch' // 历史记录页路径
    //   });
    // }
  });