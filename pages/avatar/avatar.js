// pages/avatar/avatar.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
  /**
   * 页面的初始数据
   */
  data: {
      selected:2,
      avatarUrl: defaultAvatarUrl,
      nickname:'匿名',
      nicknameInputShow:true,
      avatarWrapperShow:true,
      canvas:{}
  },

  navigateToCollectionPage() {
    wx.navigateTo({
        url: '/pages/testPage/testPage',
    });
  },
  onTabChange(e) {
    const index = e.detail.index;
    console.log("tab changed");
    // console.log(e);
    
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
        console.log("switch to avatar");
        wx.switchTab({
          url: '/pages/avatar/avatar'
        });
    }
},


  onLoad(options) {
      this.setData({
          selected:2
      }); 
    this.loadNickname();//检查本地昵称加载
    this.loadAvatar(); //检查本地头像加载
    this.loadAvatarFrame();
    this.drawAvatarFrame();//绘制头像和头像框
  },
  drawAvatarFrame() {
    // 存储this
    var that = this;
    const query = wx.createSelectorQuery()
    query.select('#avatarCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node; // 获取canvas节点
        console.log(res)
        const ctx = canvas.getContext('2d');
        
        // 获取2d上下文
        const dpr = wx.getSystemInfoSync().pixelRatio; //获取设备的像素比
        // 设置canvas宽高（实际）
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        // ctx.fillRect(0,0,10,10)
        //绘制头像
        const avatarWidth = res[0].width; // 头像的宽
        const avatarSize = avatarWidth * 1; // 头像尺寸
        const avatarOffset = avatarWidth * 0; // 边距
        const avatarImg = canvas.createImage(); //头像图像
        // 从链接获取头像图像信息
        wx.getImageInfo({
          src: this.data.avatarUrl,
          success: function (res) {
            //成功后 尝试加载图像
            console.log('get image info success')
            avatarImg.src = res.path;
            // 加载成功后开始绘制
            avatarImg.onload = () => {
              // 绘制头像
              ctx.drawImage(
                avatarImg,
                avatarOffset,
                avatarOffset,
                avatarSize,
                avatarSize
              );
              // 绘制头像框
              that.drawFrame(canvas, avatarWidth);
              console.log('canvas complete');
              
            }
          }
        });
        that.data.canvas = canvas;
      })
      
  },
  drawFrame(canvas, avatarWidth) {
    this.drawInnerFrame(canvas, avatarWidth);
    setTimeout(() => {
      this.drawOuterFrame(canvas, avatarWidth);
      setTimeout(() => {
        this.drawCornerFrame(canvas, avatarWidth);
      }, 500)
    }, 500)
  },
  drawInnerFrame: function (canvas, avatarWidth) {
    // 绘制内框
    return new Promise((resolve) => {
      if (this.data.innerFrameUrl != '') {
        const frameSize = avatarWidth * 0.8;
        const ctx = canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        // 头像框的位置
        const framePosition = [{
          x: avatarWidth * 0.1,
          y: avatarWidth * 0.1
        }, ];
        framePosition.forEach((pos, index) => {
          console.log(index);
          const frameImg = canvas.createImage()
          if (index == 0) {
            frameImg.src = this.data.innerFrameUrl;
          }
          frameImg.onload = () => {
            ctx.drawImage(frameImg, pos.x, pos.y, frameSize, frameSize);
          }
          console.log("draw inner complete");
        });
        ctx.restore();
        resolve();
      }
    })
  },
  drawOuterFrame: function (canvas, avatarWidth) {
    // 绘制外框
    return new Promise((resolve) => {
      if (this.data.outerFrameUrl != '') {
        const frameSize = avatarWidth;
        const ctx = canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';

        // 头像框的位置
        const framePosition = [{
          x: 0,
          y: 0
        }];
        framePosition.forEach((pos, index) => {
          console.log(index);
          const frameImg = canvas.createImage()
          if (index == 0) {
            frameImg.src = this.data.outerFrameUrl;
          }
          frameImg.onload = () => {
            ctx.drawImage(frameImg, pos.x, pos.y, frameSize, frameSize);
          }
          console.log("draw outer complete");
        });
        ctx.restore();
        resolve();
      }
    })

  },
  drawCornerFrame(canvas, avatarWidth) {
    // 绘制四角边框
    return new Promise((resolve) => {
      var that = this;
      if (this.data.cornerFrameUrl[0] != '' || this.data.cornerFrameUrl[1] != '' || this.data.cornerFrameUrl[2] != '' || this.data.cornerFrameUrl[3] != '') {
        const frameSize = avatarWidth * 0.2;
        const ctx = canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        // 头像框的位置
        const framePosition = [{
            x: 5,
            y: 5
          },
          {
            x: 0,
            y: avatarWidth - frameSize - 5
          },
          {
            x: avatarWidth - frameSize - 5,
            y: 5,
          },
          {
            x: avatarWidth - frameSize - 5,
            y: avatarWidth - frameSize - 5,
          }
        ];
        framePosition.forEach((pos, index) => {
          console.log(index);
          console.log(pos);
          const frameImg = canvas.createImage();
          let imgSrc = '';
          if (index == 0 && that.data.cornerFrameUrl[0].value) {
            console.log(that.data.cornerFrameUrl[0].value)
            frameImg.src = that.data.cornerFrameUrl[0].value;
            imgSrc = that.data.cornerFrameUrl[0].value;
          } else if (index == 1 && that.data.cornerFrameUrl[1].value) {
            console.log(that.data.cornerFrameUrl[1].value)
            frameImg.src = that.data.cornerFrameUrl[1].value;
            imgSrc = that.data.cornerFrameUrl[1].value;
          } else if (index == 2 && that.data.cornerFrameUrl[2].value) {
            console.log(that.data.cornerFrameUrl[2].value)
            frameImg.src = that.data.cornerFrameUrl[2].value;
            imgSrc = that.data.cornerFrameUrl[2].value;
          } else if (index == 3 && that.data.cornerFrameUrl[3].value) {
            console.log(that.data.cornerFrameUrl[3].value)
            frameImg.src = that.data.cornerFrameUrl[3].value;
            imgSrc = that.data.cornerFrameUrl[3].value;
          }
          wx.getImageInfo({
            src: imgSrc,
            success: function (res) {
              console.log("get info success")
              let imgWidth = res.width
              let imgHeight = res.height
              // 宽高比
              that.data.scaleWH = imgWidth / imgHeight
            }
          })
          console.log("scale:", that.data.scaleWH)
          frameImg.onload = () => {
            ctx.drawImage(frameImg, pos.x - frameSize * that.data.scaleWH + frameSize, pos.y, frameSize * that.data.scaleWH, frameSize);
          }
          console.log("draw corner complete");
        });
        ctx.restore();
      }
      resolve();
    })
  },
  onChooseAvatar(e) {
    //头像选择
    //（onGetUserInfo在新版本已不使用）
    const {
      avatarUrl
    } = e.detail;
    //更新Url值
    this.setData({
      avatarUrl,
      avatarWrapperShow:false,
    });
    //更新头像画布
    this.drawAvatarFrame()
    //本地存储头像信息
    wx.setStorageSync('avatarUrl', avatarUrl);
  },
  onNicknameInput(e){
    //昵称输入
    const nickname = e.detail.value;
    console.log(e.detail.value);
    this.setData({ 
      nickname,
      nicknameInputShow:false
     });
    if(nickname){
      wx.setStorageSync('nickname', nickname);
    }
  },
  loadNickname(){
    //检查本地昵称加载
    const nickname = wx.getStorageSync('nickname');
    if(nickname){
      this.setData({
        nickname,
        nicknameInputShow:false
      });
    }else{
      this.setData({
        nickname:'匿名'
      })
      
    }
  },
  loadAvatar(){
    //检查本地头像加载
    const avatarUrl = wx.getStorageSync('avatarUrl');
    if(avatarUrl){
      this.setData({
        avatarUrl,
        avatarWrapperShow:false,
      });
    }else{
      this.setData({
        avatarUrl:defaultAvatarUrl,
      });
    }
  },
  loadAvatarFrame() {
    //检查本地头像框
    const outerFrameUrl = wx.getStorageSync('outerFrameUrl');
    const innerFrameUrl = wx.getStorageSync('innerFrameUrl');
    const cornerFrameUrl = wx.getStorageSync('cornerFrameUrl');
    if (outerFrameUrl) {
      this.setData({
        outerFrameUrl,
      });
    } else {
      this.setData({
        outerFrameUrl: ''
      })
    }
    if (innerFrameUrl) {
      this.setData({
        innerFrameUrl,
      });
    } else {
      this.setData({
        innerFrameUrl: ''
      })
    }
    if (cornerFrameUrl) {
      this.setData({
        cornerFrameUrl,
      });
    } else {
      this.setData({
        cornerFrameUrl: ['', '', '', '']
      })
    }
  },
  changeNickname(){
    if(this.data.nicknameInputShow==true){
      this.setData({
        nicknameInputShow:false
      })
    }else{
      this.setData({
        nicknameInputShow:true
      })
    }
  },
  navigateToDiy() {
    this.triggerEvent('navigateToDiy');
    wx.navigateTo({
      url: '/pages/toDiyPage/toDiyPage',
    });
  },
  saveAvatarPic:function(){
    var that = this;
    this.triggerEvent('saveAvatarPic');
    // 把canvas转化成临时文件url
    wx.canvasToTempFilePath({
      // canvasId:'avatarCanvas',
      canvas:that.data.canvas,
      x:0,
      y:0,
      width:512,
      height:512,
      destHeight:100,
      destWidth:100,
      success:(res)=>{
        const tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        //请求授权保存相册
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success:(res)=>{
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,
              success:(saveRes)=>{
                console.log('save success')
                wx.showToast({
                  title: '保存成功！',
                  icon:'success',
                  duration:1000
                });
              },
              fail:(err)=>{
                console.log('save failed',err)
                wx.showToast({
                  title: '保存失败',
                  icon:'none',
                  duration:1000
                });
              }
            });
          },
          fail:(resErr)=>{
            console.log('auth failed',resErr);
            wx.showModal({
              title:'授权提示',
              content:'需要获取保存图片权限',
              showCancel:false,
              confirmText:'设置',
              success:(modalRes)=>{
                if(modalRes.confirm){
                  wx.openSetting({
                    success:(setRes)=>{
                      console.log('set')
                    }
                  });
                }
              }
            });
          }
        });
      },
      fail:(err)=>{
        console.log('canvas to file failed',err);
        wx.showToast({
          title: '头像转换失败',
          icon:'none',
          duration:1000
        });
      }
    },this);
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
          selected:2
      });
    this.loadNickname();//检查本地昵称加载
    this.loadAvatar(); //检查本地头像加载
    this.loadAvatarFrame();
    this.drawAvatarFrame();//绘制头像和头像框
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