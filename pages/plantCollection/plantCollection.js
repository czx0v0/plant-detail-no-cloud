Page({
    data: {
        imageUrls: [],
        imagePath: ""
    },
    onLoad() {
        wx.cloud.init();
        // 假设从云数据库或其他地方获取了图片的 fileID
        const fileIDs = [
          '	cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/三角梅.png',
          '	cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/植物图标/华南毛蕨.png'
        ];
        wx.cloud.getTempFileURL({
            fileList: fileIDs,
            success: res => {
              // 获取图片的临时链接
              const fileURLs = res.fileList.map(file => file.tempFileURL);
              this.setData({
                imageUrls: fileURLs
              });
            },
            fail: err => {
              console.error('获取图片临时链接失败', err);
            }
          });
    },
        

    
})