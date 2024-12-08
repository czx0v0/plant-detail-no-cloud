// pages/diyAvatar/diyAvatar.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

      /**
       * 页面的初始数据
       */
      data: {
        avatarUrl: defaultAvatarUrl,
        canvas: {},
        scaleWH: 1,
        diyType: 'outer',
        outerFrameUrl: '',
        innerFrameUrl: '',
        chooseOutId:0,
        chooseInId:0,
        chooseCornerId:0,
        cornerFrameUrl: ['', '', '', ''],
        outerFrames: [{
            frameId: '0',
            frameSrc: '../../sources/img/none.png',
            isLocked: true
          },
          {
            frameId: '1',
            frameSrc: '../../sources/img/外框/紫荆花-外框.png',
            isLocked: true
          },
          {
            frameId: '2',
            frameSrc: '../../sources/img/外框/鸢尾-外框.png',
            isLocked: true
          },
          {
            frameId: '3',
            frameSrc: '../../sources/img/外框/三角梅-外框.png',
            isLocked: false
          },
          {
            frameId: '4',
            frameSrc: '../../sources/img/外框/铁树-外框.png',
            isLocked: true
          },
          {
            frameId: '5',
            frameSrc: '../../sources/img/外框/芒萁-外框.png',
            isLocked: true
          },
          {
            frameId: '6',
            frameSrc: '../../sources/img/外框/霸王棕-外框.png',
            isLocked: true
          },{
            frameId: '7',
            frameSrc: '../../sources/img/外框/龙船花-外框.png',
            isLocked: true
          },{
            frameId: '8',
            frameSrc: '../../sources/img/外框/竹子-外框.png',
            isLocked: true
          },{
            frameId: '9',
            frameSrc: '../../sources/img/外框/滴水观音-外框.png',
            isLocked: true
          },{
            frameId: '10',
            frameSrc: '../../sources/img/外框/变叶木-外框.png',
            isLocked: true
          },{
            frameId: '11',
            frameSrc: '../../sources/img/外框/南美蟛蜞菊-外框.png',
            isLocked: true
          },{
            frameId: '12',
            frameSrc: '../../sources/img/外框/华南毛蕨-外框.png',
            isLocked: true
          },
        ],
        innerFrames: [{
            frameId: '10',
            frameSrc: '../../sources/img/none.png',
            isLocked: true
          },
          {
            frameId: '11',
            frameSrc: '../../sources/img/内框/内框-1.png',
            isLocked: true
          },
          {
            frameId: '12',
            frameSrc: '../../sources/img/内框/内框-2.png',
            isLocked: false
          },
          {
            frameId: '13',
            frameSrc: '../../sources/img/内框/内框-3.png',
            isLocked: true
          },
          {
            frameId: '14',
            frameSrc: '../../sources/img/内框/内框-4.png',
            isLocked: true
          },
        ],
        cornerFrames: [
          // 用十位数字表示方位：0左上，1左下，2右上，3右下
          {
            frameId: '100',
            frameSrc: '../../sources/img/none.png',
            isLocked: true
          },
          {
            frameId: '121',
            frameSrc: '../../sources/img/装饰/装饰-1-二校门.png',
            isLocked: true
          },
          {
            frameId: '122',
            frameSrc: '../../sources/img/装饰/装饰-2.png',
            isLocked: true
          },
          {
            frameId: '123',
            frameSrc: '../../sources/img/装饰/装饰-3.png',
            isLocked: true
          },
          {
            frameId: '124',
            frameSrc: '../../sources/img/装饰/装饰-4.png',
            isLocked: true
          },
          {
            frameId: '125',
            frameSrc: '../../sources/img/装饰/装饰-5.png',
            isLocked: true
          },
        ],
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad(options) {
        this.loadAvatar(); //检查本地头像加载
        this.loadAvatarFrame();
        this.drawAvatarFrame(); //绘制头像和头像框
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
            ctx.globalCompositeOperation = 'source-over';
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
        var that = this;
        // 绘制内框
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
          });
          ctx.restore();
        }
        // 绘制外框
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
          });
          ctx.restore();
        }
        // 绘制四角边框
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
              y: avatarWidth - frameSize-5
            },
            {
              x: avatarWidth - frameSize-5,
              y: 5,
            },
            {
              x: avatarWidth - frameSize-5,
              y: avatarWidth - frameSize-5,
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
              src:imgSrc,
              success:function(res){
                console.log("get info success")
                let imgWidth = res.width
                let imgHeight = res.height
                // 宽高比
                that.data.scaleWH = imgWidth/imgHeight
              }
            })
            console.log("scale:",that.data.scaleWH)
            frameImg.onload = () => {
              ctx.drawImage(frameImg, pos.x-frameSize*that.data.scaleWH+frameSize, pos.y, frameSize*that.data.scaleWH, frameSize);
            }
        });
      ctx.restore();
    }
  },
  loadAvatar() {
    //检查本地头像加载
    const avatarUrl = wx.getStorageSync('avatarUrl');
    if (avatarUrl) {
      this.setData({
        avatarUrl,
      });
    } else {
      this.setData({
        avatarUrl: defaultAvatarUrl,
      });
    }
  },
  loadAvatarFrame() {
    //检查本地头像框
    const outerFrameUrl = wx.getStorageSync('outerFrameUrl');
    const chooseOutId = wx.getStorageSync('chooseOutId');
    const innerFrameUrl = wx.getStorageSync('innerFrameUrl');
    const chooseInId = wx.getStorageSync('chooseInId');
    const cornerFrameUrl = wx.getStorageSync('cornerFrameUrl');
    const chooseCornerId = wx.getStorageSync('chooseCornerId');
    if (outerFrameUrl) {
      this.setData({
        outerFrameUrl,
        chooseOutId
      });
    } else {
      this.setData({
        outerFrameUrl: '',
        chooseOutId:0
      })
    }
    if (innerFrameUrl) {
      this.setData({
        innerFrameUrl,
        chooseInId
      });
    } else {
      this.setData({
        innerFrameUrl: '',
        chooseOutId:0
      })
    }
    if (cornerFrameUrl) {
      this.setData({
        cornerFrameUrl,
        chooseCornerId
      });
    } else {
      this.setData({
        cornerFrameUrl: ['', '', '', ''],
        chooseCornerId:0
      })
    }
  },
  saveAvatarPic: function () {
    var that = this;
    this.triggerEvent('saveAvatarPic');
    // 把canvas转化成临时文件url
    wx.canvasToTempFilePath({
      // canvasId:'avatarCanvas',
      canvas: that.data.canvas,
      x: 0,
      y: 0,
      width: 512,
      height: 512,
      destHeight: 100,
      destWidth: 100,
      success: (res) => {
        const tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        //请求授权保存相册
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success: (res) => {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,
              success: (saveRes) => {
                console.log('save success')
                wx.showToast({
                  title: '保存成功！',
                  icon: 'success',
                  duration: 1000
                });
              },
              fail: (err) => {
                console.log('save failed', err)
                wx.showToast({
                  title: '保存失败',
                  icon: 'none',
                  duration: 1000
                });
              }
            });
          },
          fail: (resErr) => {
            console.log('auth failed', resErr);
            wx.showModal({
              title: '授权提示',
              content: '需要获取保存图片权限',
              showCancel: false,
              confirmText: '设置',
              success: (modalRes) => {
                if (modalRes.confirm) {
                  wx.openSetting({
                    success: (setRes) => {
                      console.log('set')
                    }
                  });
                }
              }
            });
          }
        });
      },
      fail: (err) => {
        console.log('canvas to file failed', err);
        wx.showToast({
          title: '头像转换失败',
          icon: 'none',
          duration: 1000
        });
      }
    }, this);
  },
  switchDiyTab: function (event) {
    this.triggerEvent('switchDiyTab')
    let diy = event.currentTarget.dataset.diy;
    this.setData({
      diyType: diy
    })
    console.log(this.data.diyType)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.loadAvatar(); //检查本地头像加载
    this.loadAvatarFrame();
    this.drawAvatarFrame(); //绘制头像和头像框
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.loadAvatar(); //检查本地头像加载
    this.loadAvatarFrame();
    this.drawAvatarFrame(); //绘制头像和头像框
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
    this.triggerEvent('goBack');
    wx.navigateBack({
      delta: 1,
      success: function (res) {
        console.log('back success');
      },
      fail: function (err) {
        console.log('back failed', err);
      }
    });
  },
  switchOuterFrame: function (event) {
    this.triggerEvent('switchOuterFrame')
    let id = event.currentTarget.dataset.id;
    if (id == 0) {
      this.setData({
        outerFrameUrl: '',
        chooseOutId:0
      })
      console.log('outer frame set none')
    } else {
      this.setData({
        outerFrameUrl: this.data.outerFrames[id].frameSrc,
        chooseOutId:id
      })
      console.log(this.data.outerFrameUrl)
    }
    wx.setStorageSync('outerFrameUrl', this.data.outerFrameUrl);
    wx.setStorageSync('chooseOutId', this.data.chooseOutId);
    this.drawAvatarFrame()
  },
  switchInnerFrame: function (event) {
    this.triggerEvent('switchInnerFrame')
    let id = event.currentTarget.dataset.id - 10;
    if (id == 0) {
      this.setData({
        innerFrameUrl: '',
        chooseInId:0
      })
      console.log('inner frame set none')
    } else {
      this.setData({
        innerFrameUrl: this.data.innerFrames[id].frameSrc,
        chooseInId:id+10
      })
      console.log(this.data.innerFrameUrl)
    }
    wx.setStorageSync('innerFrameUrl', this.data.innerFrameUrl);
    wx.setStorageSync('chooseInId', this.data.chooseInId);

    this.drawAvatarFrame()
  },
  switchCornerFrame: function (event) {
    this.triggerEvent('switchCornerFrame')
    let id = event.currentTarget.dataset.id;
    console.log("id:",id)
    if (id == 100) {
      this.setData({
        cornerFrameUrl: ['', '', '', ''],
        chooseCornerId:0
      })
      console.log('corner frame set none')
    } else if (id < 110) {
      this.setData({
        'cornerFrameUrl[0].value': this.data.cornerFrames[id - 100].frameSrc,
      })
    } else if (id < 120) {
      this.setData({
        'cornerFrameUrl[1].value': this.data.cornerFrames[id - 110].frameSrc,
      })
    } else if (id < 130) {
      this.setData({
        'cornerFrameUrl[2].value': this.data.cornerFrames[id - 120].frameSrc,
        chooseCornerId:id
      })
    } else if (id < 140) {
      this.setData({
        'cornerFrameUrl[3].value': this.data.cornerFrames[id - 130].frameSrc,
      })
    }
    wx.setStorageSync('cornerFrameUrl', this.data.cornerFrameUrl);
    wx.setStorageSync('chooseCornerId', this.data.chooseCornerId);
    console.log(this.data.cornerFrameUrl)
    this.drawAvatarFrame()
  },

})