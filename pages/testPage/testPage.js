// pages/testPage/testPage.js
Page({
    data: {
        selected:2,
        blocks: new Array(12).fill(''),
         // 用于生成12个方块
        imageUrls: [],
        nameList:["三角梅", "华南毛蕨","南美蟛蜞菊","变叶木","滴水观音","???\n探索地图解锁","紫荆花","芒萁","铁树","霸王棕","鸢尾","???\n探索地图解锁"],
        imagePath: "",
        ifShowHorizontal:false
      },

      changeViewPoint() {
          console.log("change viewpoint succeeded")
          this.setData({
            ifShowHorizontal : !this.data.ifShowHorizontal
        });
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
                url: '/pages/testPage/testPage',
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

    onLoad() {
        wx.cloud.init();
        // 假设从云数据库或其他地方获取了图片的 fileID
        const fileIDs = [
          '	cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/三角梅.png',
          '	cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/华南毛蕨.png',
          'cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/南美蟛蜞菊.png',
          'cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/变叶木.png',
          '	cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/滴水观音.png',
          'cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/竹子unlock.png',
          '	cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/紫荆花.png',
          'cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/芒萁.png',
          'cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/铁树.png',
          'cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/霸王棕.png',
          'cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/鸢尾.png',
          '	cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/龙船花unlock.png',
          'cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/画卷透明底.png'
        ];
        wx.cloud.getTempFileURL({
            fileList: fileIDs,
            success: res => {
              // 获取图片的临时链接
              const fileURLs = res.fileList.map(file => file.tempFileURL);
              this.setData({
                imageUrls: fileURLs,
                imagePath: fileURLs[12] || ''     
              });
            },
            fail: err => {
              console.error('获取图片临时链接失败', err);
            }
          });
    },

    onShow() {
        this.setData({
            selected:2
        });
    }
})