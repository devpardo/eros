<template>
    <div class="col-md-9 col-sm-9 col-xs-12 custom-padding-none mobile-container">
        <div class="panel-group">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        PT 客户端 — 桌面版安装流程
                    </h4>
                </div>
                <div id="collapse1" class="panel-collapse collapse in">
                    <div class="panel-body custom-padding-none">
                        <p>在下载区选择“桌面版”的“PT客户端”，点击“下载”按钮，将进入新页面获取安装包</p>
                        <p>1. 在下载区选择“桌面版”的“PT客户端”，点击“下载”按钮，将弹出下载页面</p>
                        <p><img src="https://cdn.mr007.co/images/web/static/img-10.jpg" class="img-responsive"></p>
                        <p>2. 进入新页面后在自动弹出框中直接下载安装包</p>
                        <p><img src="https://cdn.mr007.co/images/web/static/img-11.jpg" class="img-responsive"></p>
                        <p>3. 下载完安装包：setupglx.zip 后，可直接打开“setupglx.exe”并安装，或者用压缩包工具解压至文件夹后打开来安装。</p>
                        <p><img src="https://cdn.mr007.co/images/web/static/img-12.jpg" class="img-responsive"></p>
                        <p>4. 打开“setupglx.exe”后会根据系统语言为您匹配简体中文版，点“OK”继续安装</p>
                        <p><img src="https://cdn.mr007.co/images/web/static/img-13.jpg" class="img-responsive"></p>
                        <p>5. 安装完成，输入账号开启您的游戏之旅吧！</p>
                        <p><img src="https://cdn.mr007.co/images/web/static/img-14.jpg" class="img-responsive"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
  .panel-info
    border-color: #ffffff
    .panel-heading
      background: #ffffff
      color: hsl(200, 49%, 38%)
      border: 1px solid hsl(200, 42%, 75%)
      padding: 12px 15px
      border-top-left-radius: 0
      border-top-right-radius: 0

  .panel-info>.panel-heading+.panel-collapse>.panel-body
    border-top-color: #ffffff

  .panel
    margin-bottom: 20px
    background-color: hsl(0, 0%, 100%)
    border-radius: 4px
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0)

  .help-title
    color: hsl(203, 65%, 36%)
    margin-top: 0
    margin-bottom: 15px

  .help-head-title
    color: hsl(203, 65%, 36%)
    padding-bottom: 10px
    margin-top: 0

  h4.title
    color: hsl(203, 65%, 36%)
    margin-bottom: 20px

  @media (max-width: 414px)
    .panel-body
      padding-top: 7px !important
</style>
