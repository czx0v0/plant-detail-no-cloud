// pages/map/map.js
//sdk

//植物信息来源：iplant.cn
const detailArray = [{
  id: 1,
  image:"../../sources/img/iplant-gongfenyangtijia.png",
  title: `宫粉羊蹄甲`,
  content: `形态特征
    生活型：	落叶乔木；
    茎：	幼嫩部分常被灰色短柔毛；
    枝：	枝稍呈之字曲折，无毛；
    叶：	叶宽卵形或近圆形，长5-9厘米，宽度常超过长度，先端2裂达叶长的1/3，裂片宽，钝头或圆，基部浅心形或深心形，有时近截形，两面无毛或下面疏被灰色短柔毛；基出脉(9-)13；叶柄长2.5-3.5厘米，被毛或近无毛；
    花：	总状花序侧生或顶生，极短缩，多少呈伞房花序式，少花，被灰色短柔毛；花序梗短粗；花大，近无梗；花萼佛焰苞状，被短柔毛，一侧开裂为宽卵形、长2-3厘米的裂片；花托长约1.2厘米；花瓣倒卵形，少有倒披针形，长4-5厘米，具瓣柄，紫红或淡红色，杂以黄绿及暗紫色的条纹，近轴一片较宽；能育雄蕊5，花丝无毛，长约4厘米；退化雄蕊1-5，丝状，较短；子房具柄，被柔毛，缝线上较密；
    果：	荚果带状，扁平，长15-25厘米，宽1.5-2厘米，具长柄及喙；
    种子：	种子10-15，近圆形，径约1厘米；
    生态习性
    物候期：	花期全年，3月最盛；`
}, {
  id: 2,
  image:"../../sources/img/iplant-zijing.jpg",
  title: `紫荆`,
  content: `落叶灌木，高5米；叶近圆形，基部心形；花紫红或粉红色，2-10余朵成束，簇生于老枝和主干上，常先叶开放；荚果；花期3-4月，果期8-10月。
    形态特征
识别要点：	本变型与模式变型的区别：小枝、叶柄以及叶下面沿脉均被短柔毛；
生活型：	灌木；
株：	高达5米；
枝：	小枝灰白色，无毛；
叶：	叶近圆形或三角状圆形，长5-10厘米，先端急尖，基部浅或深心形，两面通常无毛，叶缘膜质透明；叶柄长2.5-4厘米，无毛；
花：	花紫红或粉红色，2-10余朵成束，簇生于老枝和主干上，尤以主干上花束较多，越到上部幼嫩枝条则花越少，常先叶开放，幼嫩枝上的花则与叶同时开放；花长1-1.3厘米；花梗长3-9毫米；龙骨瓣基部有深紫色斑纹；子房嫩绿色，花蕾时光亮无毛，后期则密被短柔毛，胚珠6-7；
果：	荚果扁，窄长圆形，绿色，长4-8厘米，宽1-1.2厘米，翅宽约1.5毫米，顶端急尖或短渐尖，喙细而弯曲，基部长渐尖，两侧缝线对称或近对称；果颈长2-4毫米；
种子：	种子2-6，宽长圆形，长5-6毫米，黑褐色，光亮；
生态习性
国内产地：	东南部、北至河北、南至广东、广西、西至云南、四川、西北至陕西、东至浙江、江苏和山东等省区；
生境：	为一常见的栽培植物，多植于庭园、屋旁、寺街边，少数密林或石灰岩地区；
物候期：	花期3-4月，果期8-10月；
功用价值
经济价值：	本种是一美丽的木本花卉植物；树皮可入药，有清热解毒，活血行气，消肿止痛之功效，可治产后血气痛、疗疮肿毒、喉痹；花可治风湿筋骨痛；
植物文化：	
风吹紫荆树，色与春庭暮；

花落辞故枝，风回返无处；

骨肉恩书重，漂泊难相遇；

犹有泪成河，经天复东注；

——唐 杜甫《得舍弟消息》`
}, {
  id: 3,
  image:"../../sources/img/iplant-lizhi.jpg",
  title: `荔枝`,
  content: `形态特征
  生活型：	常绿乔木；
  株：	高达10(-15)米；
  茎：	树皮灰黑色；
  枝：	小枝密生白色皮孔；
  叶：	小叶2-3(4)对，披针形、卵状披针形或长椭圆状披针形，长6-15厘米，宽2-4厘米，先端骤尖或短尾尖，全缘，下面粉绿色，两面无毛，侧脉纤细，上面不明显，下面明显或稍凸起；小叶柄长7-8毫米；
  花：	花序多分枝；花梗纤细，长2-4毫米，有时粗短；萼被金黄色短绒毛；雄蕊6-7(8)；
  果：	果卵圆形或近球形，长2.5-3.5厘米，熟时常暗红至鲜红色；
  种子：	种子全为肉质假种皮包被；
  生态习性
国内产地：	西南部、南部和东南部，尤以广东和福建南部栽培最盛；
国外分布：	亚洲东南部也有栽培，非洲、美洲和大洋洲都有引种的记录；
物候期：	花期春季，果期夏季；
  `
}]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //纬度
    latitude: 22.59163,
    //经度
    longitude: 113.972654,
    scale: 18,
    markers: [{
      id: 1,
      latitude: '22.59163',
      longitude: '113.972654',
      width: 50,
      height: 50,
      iconPath: '/sources/img/zijing.png',
      callout: {
        content: "宫粉羊蹄甲",
        color: "#000",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        padding: 5,
        textAlign: "center",
        display: "ALWAYS"
      }
    }, {
      id: 2,
      latitude: '22.59193',
      longitude: '113.972654',
      width: 50,
      height: 50,
      iconPath: '/sources/img/zijing.png',
      callout: {
        content: "紫荆",
        color: "#000",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        padding: 5,
        textAlign: "center",
        display: "ALWAYS",
      }
    }, {
      id: 3,
      latitude: '22.59193',
      longitude: '113.971754',
      width: 50,
      height: 50,
      iconPath: '/sources/img/zijing.png',
      callout: {
        content: "荔枝",
        color: "#000",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        padding: 5,
        textAlign: "center",
        display: "ALWAYS",
      }
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
    const markerDetail = detailArray[markerId - 1];
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