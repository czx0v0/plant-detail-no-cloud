// components/detail/detail.js
Component({
  /**
   * 组件的属性列表
   * 接收外部传来的数据
   */
  properties: {
    markerInfo: {
      type: Object,
      value: {
        show: false,
        title: "title",
        content: "content",
        image:"/sources/img/zijing.png"
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    emojiDetail: {
      show: true,
      emojiArray: [
        // {
        //   emojiText:"\u{1F62D}",
        //   emojiDirection:1,
        //   emojiTime:6,
        //   animationData:{},
        // }
      ]
    },
    emojiShow:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 方法
    backToMap() {
      // 点击返回
      this.setData({
        'markerInfo.show': false
      });
      this.resetData();
      // 接收按钮的数据
      this.triggerEvent('backToMap');
    },
    addEmoji: function (event) {
      //设置每个弹幕的随机初始运动方向
      const fallDirection = Math.random(1)>0.5?1:-1;//向左/向右
      const fallTime = Math.random()*3;

      var animation = wx.createAnimation({
        duration: 10,
        timingFunction: 'ease-in-out',
        delay:0
      })
      this.animation = animation
      this.animation.translateX(0).translateY(0).step()

      // 接收按钮数据,显示新的表情
      this.triggerEvent('addEmoji')
      let emojiText = event.currentTarget.dataset.emoji;
      let emoji = {
        emojiText:emojiText,
        emojiDirection:fallDirection,
        emojiTime:fallTime,
        animationData:this.animation.export(),
      };
      console.log(emojiText)
      console.log(this.data.emojiDetail.emojiArray)
      this.setData({
        'emojiDetail.emojiArray': this.data.emojiDetail.emojiArray.concat(emoji)
      })
    },
    emojiListShow:function(){
      this.triggerEvent('emojiListShow')
      console.log('emoji show')
      if(this.data.emojiShow == false){
        this.setData({
          emojiShow:true
        })
      }else{
        this.setData({
          emojiShow:false
        })
      }

    },
    resetData() {
      this.setData({
        'emojiDetail.emojiArray': [
          {
            emojiText:"\u{1F338}",
            emojiDirection:1,
            emojiTime:6,
            animationData:{}
          }
         
        ]
      });
    }
  },
  onload: function () {

  }
})