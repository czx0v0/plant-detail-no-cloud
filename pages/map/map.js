// pages/map/map.js
//sdk
wx.cloud.init({
  env: 'test1-9grfsypr0a1c2939'
})
// 引入mapData.js的地图数据
const mapData = require('../../utils/mapData').mapData;
const plantDetailData = require('../../utils/plantDetailData').plantDetailData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:4,
    //纬度
    latitude: 22.59363,
    //经度
    longitude: 113.974654,
    scale: 18,
    markers: [],
    minScale: 18, // 最小缩放比例
    maxScale: 20, // 最大缩放比例
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
        wx.switchTab({
          url: '/pages/testPage/testPage',
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


  onLoad() {
    this.getUserLocation(); 
    this.mapCtx = wx.createMapContext('myMap'); // 获取地图上下文
    // 添加图片覆盖层
    this.addImageOverlay();
    // 页面加载时调用加载标记点的方法
    this.loadMarkers(); 
    // 页面加载时获取用户地理位置
    this.getUserLocation(); 
  },
  // bindmarkertap绑定的marker点击事件
  onMarkerTap: function (e) {
    console.log('marker id:', e.markerId);
    // 获取点击marker的id
    const markerId = e.markerId;
    // 获取点击marker的信息
    const markerInfo = this.getMarkerInfo(markerId)
    // 设置组件的数据
    this.setData({
      markerInfo: markerInfo
    });
  },
  getMarkerInfo: function (markerId) {
    // 获取对应marker的详细信息
    // 通过id获取植物详细数据
    const markerDetail = plantDetailData[markerId - 1];
    const markerTitle = markerDetail.title;
    const markerContent = markerDetail.content;
    const markerImage = markerDetail.image;

    return {
      show: true,
      image:markerImage,
      title: markerTitle,
      content: markerContent
    };
  },

// 设置缩放比例
// 监听缩放事件
onRegionChange(e) {
  if (e.type === "end") { // 确保缩放操作完成后再调整
    this.mapCtx.getScale({
      success: (res) => {
        const currentScale = res.scale; // 当前缩放比例
        const { minScale, maxScale } = this.data;

        // 限制缩放范围
        if (currentScale < minScale) {
          this.setData({ scale: minScale });
        } else if (currentScale > maxScale) {
          this.setData({ scale: maxScale });
        }
      },
      fail: (err) => {
        console.error("获取缩放比例失败:", err);
      }
    });
  }
},
getUserLocation() {
  const that = this;
  // wx.getLocation() 获取用户当前位置
  wx.getLocation({
    type: 'gcj02', // 腾讯地图支持的坐标系
    success(res) {
      console.log('用户当前位置:', res);
      const { latitude, longitude } = res;

      // 将用户当前位置作为新的标注点加入 markers 数组
      const userMarker = {
        id: 0,
        latitude,
        longitude,
        iconPath: '../../utils/resources/marker.png', // 用户位置标注图标
        width: 50,
        height: 50
      };

      // 更新 markers 数组，并设置地图中心为用户当前位置
      that.setData({
        latitude,
        longitude,
        markers: [...that.data.markers, userMarker]
      });
    },
    fail(err) {
      console.error('获取地理位置失败:', err);
      wx.showModal({
        title: '提示',
        content: '无法获取地理位置，请检查权限设置。',
        showCancel: false
      });
    }
  });
},
 // 添加图片覆盖层
 addImageOverlay() {
  this.mapCtx.addGroundOverlay({
    id: 1,  // 图层ID
    src: '../../sources/img/地图.png',  // 手绘地图的图片路径
    bounds: {
      // 左下角
      southwest: { latitude: 22.5899, longitude: 113.9667 },
      // 右上角
      northeast: { latitude: 22.5943,  longitude: 113.9737}
    },
    opacity: 0.8,  // 设置透明度，根据需求调整
    success: (res) => {
      console.log('地图图片覆盖层添加成功:', res);
    },
    fail: (e) => {
      console.error('地图图片覆盖层添加失败:', e);
    }
  });
},

  // 加载标记点数据
  loadMarkers() {
    // this.setData({
    //   markers: mapData
    // });
    // 遍历本地的 mapData 数据
    const markers = mapData.map(marker => ({
      ...marker,
    }));
    // 获取云存储连接
    wx.cloud.getTempFileURL({
      fileList: markers.map(marker => marker.iconPath), // 获取所有图标的云路径
      success: res => {
        // 处理成功的回调
         // 将iconpath替换为刚刚的url
        const updatedMarkers = markers.map((marker, index) => ({
          ...marker, // 保留原始属性
          iconPath: res.fileList[index].tempFileURL, // 使用临时 URL 替换原图标路径
        }));
        // 更新标记点数据
      this.setData({
        markers: updatedMarkers,
      });
      },
      fail: err => {
        console.error('获取云存储图片临时链接失败:', err);
      }
    });

  },

  // 获取用户位置
  getUserLocation() {
    const that = this;
    // wx.getLocation() 获取用户当前位置
    wx.getLocation({
      type: 'gcj02', // 腾讯地图支持的坐标系
      success(res) {
        console.log('用户当前位置:', res);
        const { latitude, longitude } = res;

        // 将用户当前位置作为新的标注点加入 markers 数组
        const userMarker = {
          id: 0,
          latitude,
          longitude,
          iconPath: '../../utils/resources/marker.png', // 用户位置标注图标
          width: 50,
          height: 50
        };

        // 更新 markers 数组，并设置地图中心为用户当前位置
        that.setData({
          latitude,
          longitude,
          markers: [...that.data.markers, userMarker]
        });
      },
      fail(err) {
        console.error('获取地理位置失败:', err);
        wx.showModal({
          title: '提示',
          content: '无法获取地理位置，请检查权限设置。',
          showCancel: false
        });
      }
    });
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