# plant-detail-no-cloud
1. pages
  - detail 备用的细节页面（与componets重名）
  - logs 新建项目模版自动生成的地图日志
  - map 地图主页面
2. components
  - detail 植物信息卡片
  - barrage Emoji动画显示
3. project.config.json、project.private.config.json等文件已ignore
4. 未使用云空间存储图片文件
5. `&#x1F340;`emoji在开发者工具中显示乱码，但在手机端可以正常显示
6. 地图直接使用map组件，加上经纬度定位，没有获取用户位置

更新日志：
1201 zhixing
1. 更新了avatar界面（实际上实现的相当于是个人页面的头像和昵称选择功能）
  - 修改了avatar页面代码，增加可读性。把原本官方文档里的多余的导航栏设置删去。
  - 实现新版本的获取用户头像和昵称功能，并存储到本地缓存。
  - 可以点击头像和昵称进行修改。
  - 页面加载时可以查看本地是否有已缓存的头像和昵称。

  1202
  - 修改detail前端效果。
  - 整理图片资源。
  - 完成emoji随机动画，用了变量写法。
  - emoji增加至15个；实现了emoji计数和点赞功能。
  - 引入了手绘图，更新了在地图和detail上的显示图片。
  - 建立了可从avatar页面跳转的diyAvatar页面。
        