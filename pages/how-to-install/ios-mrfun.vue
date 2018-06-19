<template>
    <div class="col-md-9 col-sm-9 col-xs-12 custom-padding-none mobile-container">
        <div class="panel-group">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        亿万客户端 — iOS 版安装流程
                    </h4>
                </div>
                <div id="collapse1" class="panel-collapse collapse in">
                    <div class="panel-body custom-padding-none">
                        <p>由于苹果 IOS9版本中升级了证书信任机制, 如果您的设备是IOS9版本, 在首次安装iOS版亿万手机App时, 需要对证书进行一个信任的操作。</p>
                        <p>1. 打开 IOS设备上的“亿万手游”App时提示"未受信任的企业级开发者",选择取消。</p>
                        <p><img src="//cdn.mr007.co/images/web/static/img-04.jpg"></p>
                        <p>2. 打开设置 => 通用=> 描述文件</p>
                        <p><img src="//cdn.mr007.co/images/web/static/img-05.jpg"></p>
                        <p>3. 找到和弹窗对应名称的项目后, 点击信任即可 (注意这里, 有分个人证书和企业级证书, 大部分的应用使用的都是企业级证书)，认证完成后就可以回到主页面进入“亿万手游”开始游戏。</p>
                        <p><img src="//cdn.mr007.co/images/web/static/img-06.jpg"><img src="//cdn.mr007.co/images/web/static/img-07.jpg"></p>
                        <p><img src="//cdn.mr007.co/images/web/static/img-08.jpg"><img src="//cdn.mr007.co/images/web/static/img-09.jpg"></p>
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

    .how-to-note
        background-color: #eeeeee
        color: #CB202D
        margin-bottom: 10px
        margin-top: 10px
        display: block
        padding: 10px

    .red-text
        color: #f00
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
