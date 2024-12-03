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
        image:"/sources/img/zijing.png",
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
        //   emojiLeft:100,
        //   emojiDelay:2000,
        //   emojiMidX:150,
        //   emojiMidRotate:30,
        //   emojiEndX:-100
        // }
      ]
    },
    emojiShow:true,
    emojiListShowOn:false,
    emojiCount:0,
    emojiAdded:false,
    heartCount:0,
    hearAdded:false,
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
    changeHeart:function(){
      if(!this.data.heartAdded){
        this.setData({
          heartAdded:true,
          heartCount:this.data.heartCount+1
        })
      }else{
        this.setData({
          heartAdded:false,
          heartCount:this.data.heartCount-1
        })
      }
      
    },
    addEmoji: function (event) {
      this.setData({
        emojiCount:this.data.emojiCount+1,
        emojiAdded: true
      })
      //设置每个弹幕的随机初始运动位置和延时
      // 随机生成表情初始位置和下落延时
      // 初始位置left值
      const left = Math.random()*300;
      // 动画延时
      const fallDelay = Math.random()*3000;
      // 中间位置X变化
      const midX = Math.random()*500-250;
      // 中间位置Rotate值
      const midRotate = Math.random()*300-150;
      // 终点位置X变化
      const endX = Math.random()*500-250;
      // 使用CSS动画代替
      // 接收按钮数据,显示新的表情
      this.triggerEvent('addEmoji')
      let emojiText = event.currentTarget.dataset.emoji;
      let emoji = {
        emojiText:emojiText,
        emojiLeft:left,
        emojiDelay:fallDelay,
        emojiMidX:midX,
        emojiMidRotate:midRotate,
        emojiEndX:endX,
      };
      console.log(emojiText)
      console.log(this.data.emojiDetail.emojiArray)
      this.setData({
        'emojiDetail.emojiArray': this.data.emojiDetail.emojiArray.concat(emoji)
      })
    },
    emojiListShow:function(){
      this.triggerEvent('emojiListShow');
      console.log('emojiListShow');
      if(this.data.emojiListShowOn == false){
        this.setData({
          emojiListShowOn:true
        })
      }else{
        this.setData({
          emojiListShowOn:false
        })
      }

    },
    resetData() {
      // this.setData({
      //   'emojiDetail.emojiArray': [  
      //   ]
      // });
    },
    emojiShow:function(){
      this.triggerEvent('emojiShow');
      if(this.data.emojiShow){
        this.setData({
          emojiShow:false
        })
      }else{
        this.setData({
          emojiShow:true
        })
      }
      
    }
  },
  onload: function () {

  }
})