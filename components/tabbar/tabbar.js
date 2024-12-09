Component({
    properties: {
      selected: {
        type: Number,
        value: 0  // 默认选中第一个 tab
      }
    },
    methods: {
      onTabTap(e) {
        const index = e.currentTarget.dataset.index;
        this.triggerEvent('tabChange', { index });
      }
    }
  });
