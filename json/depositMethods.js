export default [
  {
    name: "扫码支付",
    logo: {
      default: "scanpay-ico-0.png",
      active: "scanpay-ico-1.png"
    },
    deposit_option: {
      option: [
        {
          logo: [
            {
              default: "QQpay-ico-0.png",
              active: "QQpay-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "QQ钱包扫码通道 A1",
          recommend: 1,
          id: 1,
          banks: [],
          max_deposit: 10,
          min_deposit: 1000
        },
        {
          logo: [
            {
              default: "QQpay-ico-0.png",
              active: "QQpay-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "QQ钱包扫码通道 A2",
          recommend: 0,
          id: 2,
          banks: []
        },
        {
          logo: [
            {
              default: "QQpay-ico-0.png",
              active: "QQpay-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "QQ钱包扫码通道 A3",
          recommend: 0,
          id: 3,
          banks: []
        },
        {
          logo: [
            {
              default: "QQpay-ico-0.png",
              active: "QQpay-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "QQ钱包扫码通道 A4",
          recommend: 0,
          id: 4,
          banks: []
        },
        {
          logo: [
            {
              default: "QQpay-ico-0.png",
              active: "QQpay-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "QQ钱包扫码通道 A5",
          recommend: 0,
          id: 5,
          banks: []
        },
        {
          logo: [
            {
              default: "Unionpay-ico-0.png",
              active: "Unionpay-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "银联钱包扫码通道 B1",
          recommend: 0,
          id: 6,
          banks: []
        },
        {
          logo: [
            {
              default: "JDpay-ico-0.png",
              active: "JDpay-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "京东钱包扫码通道 C1",
          recommend: 0,
          id: 7,
          banks: []
        }
      ]
    },
    type: "online"
  },
  {
    name: "扫码转账",
    logo: {
      default: "scanpay-ico-0.png",
      active: "scantransfer-ico-1.png"
    },
    deposit_option: {
      option: [
        {
          logo: [
            {
              default: "alipay2-ico-0.png",
              active: "alipay2-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "支付宝扫码通道 C1",
          id: 8,
          recommend: 1,
          banks: []
        },
        {
          logo: [
            {
              default: "alipay2-ico-0.png",
              active: "alipay2-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "支付宝扫码通道 C1",
          id: 9,
          recommend: 0,
          banks: []
        },
        {
          logo: [
            {
              default: "wepay-ico-0.png",
              active: "wepay-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "微信支付扫码通道 D1",
          id: 10,
          recommend: 0,
          banks: []
        },
        {
          logo: [
            {
              default: "wepay-ico-0.png",
              active: "wepay-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "微信支付扫码通道 D1",
          id: 11,
          recommend: 0,
          banks: []
        }
      ]
    },
    type: "offline"
  },
  {
    name: "网银转账",
    logo: {
      default: "alipay-ico-0.png",
      active: "alipay-ico-1.png"
    },
    deposit_option: {
      option: [
        {
          logo: [
            {
              default: "alipay-ico-0.png",
              active: "alipay-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "网银转账通道 E1",
          id: 12,
          recommend: 1,
          banks: [
            { bank_name: "中国农业银行", logo: "ico-ABC.png", id: 1 },
            { bank_name: "中国建设银行", logo: "ico-CCB.png", id: 2 },
            { bank_name: "中国银行", logo: "ico-BOC.png", id: 3 },
            { bank_name: "招商银行", logo: "CMB-ico-1.png", id: 4 },
            { bank_name: "中国工商银行", logo: "ICBC-ico-1.png", id: 5 },
            { bank_name: "交通银行", logo: "ico-BOCOM.png", id: 6 },
            { bank_name: "中国光大银行", logo: "ico-CEB.png", id: 7 },
            { bank_name: "广发银行", logo: "ico-CGB.png", id: 8 },
            { bank_name: "中国民生银行", logo: "ico-CMBC.png", id: 9 },
            { bank_name: "中国邮政储蓄银行", logo: "ico-PSBC.png", id: 10 },
            { bank_name: "中信银行", logo: "ico-CITIC.png", id: 11 }
          ]
        },
        {
          logo: [
            {
              default: "alipay-ico-0.png",
              active: "alipay-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "网银转账通道 E2",
          id: 13,
          recommend: 1,
          banks: [
            { bank_name: "Bank 1", logo: "ico-ABC.png", id: 16 },
            { bank_name: "Bank 2", logo: "ico-CEB.png", id: 27 }
          ]
        }
      ]
    },
    type: "online-banking"
  },
  {
    name: "线下支付",
    logo: {
      default: "offlinepay-ico-0.png",
      active: "offlinepay-ico-1.png"
    },
    deposit_option: {
      option: [
        {
          logo: [
            {
              default: "CMB-ico-0.png",
              active: "CMB-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "线下支付通道 F1",
          id: 14,
          recommend: 1,
          banks: [{ bank_name: "Bank 3", logo: "ico-BOCOM.png", id: 12 }]
        },
        {
          logo: [
            {
              default: "ICBC-ico-0.png",
              active: "ICBC-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "线下支付通道 F2",
          id: 15,
          recommend: 0,
          banks: [{ bank_name: "Bank 4", logo: "ico-CGB.png", id: 13 }]
        },
        {
          logo: [
            {
              default: "ICBC-ico-0.png",
              active: "ICBC-ico-1.png"
            }
          ],
          type: "存款通道",
          name: "线下支付通道 F3",
          id: 16,
          recommend: 0,
          banks: [{ bank_name: "Bank 5", logo: "ico-PSBC.png", id: 14 }]
        }
      ]
    },
    type: "offline-banking"
  }
];
