// components/barrage/barrage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    emojiBarrage: {
      type: Object,
      value: {
        show: true,
        emojiArray: [
        // {
        //   emojiText:"\u{1F62D}",
        //   emojiLeft:100,
        //   emojiDelay:2000,
        //   emojiMidX:150,
        //   emojiMidRotate:30,
        //   emojiEndX:100
        // }
      ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onEmojiChanged: function (emoji) {
      console.log("onEmojiChanged")
      console.log(emoji)
      // var animation = wx.createAnimation({
      //   duration: 500,
      //   timingFunction: 'ease-in-out',
      //   delay:0
      // })
      // animation.translateY(200).translateX(30).step()
      // animation.translateY(400).translateX(0).step()
      // animation.translateY(600).translateX(-20).step()
      // animation.opacity(0).step

      // const emojiLength = this.properties.emojiBarrage.emojiArray.length-1
      // this.setData({
      //   ['emojiBarrage.emojiArray['+emojiLength+'].animationData']:animation.export()
      // })
      // console.log(this.properties.emojiBarrage.emojiArray[this.properties.emojiBarrage.emojiArray.length-1])
    },
  },
  observers:{
    // 'emojiBarrage':function(emojiBarrage){
    //   console.log('emojichanged')
    //   this.onEmojiChanged(this.properties.emojiBarrage.emojiArray[this.properties.emojiBarrage.emojiArray.length-1])
    // }
  }
})