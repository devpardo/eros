<template>
    <div class="col-md-9 col-sm-9 col-xs-12 custom-padding-none mobile-container">
        <div class="panel-group">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        亿万桌面版 — 安装流程
                    </h4>
                </div>
                <div id="collapse1" class="panel-collapse collapse in">
                    <div class="panel-body custom-padding-none">
                        <p>安装桌面版的亿万先生，请优先选择：360、火狐、QQ、UC、Google浏览器登录官网下载安装包，本教在360浏览器下进行演示。 安装流程如下：</p>
                        <p>1. 在“下载区”找到“桌面版”的“亿万桌面版”，点击下载，将弹出下载页面</p>
                        <p><img src="https://cdn.mr007.co/images/web/download/desktop_1.png" class="img-responsive"></p>
                        <p>2. 在下载页面中点击“下载”，并等待下载完毕</p>
                        <p><img src="https://cdn.mr007.co/images/web/download/desktop_2.png" class="img-responsive"></p>
                        <p>3. 下载完毕后打开安装包“mr007.exe”会自动为您安装亿万桌面版，安装完成后会在桌面新增“亿万先生”的快捷图标</p>
                        <p><img src="https://cdn.mr007.co/images/web/download/desktop_3.png" class="img-responsive"></p>
                        <p>4. 双击“亿万先生”快捷图标，即可开启您的游戏之旅！</p>
                        <p><img src="https://cdn.mr007.co/images/web/download/desktop_4.png" class="img-responsive"></p>
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
