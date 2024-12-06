Page({
    data: {
        imagePath: '', // 存储选择的图片路径
        resultList: [],  // 用于存储植物识别结果
        logId: '' 
      },    
      // 选择图片
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
          },
          fail: (err) => {
            console.error('选择图片失败:', err);
          }
        });
      },


      processRecognitionResponse(response) {
        const { log_id, result } = response;
        this.setData({
          logId: log_id
        });
    
        // 处理识别结果
        if (result && result.length > 0) {
          // 只取植物名称和置信度，并存储到 data 中
          const processedResult = result.map(item => ({
            name: item.name,
            score: item.score
          }));
    
          this.setData({
            resultList: processedResult
          });
          console.log('识别结果:', processedResult);
          wx.navigateTo({
            url: `/pages/plantSearchResult/plantSearchResult?resultList=${encodeURIComponent(JSON.stringify(this.data.resultList))}`,
          });
        } else {
          console.error('没有识别到植物');
        }
      },

      simulateRequest() {
        const response = {
          "log_id": 123456789012345678,
          "result": [
            { "name": "吉娃莲", "score": 0.5321, "category": "花卉", "otherInfo": "一些额外信息" },
            { "name": "芦荟", "score": 0.8753, "category": "植物", "otherInfo": "一些额外信息" }
          ]
        };
        this.processRecognitionResponse(response);
      },
      

      encodeParams(data) {
        let params = [];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
          }
        }
        return params.join('&');
      },

getImageBase64(imagePath) {
    console.log('enter get methods with: ',this.data.imagePath)
    return new Promise((resolve, reject) => {
      console.log('execute FileSystemManager');
      wx.getFileSystemManager().readFile({
        filePath: this.data.imagePath,  // 图片文件路径
        encoding: 'base64',
        success: (res) => {
          // 返回base64编码，去掉开头的 'data:image/png;base64,' 部分
          const base64Image = res.data.replace(/^data:image\/\w+;base64,/, '');
          console.log('选择的图片路径:', this.data.imagePath); // 打印
          resolve(base64Image);
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  },

  uploadImage(imagePath) {
    imagePath = this.data.imagePath; // 从 this.data 获取 
    console.log('上传的图片路径:', imagePath);
    // 假设你已经通过其他方式获取了 access_token
    const accessToken = '24.483833b02b9e83130386d2d2eb02a0ef.2592000.1735990816.282335-116548194';
  
    // 获取图片的 base64 编码
    this.getImageBase64(imagePath).then((base64Image) => {
      // 构造请求参数
      const data = {
        image: base64Image,  // 图片的 base64 编码
        baike_num: 3         // 可选参数，返回百科信息的数量
      };
  
      // 请求 API
      wx.request({
        url: `https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=${accessToken}`,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: this.encodeParams(data),  // 请求参数进行 URL 编码
        success:(res) => {
          console.log('API 请求成功lujing:', this.data.imagePath);
          //只有尖头函数才能获得正确的指向page的this？why?
          console.log('API 请求成功:', res.data);
          this.processRecognitionResponse(res.data)
        },
        fail(err) {
          console.error('API 请求失败:', err);
        }
      });
    }).catch((err) => {
      console.error('获取图片失败:', err);
    });
  },
})