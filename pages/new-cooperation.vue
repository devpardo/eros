<template>
  <section class="new-cooperation static-navbar-page-margin">
    <div class="container custom-padding">
      <p class="title"><img :src="`${MEDIA_SERVER}/cooperation/cooperation_icon.png`" alt="cooperation-icon" />加盟合作</p>
      <div class="list-item">      
        <ul class="list-inline promo-list">
          <li class="active">
            <a href="#about-us" data-toggle="tab">关于我们</a>
          </li>
          <li>
            <a href="#cooperation" data-toggle="tab">合作方案</a>
          </li>
          <li>
            <a href="#proxy-fqa" data-toggle="tab">代理FQA</a>
          </li>
          <li>
            <a href="#right-and-duty" data-toggle="tab">权利与义务</a>
          </li>
        </ul>
      </div>
      <div class="tab-content main-tab-content">
        <div class="tab-pane fade active in" id="about-us">
          <img class="img-responsive" :src="`${MEDIA_SERVER}/cooperation/about-us.png`" alt="about us content image" />
          <div class="content">
            <div class="content-data">
              <p>亿万先生成立于2014年，是亚洲最具竞争力的在线博彩服务娱乐公司。</p>
              <p>由菲律宾政府PAGCOR（Philippine Amusement and Gaming Corporation）所颁发的离岸博彩许可证并受其监管。</p>
            </div>
            <div class="content-data">
              <p>多年来我们始终贯彻诚信为本，务实经营的理念，秉承用户至上的原则，拥有了大批来自各国的朋友，正是有了各位朋友的支持，我们不断发展壮大，一步步走到今天。亿万先生热烈欢迎新朋友的加入，同时也希望得到老朋友的继续支持！我们的今天离不开各位的大力支持的结果，亿万先生将继续努力，竭诚为您奉献更好的游戏体验！</p>
            </div>
            <div class="content-data">
              <p>亿万先生全年365天，每天24小时为客户提供服务，用心为客户解决各种问题。亿万先生每天提供超过500种不同类别的精彩赛事，涵盖世界范围内主要体育运动，包括：足球、篮球、电子竞技、网球、棒球、桌球、高尔夫等。同时提供虚拟游戏、电子游戏、在线真人娱乐场服务。亿万先生严格遵守菲律宾政府要求，在政府财务管理当局的要求下指定存款、取款的专业公司，确保客户资金安全以及符合政府所规定的反洗钱法（AML）原则。同时，亿万先生也积极呼吁，博彩只是一种娱乐消遣的方式，建议玩家保持一个良好的游戏心态。</p>
            </div>
            <div class="content-data">
              <p>用户至上一向是我们秉承的原则！长久以来，亿万先生始终将用户放在第一位，未来的每一天我们将继续陪伴着您！</p>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="cooperation">
          <img class="img-responsive" :src="`${MEDIA_SERVER}/cooperation/cooperation.png`" alt="cooperation content image" />
          <div class="content">
            <div class="content-data">
              <p class="content-title">极具竞争力代理制度</p>
              <p>只需4步，立即开启人生财富，享受精彩人生。</p>
              <ol class="with-margin-top">
                <li>注册账号后，申请开通代理资格。</li>
                <li>联系代理专员，完善个人信息</li>
                <li>洽谈合作细节，获取专属佣金分红计划。</li>
                <li>开通完成，即刻推广。</li>
              </ol>
              <p class="with-margin-top">加入我们，并且根据您的推广方式来给您提供合适您的佣金结算方式。获得50%业内最高佣金！</p>
            </div>
            <div class="content-data">
              <p class="content-title">输赢模式 (全平台产品)</p>
              <div class="table-responsive with-margin-top">
                <table class="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>活跃玩家（人)</th>
                      <th>贡献利润（万元)</th>
                      <th>佣金比例</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>5</td>
                      <td>1 - 50,000</td>
                      <td>30%</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>50,001 - 200,000</td>
                      <td>35%</td>
                    </tr>
                    <tr>
                      <td>25</td>
                      <td>200,001 - 500,000</td>
                      <td>40%</td>
                    </tr>
                    <tr>
                      <td>50</td>
                      <td>500,001 - 1,000,000</td>
                      <td>45%</td>
                    </tr>
                    <tr>
                      <td>80</td>
                      <td>1,000,000+</td>
                      <td>50%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="with-margin-top">
                <!--<p>-->
                  <!--<span class="note">佣金计算：</span> 佣金=【（电子游戏/捕鱼/真人/体育*90%）-（存提款手续费*1%）-红利】*佣金比例</p>-->
                <!--<p>示例：【（1000*90%）-（100*1%）-50】*50%=424.5</p>-->
              </div>
            </div>
            <div class="content-data">
              <p class="content-title">存减提模式（电子&捕鱼)</p>
              <div class="table-responsive with-margin-top">
                <table class="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>活跃玩家</th>
                      <th>存款金额</th>
                      <th>佣金比例</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>5</td>
                      <td>1 - 100,000</td>
                      <td>25%</td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td>100,001 - 500,000</td>
                      <td>30%</td>
                    </tr>
                    <tr>
                      <td>30</td>
                      <td>500,001+</td>
                      <td>35%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="with-margin-top">
                <!--<p>-->
                  <!--<span class="note">佣金计算：</span> 佣金=【（累计存款金额-累计提款金额-账户剩余金额）-（存提款手续费*1%）-红利】*佣金比例</p>-->
                <!--<p>示例：【（10000-5000-500）-（100*1%）-50】*30%=1334.7</p>-->
              </div>
            </div>
            <div class="content-data">
              <p class="content-title">流水模式（真人&体育)</p>
              <div class="table-responsive with-margin-top">
                <table class="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>活跃玩家（人)</th>
                      <th>有效流水（万元)</th>
                      <th>佣金比例</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>5</td>
                      <td>1 - 20,000,000</td>
                      <td>0.10%</td>
                    </tr>
                    <tr>
                      <td>20</td>
                      <td>20,000,001+</td>
                      <td>0.15%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="with-margin-top">
                <!--<p>-->
                  <!--<span class="note">佣金计算：</span>佣金=有效流水*佣金比例</p>-->
              </div>
            </div>
            <div class="content-data">
              <p class="content-title">佣金结算规则</p>
              <ol>
                <li>佣金计算周期以自然月计算，次月5号前结算上月佣金。</li>
                <li>佣金最低发放金额300元，不足300元将继续累积。</li>
                <li>佣金会直接发放至您的代理账号中，您可以随时提取您的佣金。</li>
                <li>
                  <p>合作伙伴不得操控下线玩家任何操作行为，否则将取消合作资格并锁定佣金。</p>
                  <ol class="letters">
                    <li>批量注册下线会员数量以达到活跃用户要求。</li>
                    <li>操纵下线会员投注行为。</li>
                    <li>认定有套取佣金的任何行为。</li>
                  </ol>
                </li>
                <li>如您对佣金有任何疑问，也可以随时联系我们代理客服。</li>
                <li class="bold">QQ：441380007 2529368880</li>
                <li class="bold">E-mail：aff@mr007.com</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="proxy-fqa">
          <img class="img-responsive" :src="`${MEDIA_SERVER}/cooperation/prixy-fqa.png`" alt="proxy fqa content image" />
          <div class="content">
            <div class="content-data">
              <p class="content-title">亿万先生的权利</p>
              <p>点击“加盟合作”，详细阅读合作协议，并同意条款，立即注册代理账户，即可开通。</p>
            </div>
            <div class="content-data">
              <p class="content-title">亿万先生的权利</p>
              <ol>
                <li>佣金比例最高可达50%！还有专属佣金计算方式，合作伙伴也能自由投注平台游戏，赢取更多盈利！</li>
                <li>资金安全稳定，我们为您及时更新用户数据，例如：用户列表，访问信息，收益统计，统计分布等为您合作所必需的必要信息</li>
                <li>提供多种咨询服务通道：Skype、QQ、微信、邮箱、在线客服等即时工具，提供全天候的咨询服务。</li>
                <li>我们有丰富的游戏数量及行业一流的第三方合作伙伴，保证满足您的所有会员的娱乐需求！</li>
              </ol>
            </div>
            <div class="content-data">
              <p class="content-title">成为你们亿万先生的合作伙伴需要支付费用吗？</p>
              <p>不需要任何费用！当您确认愿意加入成为亿万先生合作伙伴后，只要联系代理专员填写相关信息即可。</p>
            </div>
            <div class="content-data">
              <p class="content-title">如何加入亿万先生的合作伙伴计划？</p>
              <p>只要您拥有广泛的人脉或拥有极佳的网络宣传能力和推广能力。阅读并同意我们的相关条款，点击“加入我们”，当您完成后联系我们的代理专员即可。</p>
            </div>
            <div class="content-data">
              <p class="content-title">如何查看我的下线情况？</p>
              <p>您可以登录您的代理后台，我们随时为您提供下线的账号情况。您可以查看用户输赢、投注记录、存提款等相关细节。</p>
            </div>
            <div class="content-data">
              <p class="content-title">我在推荐会员时需要注意什么？</p>
              <ol>
                <li>您所推荐的会员须在您正式成为合作伙伴之后。</li>
                <li>所推荐的会员在亿万先生的账号为正常状态下。</li>
                <li>合作伙伴本人产生的任何投注不计算代理佣金。</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="right-and-duty"><img class="img-responsive" :src="`${MEDIA_SERVER}/cooperation/right-and-duty.png`" alt="right and duty content image" />
          <div class="content">
            <div class="content-data">
              <p class="content-title">亿万先生的权利</p>
              <ol>
                <li>亿万先生代理计划属于一种合作营销计划，一项寻找“合作伙伴”的活动。鼓励拥有自己网站的个人及公司、推广我们这个最优质且具高度信用的博彩公司，成为亿万先生代理，为亿万先生提供客户，都可以从中获得相应的回报，实现共赢！</li>
                <li>在任何时间，亿万先生可以修改协议书上的任何条款，亿万先生会以电邮、网站公告、站内信等方式通知合作伙伴，修改内容可能包括如下：现有的净输赢范围，佣金比例，付款程序及参考 计划条例，合作伙伴必须遵守更改内容后的条款规则。</li>
                <li>亿万先生可根据公司发展，需要及发现合作伙伴有任何损害亿万先生的利益行为发生，随时终止合作伙伴的合作关系，或者在使用任何不诚实的方法以骗取亿万先生佣金会被永久冻结账户，所得佣金将不予发放。</li>
                <li>亿万先生有权要求合作伙伴在一些问题处理过程当中提供相关的有效证件及材料。</li>
              </ol>
            </div>
            <div class="content-data">
              <p class="content-title">亿万先生的义务</p>
              <ol>
                <li>亿万先生会对合作伙伴的表现定期审核，审核时间是从接受申请加入计划的时间开始计算，若多月无法持续满足相关条件，将有公司代理专员进行审核，审核结果将以提供的联系方式进行通知。</li>
                <li>亿万先生会对合作伙伴的下级玩家进行观察他们的账户状况，并保证绝不泄露合作伙伴及会员的个人信息。</li>
                <li>每月亿万先生会以合作伙伴提供的有效联系方式提供佣金情况，合作伙伴确认无误后，亿万先生会将佣金派发至合作伙伴的账户中。</li>
                <li>有关合作伙伴的一些问题及建议，亿万先生给予解答帮助和积极改善。</li>
              </ol>
            </div>
            <div class="content-data">
              <p class="content-title">合作伙伴的权利</p>
              <ol>
                <li>合作伙伴对账户的任何疑问可进行咨询，并要求亿万先生给予合理的解释。</li>
                <li>合作伙伴对自身的发展需要可对亿万先生进行合理化建议。</li>
                <li>合作伙伴提出合理的理由后有权要求亿万先生负责专员对其账户进行相关变更。</li>
              </ol>
            </div>
            <div class="content-data">
              <p class="content-title">合作伙伴的义务</p>
              <ol>
                <li>合作伙伴必须对下线玩家信息进行保密，不得在任何情况下传播会员的个人信息，代理所推荐的会员不能开设多于一个的账户。</li>
                <li>合作伙伴需尽其责任及力量广泛宣传、销售及推广亿万先生，以便使合作伙伴及亿万先生利益最大化。合作伙伴必须在不违反当地法律情况下，以正面形象宣传、销售及推广亿万先生。</li>
                <li>合作伙伴需自行承担相关推广过程中所产生的所有费用，在宣传、销售及推广以过程中不得使用未经授权使用的亿万先生广告（广告词）及链接。</li>
                <li>合作伙伴的自身的投注行为不可产生任何佣金计算。</li>
                <li>合作伙伴不得利用相关活动规则及非正常娱乐方式进行套取佣金的行为。</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  inject: ["MEDIA_SERVER"]
};
</script>

<style lang="sass" scoped>
  @import './assets/sass/_variables'
  .list-item
    width: 100%
    // overflow-x: scroll
    // overflow-y: hidden
    ul
      width: auto
      white-space: nowrap
  .new-cooperation
    padding: 30px 0 50px

    .container
      .main-tab-content
        .tab-content
          overflow: initial

    p.title
      margin-bottom: 30px
      color: $blue-13
      font-size: 24px

      img
        position: relative
        top: -2px
        margin-right: 5px

    ul.promo-list
      margin-left: 0
      width: 100%
      border-bottom: 1px solid $gray-lighter

      li
        position: relative
        padding: 0
        width: 135px

        &:not(:first-child)
          margin-left: 30px

        a
          font-size: 18px
          display: block
          color: $gray-light
          height: 38px
          text-align: center

        &.active
          &:before
            content: ''
            position: absolute
            bottom: -1px
            height: 3px
            width: 100%
            background: $blue-4

          a
            color: $blue-4

        &:hover:not(.active)
          &:before
            content: ''
            position: absolute
            bottom: -1px
            height: 1px
            width: 100%
            background: $blue-4

          a
            color: $blue-4

    .main-tab-content
      margin-top: 20px

      .tab-pane
        .content
          margin-top: 25px

          .content-data
            &:not(:first-of-type)
              margin-top: 40px

            .with-margin-top
              margin-top: 20px

            p.content-title
              font-size: 18px
              margin-bottom: 15px

            p:not(.content-title)
              line-height: 22px
              margin-bottom: 0

            p span.note
              color: red

            ol
              list-style: decimal
              margin-left: 17px

              &.letters
                list-style: upper-latin
                margin-left: 30px

              li
                font:
                  size: 14px
                  weight: 100
                line-height: 22px

                &.bold
                  font-weight: 500

            div.table-responsive
              box-shadow: 0 1px 8px rgba(0,0,0,.2)

              @media (min-width: 900px)
                overflow: hidden

              table.table
                border: none
                margin: 0

                thead tr th
                  background: $blue-13
                  color: white
                  border: none !important
  
  @media (max-width: 414px)
    .new-cooperation 
      padding: 10px 0 30px
      ul.promo-list 
        li
          width: 25%
          &:not(:first-child)
            margin-left: 0
          a
            font-size: 13px
</style>
