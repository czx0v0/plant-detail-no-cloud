// pages/diyPoster/diyPoster.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // photoUrl: '../../sources/img/3d_avatar_27.png',
    photoUrl: '',
    photoCoverUrl: '../../sources/img/poster-cover.png',
    canvas: {},
    avatarUrl: defaultAvatarUrl,
    nickname: '匿名',
    plantName: '洋紫荆',
    outerFrameUrl: '',
    innerFrameUrl: '',
    cornerFrameUrl: ['', '', '', ''],
    bigText: ['倾听自然'],
    scaleWH:1,
    posterComplete:false


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    const photoUrl = decodeURIComponent(options.photoUrl);
    console.log(photoUrl);
    const cleanedUrl = photoUrl.replace(/^"|"$/g, '');
    this.setData({
        photoUrl: cleanedUrl
    })
    this.loadAvatar(); //检查本地头像加载
    this.loadNickname();
    this.drawPoster();
  },
  drawPoster() {
    // 存储this
    var that = this;
    const query = wx.createSelectorQuery()
    query.select('#posterCanvas')
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
        //绘制头像
        const photoWidth = res[0].width; // 宽
        const photoHeight = res[0].height;
        const photoImg = canvas.createImage(); //图像
        that.setData({
          scaleWH:photoHeight/photoWidth,
        })
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        // 绘图的位置
        photoImg.src = this.data.photoUrl;
        photoImg.onload = () => {
          ctx.drawImage(photoImg, 0, 0, photoWidth, photoHeight);
        }
        console.log("draw photo complete");
        setTimeout(() => {
          ctx.restore();
          //绘制白色
          const coverWidth = res[0].width; //宽
          const coverHeight = res[0].height;
          const coverImg = canvas.createImage(); //头像图像

          ctx.globalCompositeOperation = 'source-over';
          // 绘图的位置
          coverImg.src = this.data.photoCoverUrl;
          coverImg.onload = () => {

            ctx.drawImage(coverImg, 0, 0, coverWidth, coverHeight);
          }
          ctx.save();
          console.log("draw cover complete");
        }, 800)

        setTimeout(() => {
          //绘制照片2
          const coverPhotoWidth = res[0].width; //宽
          const coverPhotoHeight = res[0].height;
          const coverPhotoImg = canvas.createImage(); //图像
          ctx.globalCompositeOperation = 'source-over';
          // 绘图的位置
          coverPhotoImg.src = this.data.photoUrl;
          coverPhotoImg.onload = () => {
            ctx.beginPath();
            ctx.arc(
              coverPhotoWidth / 2,
              coverPhotoHeight / 2 * 0.9,
              coverPhotoWidth / 2 * 0.9,
              0,
              2 * Math.PI
            );
            ctx.clip();
            ctx.drawImage(coverPhotoImg, 0, 0, coverPhotoWidth, coverPhotoHeight);
          }
          ctx.save();
          console.log("draw coverPhoto complete");
        }, 1800);
        setTimeout(() => {
          //绘制头像
          const avatarWidth = res[0].width; //宽
          const avatarImg = canvas.createImage(); //头像图像

          wx.getImageInfo({
            src: this.data.avatarUrl,
            success: function (res) {
              //成功后 尝试加载图像
              console.log('get image info success')
              console.log(that.data.avatarUrl)
              ctx.restore();
              avatarImg.src = res.path;
              avatarImg.onload = () => {
                // 绘图的位置
                ctx.beginPath();
                ctx.arc(
                  avatarWidth / 5,
                  avatarWidth / 5,
                  avatarWidth / 5,
                  0,
                  2 * Math.PI
                );
                ctx.clip();
                ctx.drawImage(avatarImg, 0, 0, avatarWidth / 2.5, avatarWidth / 2.5);
              }
              console.log("draw avatar complete");
              ctx.save();
            }
          });
        }, 3000);

        setTimeout(() => {
          //文字
          //NickName
          ctx.restore();
          let nickText = '@';
          nickText += that.data.nickname;
          nickText += ':';
          console.log(that.data.nickname);
          console.log(nickText);
          ctx.font = 'bold 25px sans-serif';
          ctx.fillStyle = '#083517';
          let x = photoWidth / 2;
          let y = 30;
          ctx.fillText(nickText, x, y);
          ctx.save();
          //plantName
          ctx.restore();
          let plantText = '与 ';
          plantText += that.data.plantName;
          plantText += ' 一起';
          ctx.font = '15px sans-serif';
          ctx.fillStyle = '#083517';
          ctx.textAlign = 'center';
          x = photoWidth / 2;
          y = photoHeight / 2 + photoWidth / 2 - 15;
          ctx.fillText(plantText, x, y);
          ctx.save();
          //bigText
          ctx.restore();
          let bigText = "“" + that.data.bigText[0] + "”";
          ctx.font = ' bold 28px sans-serif';
          ctx.fillStyle = '#083517';
          ctx.textAlign = 'center';
          x = photoWidth / 2;
          y = photoHeight / 2 + photoWidth / 2 +15;
          ctx.fillText(bigText, x, y);
          ctx.save();

          //smallText
          ctx.restore();
          let smallText = '扫码逛清华植物地图，发现更多植物！'
          ctx.font = '10px sans-serif';
          ctx.fillStyle = '#083517';
          ctx.textAlign = 'center';
          x = photoWidth / 2;
          y = photoHeight / 2 + photoWidth / 2 + 30;
          ctx.fillText(smallText, x, y);
          ctx.save();

        }, 3600)

        setTimeout(()=>{
          that.data.canvas = canvas;
          that.setData({
            posterComplete:true
          })
        },4000)
        
      })

  },
  saveAvatarPic: function () {
    var that = this;
    this.triggerEvent('saveAvatarPic');
    // 把canvas转化成临时文件url
    wx.canvasToTempFilePath({
      // canvasId:'posterCanvas',
      canvas: that.data.canvas,
      x: 0,
      y: 0,
      width: 1000,
      height: 1000*that.data.scaleWH,
      destHeight: 1000*that.data.scaleWH,
      destWidth: 1000,
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
  loadAvatar() {
    //检查本地头像加载
    const avatarUrl = wx.getStorageSync('avatarUrl');
    if (avatarUrl) {
      this.setData({
        avatarUrl,
        avatarWrapperShow: false,
      });
    } else {
      this.setData({
        avatarUrl: defaultAvatarUrl,
      });
    }
  },
  loadNickname() {
    //检查本地昵称加载
    const nickname = wx.getStorageSync('nickname');
    if (nickname) {
      this.setData({
        nickname,
        nicknameInputShow: false
      });
    } else {
      this.setData({
        nickname: '匿名'
      })

    }
  },
})