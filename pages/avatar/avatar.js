// pages/avatar/avatar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar_info: '',
    localFilepath:'',
    bgTextStyle: 'dark',
    scrollTop: '200rpx',
    bgColor: '#ff0000',
    bgColorTop: '#00ff00',
    bgColorBottom: '#0000ff',
    nbTitle: '标题',
    nbLoading: false,
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      nbTitle: '1',
      nbLoading: true,
      nbFrontColor: 'green',
      nbBackgroundColor: '#fff',
    })
    this.setData({
      // avatar_info: '../../sources/img/avatar.JPG'
    })
    this.drawAvatarFrame()
  },
  drawAvatarFrame() {
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
        const avatarSize = avatarWidth * 0.8; // 头像尺寸
        const avatarOffset = avatarWidth * 0.1; // 边距
        const avatarImg = canvas.createImage(); //头像图像
        avatarImg.src = this.data.avatar_info;
        avatarImg.onload=()=>{
        //   ctx.beginPath();
        // ctx.arc(
        //   avatarWidth * 0.8,
        //   avatarWidth * 0.8,
        //   avatarSize ,
        //   0,
        //   2 * Math.PI
        // );
        // ctx.clip();
        ctx.drawImage(
          avatarImg,
          avatarOffset,
          avatarOffset,
          avatarSize,
          avatarSize
        );
        // 绘制头像框
        this.drawFrame(canvas, avatarWidth);
        }
        

      })

  },
  drawFrame(canvas, avatarWidth) {
    const frameSize = avatarWidth * 0.3;
    const ctx = canvas.getContext('2d');
    const framePosition = [{
        x: 0,
        y: frameSize*0.4
      },
      {
        x: avatarWidth - frameSize,
        y: 0
      },
      {
        x: 0,
        y: avatarWidth - frameSize
      },
      {
        x: avatarWidth - frameSize*1.3,
        y: avatarWidth - frameSize*1.3
      }
    ];
    framePosition.forEach((pos, index) => {
      console.log(index);
      const frameImg = canvas.createImage()
      if(index == 0){
        frameImg.src = "../../sources/img/ava1.png";
      }else if(index==1){
        frameImg.src = "../../sources/img/ava2.png";
      }else if(index==2){
        frameImg.src = "../../sources/img/ava3.png";
      }else{
        frameImg.src = "../../sources/img/ava4.png";
      }
      frameImg.onload = () =>{
        ctx.drawImage(frameImg, pos.x, pos.y, frameSize, frameSize);
      }
      
    });
  },
  onGetUserInfo:function(e){
    var that = this;
    if(e.detail.userInfo){
      console.log(e.detail.userInfo)
      const userInfo = e.detail.userInfo;
      const avatarurl = userInfo.avatarUrl;
      // let tempFilePath = ''
      let savedFilePath = ''
      wx.downloadFile({
        url: avatarurl,
        success:function(res){
          console.log('success')
          wx.saveFile({
            tempFilePath:res.tempFilePath,
            success:function(res){
              console.log('success saved')
              console.log(res.savedFilePath)
              savedFilePath = res.savedFilePath;
              that.setData({
                localFilepath:savedFilePath
              });
            },
            fail:function(err){
              console.log(err)
            }
          })


        }
      });
      console.log(that.data.localFilepath);
      that.setData({
        avatar_info:that.data.localFilepath
      });
      console.log(that.data.avatar_info);
      that.drawAvatarFrame();
    }else{
      console.log('no info')
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