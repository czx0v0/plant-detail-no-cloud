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
        emojiArray: [{
          emojiText: "\u{1F62D}",
          emojiDirection: 1,
          emojiTime: 6,
          animationData: {},
        }]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData1: {}
  },
  // onShow: function () {
  //   this.animate('.barrage', [{
  //       opacity: 1.0,
  //       rotate: 45,
  //       translateY: 300
  //     },
  //     {
  //       opacity: 0,
  //       rotate: 180,
  //       translateY: 100
  //     }
  //   ], 5000, function () {
  //     this.clearAnimation('.barrage', function () {
  //       console.log('clear!')
  //     })
  //   }.bind())
  // },
  lifetimes: {
    // attached: function () {
    //   // console.log("hello")
    //   // this.animate('.barrage', [{
    //   //     opacity: 1.0,
    //   //     rotate: 45,
    //   //     translateY: 500
    //   //   },
    //   //   {
    //   //     opacity: 0,
    //   //     rotate: 180,
    //   //     translateY: -100
    //   //   }
    //   // ], 5000, function () {
    //   //   this.clearAnimation('.barrage', {
    //   //     opacity: true,
    //   //     translateY: true,
    //   //     Y: true
    //   //   }, function () {
    //   //     console.log('clear!')
    //   //   })
    //   // }.bind(this))

    //   var animation = wx.createAnimation({
    //     duration: 5000,
    //     timingFunction: 'ease-in-out'
    //   })
    //   this.animation = animation
    //   animation.scale(2, 2).rotate(90).step()
    //   animation.scale(1).rotate(0).step()
    //   this.setData({
    //     animationData1: animation.export()
    //   })
    //   setTimeout(function () {
    //     animation.translate(30).step()
    //     this.setData({
    //       animationData1: animation.export()
    //     })
    //   }.bind(this), 1000)
    // }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // onshow: function () {
    //   //   const emojiStyle = `
    //   //   animation:random-animation 5s forwards;--fallDirectionX:50px;
    //   // `
    //   var animation = wx.createAnimation({
    //     duration: 5000,
    //     timingFunction: 'ease-in-out'
    //   })
    //   this.animation = animation
    //   animation.scale(2, 2).rotate(90).step()
    //   this.setData({
    //     animationData: animation.export()
    //   })
    //   setTimeout(function () {
    //     animation.translate(30).step()
    //     this.setData({
    //       animationData: animation.export()
    //     })
    //   }.bind(this), 1000)
    // },
    // rotateAndScale:function(){
    //   this.animation.rotate(45).scale(2,2).step()
    //   this.setData({
    //     animationData:this.animation.export()
    //   })
    // },

    // emojiAnimation:function(emojiIndex){
    //   const animation = wx.createAnimation({
    //     duration: 5000,
    //     timingFunction: 'ease-in-out'
    //   })
    //   animation.translateY(300).step()

    // }
    onEmojiChanged: function (emoji) {
      console.log("onEmojiChanged")
      console.log(emoji)
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-in-out',
        delay:0,
      })
      animation.translateY(200).translateX(30).step()
      animation.translateY(400).translateX(0).step()
      animation.translateY(600).translateX(-20).step()

      const emojiLength = this.properties.emojiBarrage.emojiArray.length-1
      this.setData({
        ['emojiBarrage.emojiArray['+emojiLength+'].animationData']:animation.export()
      })
      console.log(this.properties.emojiBarrage.emojiArray[this.properties.emojiBarrage.emojiArray.length-1])
    }
  },
  observers:{
    'emojiBarrage':function(emojiBarrage){
      console.log('emojichanged')
      this.onEmojiChanged(this.properties.emojiBarrage.emojiArray[this.properties.emojiBarrage.emojiArray.length-1])
    }
  }
})