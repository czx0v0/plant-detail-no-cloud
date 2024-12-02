// pages/map/map.js
//sdk

//植物信息来源：iplant.cn
const detailArray = [{
  id: 1,
  image:"cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/洋紫荆插画.png",
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
  image:"cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/sigsbaiyulan.jpg",
  title: `白玉兰`,
  content: `形态特征
生活型：	落叶乔木；
株：	高达25米，胸径1米，枝广展形成宽阔的树冠；
茎：	树皮深灰色，粗糙开裂；小枝稍粗壮，灰褐色；冬芽及花梗密被淡灰黄色长绢毛；
枝：	冬芽及花梗密被淡灰色长绢毛；
叶：	叶纸质，倒卵形、宽倒卵形或、倒卵状椭圆形，基部徒长枝叶椭圆形，长10-15（18）厘米，宽6-10 (12)厘米，先端宽圆、平截或稍凹，具短突尖，中部以下渐狭成楔形，叶上深绿色，嫩时被柔毛，后仅中脉及侧脉留有柔毛，下面淡绿色，沿脉上被柔毛，侧脉每边8-10条，网脉明显；叶柄长1-2.5厘米，被柔毛，上面具狭纵沟；托叶痕为叶柄长的1/4-1/3；
花：	花蕾卵圆形，花先叶开放，直立，芳香，直径10-16厘米；花梗显著膨大，密被淡黄色长绢毛；花被片9片，白色，基部常带粉红色，近相似，长圆状倒卵形，长6-8（10）厘米，宽2.5-4.5（6.5）厘米；雄蕊长7-12毫米，花药长6-7毫米，侧向开裂；药隔宽约5毫米，顶端伸出成短尖头；雌蕊群淡绿色，无毛，圆柱形，长2-2.5厘米；雌蕊狭卵形，长3-4毫米，具长4毫米的锥尖花柱；
果：	聚合果圆柱形（在庭园栽培种常因部分心皮不育而弯曲），长12-15厘米，直径3.5-5厘米；蓇葖厚木质，褐色，具白色皮孔；
种子：	种子心形，侧扁，高约9毫m，宽约10毫m，外种皮红色，内种皮黑色；
生态习性
国内产地：	江西（庐山）、浙江（天目山）、湖南（衡山）、贵州；现全国各大城市园林广泛栽培；
生境：	林中；
海拔：	500-1000m；
物候期：	一年开花两次，花期2~3月和7~9月，果期8~9月；
功用价值
经济价值：	材质优良，纹理直，结构细，供家具、图板、细木工等用；花蕾入药与“辛夷”功效向；花含芳香油，可提取配制香精或制浸膏；花被片食用或用以熏茶；种子榨油供工业用；早春白花满树，艳丽芳香，为驰名中外的庭园观赏树种；
植物文化：	《题玉兰》
 明 沈周
 翠条多力引风长，点破银花玉雪香；
 韵友自知人意好，隔帘轻解白霓裳；
`
}, {
  id: 3,
  image:"cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/sigsjidanhua.jpg",
  title: `鸡蛋花`,
  content: `形态特征
  生活型：	落叶小乔木；
  株：	高达8米；
  茎：	树皮淡绿色，平滑；
  叶：	叶厚纸质，椭圆形或窄长椭圆形，长14-30厘米，先端骤尖或渐尖，下面淡绿色，两面无毛，侧脉30-40对；叶柄长4-7.5厘米；
  花：	花冠稍淡红或紫红色，径4-6厘米，花冠裂片淡红、黄或白色，基部黄色，长3-4.5厘米，宽1.5-2.5厘米，斜展；
  果：	蓇葖双生，广歧，圆筒形，向端部渐尖，长约11厘米，直径约1.5厘米，绿色，无毛；种子斜长圆形，扁平，长2厘米，宽1厘米，顶端具膜质的翅，翅长约2厘米；
  染色体：	2n=36；
  生态习性
国内产地：	我国南部有栽培，常见于公园，植物园栽培观赏；
国外分布：	原产于南美洲，现广植于亚洲热带和亚热带地区；
物候期：	花期3-9月，果期6-12月；
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
      width: 80,
      height: 50,
      iconPath: 'cloud://test1-9grfsypr0a1c2939.7465-test1-9grfsypr0a1c2939-1330285442/洋紫荆插画.png',
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
        content: "白玉兰",
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
        content: "鸡蛋花",
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