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
        "\u{1F338}"
      ]
    }
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
      // 接收按钮数据,显示新的表情
      this.triggerEvent('addEmoji')
      let emoji = event.currentTarget.dataset.emoji;
      emoji = emoji;
      console.log(emoji)
      console.log(this.data.emojiDetail.emojiArray)
      this.setData({
        'emojiDetail.emojiArray': this.data.emojiDetail.emojiArray.concat(emoji)
      })
    },
    resetData() {
      this.setData({
        'emojiDetail.emojiArray': [
          "\u{1F338}"
        ]
      });
    }
  },
  onload: function () {

  }
})