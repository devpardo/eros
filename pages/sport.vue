<template>
  <section class="sport static-navbar-page-margin text-center" :style="{ backgroundImage: `url(${MEDIA_SERVER}/web/sport/${bgImg})` }">
    <div class="container">
      <div class="scroll">
        <div class="sport-content">
          <form id="sportForm" name="sportForm" method="post" action="/sport.php" enctype="application/x-www-form-urlencoded">
            <input type="hidden" name="sportForm" value="sportForm">
            <iframe src="http://sb.mr2009.com/Sportsbook/Launch?g=CHS&amp;tz=GMT+%2b08%3a00" width="1020" height="680" frameborder="0" style="padding-bottom:30px; background:#fff;"></iframe><input type="hidden" name="javax.faces.ViewState" id="javax.faces.ViewState" value="-470468086408759091:3318247770103313562" autocomplete="off">
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    inject: ["MEDIA_SERVER"],
    data() {
      return {
        bgImg: "sportsbook-bg.jpg"
      };
    }
  };
</script>

<style lang="sass">
  @import './assets/sass/_variables'

  .sport
    min-height: $sport-page-min-height
    background:
      repeat: no-repeat
      position: top center
      color: $sport-background-color
      size: cover

    .container .sport-content
      margin-top: 20px
      background-color: #fff

  @media (max-width: 1024px)
    .scroll
      margin-top: 20px
      overflow-x: scroll
      overflow-y: hidden
      min-height: 769px
      white-space:nowrap

      .sport-content
        width: 1020px
</style>
