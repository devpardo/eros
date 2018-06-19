import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _9b539d2c = () => import('../pages/promo.vue' /* webpackChunkName: "pages/promo" */).then(m => m.default || m)
const _92aa987a = () => import('../pages/uc.vue' /* webpackChunkName: "pages/uc" */).then(m => m.default || m)
const _2c77c7f4 = () => import('../pages/uc/index.vue' /* webpackChunkName: "pages/uc/index" */).then(m => m.default || m)
const _26470cf4 = () => import('../pages/uc/withdraw.vue' /* webpackChunkName: "pages/uc/withdraw" */).then(m => m.default || m)
const _a8a33e3e = () => import('../pages/uc/account.vue' /* webpackChunkName: "pages/uc/account" */).then(m => m.default || m)
const _68144cd2 = () => import('../pages/uc/deposit.vue' /* webpackChunkName: "pages/uc/deposit" */).then(m => m.default || m)
const _70c03b14 = () => import('../pages/uc/records.vue' /* webpackChunkName: "pages/uc/records" */).then(m => m.default || m)
const _67b788b1 = () => import('../pages/lobby.vue' /* webpackChunkName: "pages/lobby" */).then(m => m.default || m)
const _7f4fc15f = () => import('../pages/level.vue' /* webpackChunkName: "pages/level" */).then(m => m.default || m)
const _f2d65eb6 = () => import('../pages/fishing.vue' /* webpackChunkName: "pages/fishing" */).then(m => m.default || m)
const _8b999c0c = () => import('../pages/landing-page.vue' /* webpackChunkName: "pages/landing-page" */).then(m => m.default || m)
const _1bc6279b = () => import('../pages/how-to-install.vue' /* webpackChunkName: "pages/how-to-install" */).then(m => m.default || m)
const _45016444 = () => import('../pages/how-to-install/index.vue' /* webpackChunkName: "pages/how-to-install/index" */).then(m => m.default || m)
const _e93cf1f4 = () => import('../pages/how-to-install/ios-mrfun.vue' /* webpackChunkName: "pages/how-to-install/ios-mrfun" */).then(m => m.default || m)
const _7372ceec = () => import('../pages/how-to-install/ios-ag.vue' /* webpackChunkName: "pages/how-to-install/ios-ag" */).then(m => m.default || m)
const _5c22be79 = () => import('../pages/how-to-install/desktop-pt.vue' /* webpackChunkName: "pages/how-to-install/desktop-pt" */).then(m => m.default || m)
const _cb363674 = () => import('../pages/how-to-install/android-pt.vue' /* webpackChunkName: "pages/how-to-install/android-pt" */).then(m => m.default || m)
const _ffd5fc30 = () => import('../pages/how-to-install/android-ag.vue' /* webpackChunkName: "pages/how-to-install/android-ag" */).then(m => m.default || m)
const _eb5bd4bc = () => import('../pages/how-to-install/android-gg.vue' /* webpackChunkName: "pages/how-to-install/android-gg" */).then(m => m.default || m)
const _0b658ffc = () => import('../pages/how-to-install/desktop-app.vue' /* webpackChunkName: "pages/how-to-install/desktop-app" */).then(m => m.default || m)
const _5ef8a778 = () => import('../pages/how-to-install/ios-gg.vue' /* webpackChunkName: "pages/how-to-install/ios-gg" */).then(m => m.default || m)
const _0c159696 = () => import('../pages/cooperation.vue' /* webpackChunkName: "pages/cooperation" */).then(m => m.default || m)
const _3c7f56ce = () => import('../pages/cooperation/index.vue' /* webpackChunkName: "pages/cooperation/index" */).then(m => m.default || m)
const _e883da64 = () => import('../pages/cooperation/terms.vue' /* webpackChunkName: "pages/cooperation/terms" */).then(m => m.default || m)
const _890b96e2 = () => import('../pages/cooperation/privacy.vue' /* webpackChunkName: "pages/cooperation/privacy" */).then(m => m.default || m)
const _c578b560 = () => import('../pages/cooperation/financial.vue' /* webpackChunkName: "pages/cooperation/financial" */).then(m => m.default || m)
const _0ddc9438 = () => import('../pages/cooperation/disclaimer.vue' /* webpackChunkName: "pages/cooperation/disclaimer" */).then(m => m.default || m)
const _cf4967d8 = () => import('../pages/cooperation/affiliate.vue' /* webpackChunkName: "pages/cooperation/affiliate" */).then(m => m.default || m)
const _3bb8b49d = () => import('../pages/cooperation/faq.vue' /* webpackChunkName: "pages/cooperation/faq" */).then(m => m.default || m)
const _27a598af = () => import('../pages/cooperation/responsible-gaming.vue' /* webpackChunkName: "pages/cooperation/responsible-gaming" */).then(m => m.default || m)
const _2b7ac6e9 = () => import('../pages/new-cooperation.vue' /* webpackChunkName: "pages/new-cooperation" */).then(m => m.default || m)
const _c6e690c0 = () => import('../pages/forgot-password.vue' /* webpackChunkName: "pages/forgot-password" */).then(m => m.default || m)
const _69e376fd = () => import('../pages/download.vue' /* webpackChunkName: "pages/download" */).then(m => m.default || m)
const _7c0350d0 = () => import('../pages/register.vue' /* webpackChunkName: "pages/register" */).then(m => m.default || m)
const _25d40f2a = () => import('../pages/casino.vue' /* webpackChunkName: "pages/casino" */).then(m => m.default || m)
const _0921abe7 = () => import('../pages/game.vue' /* webpackChunkName: "pages/game" */).then(m => m.default || m)
const _3af41552 = () => import('../pages/mobile.vue' /* webpackChunkName: "pages/mobile" */).then(m => m.default || m)
const _afa05562 = () => import('../pages/sport.vue' /* webpackChunkName: "pages/sport" */).then(m => m.default || m)
const _9c3410a6 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/promo",
			component: _9b539d2c,
			name: "promo"
		},
		{
			path: "/uc",
			component: _92aa987a,
			children: [
				{
					path: "",
					component: _2c77c7f4,
					name: "uc"
				},
				{
					path: "withdraw",
					component: _26470cf4,
					name: "uc-withdraw"
				},
				{
					path: "account",
					component: _a8a33e3e,
					name: "uc-account"
				},
				{
					path: "deposit",
					component: _68144cd2,
					name: "uc-deposit"
				},
				{
					path: "records",
					component: _70c03b14,
					name: "uc-records"
				}
			]
		},
		{
			path: "/lobby",
			component: _67b788b1,
			name: "lobby"
		},
		{
			path: "/level",
			component: _7f4fc15f,
			name: "level"
		},
		{
			path: "/fishing",
			component: _f2d65eb6,
			name: "fishing"
		},
		{
			path: "/landing-page",
			component: _8b999c0c,
			name: "landing-page"
		},
		{
			path: "/how-to-install",
			component: _1bc6279b,
			children: [
				{
					path: "",
					component: _45016444,
					name: "how-to-install"
				},
				{
					path: "ios-mrfun",
					component: _e93cf1f4,
					name: "how-to-install-ios-mrfun"
				},
				{
					path: "ios-ag",
					component: _7372ceec,
					name: "how-to-install-ios-ag"
				},
				{
					path: "desktop-pt",
					component: _5c22be79,
					name: "how-to-install-desktop-pt"
				},
				{
					path: "android-pt",
					component: _cb363674,
					name: "how-to-install-android-pt"
				},
				{
					path: "android-ag",
					component: _ffd5fc30,
					name: "how-to-install-android-ag"
				},
				{
					path: "android-gg",
					component: _eb5bd4bc,
					name: "how-to-install-android-gg"
				},
				{
					path: "desktop-app",
					component: _0b658ffc,
					name: "how-to-install-desktop-app"
				},
				{
					path: "ios-gg",
					component: _5ef8a778,
					name: "how-to-install-ios-gg"
				}
			]
		},
		{
			path: "/cooperation",
			component: _0c159696,
			children: [
				{
					path: "",
					component: _3c7f56ce,
					name: "cooperation"
				},
				{
					path: "terms",
					component: _e883da64,
					name: "cooperation-terms"
				},
				{
					path: "privacy",
					component: _890b96e2,
					name: "cooperation-privacy"
				},
				{
					path: "financial",
					component: _c578b560,
					name: "cooperation-financial"
				},
				{
					path: "disclaimer",
					component: _0ddc9438,
					name: "cooperation-disclaimer"
				},
				{
					path: "affiliate",
					component: _cf4967d8,
					name: "cooperation-affiliate"
				},
				{
					path: "faq",
					component: _3bb8b49d,
					name: "cooperation-faq"
				},
				{
					path: "responsible-gaming",
					component: _27a598af,
					name: "cooperation-responsible-gaming"
				}
			]
		},
		{
			path: "/new-cooperation",
			component: _2b7ac6e9,
			name: "new-cooperation"
		},
		{
			path: "/forgot-password",
			component: _c6e690c0,
			name: "forgot-password"
		},
		{
			path: "/download",
			component: _69e376fd,
			name: "download"
		},
		{
			path: "/register",
			component: _7c0350d0,
			name: "register"
		},
		{
			path: "/casino",
			component: _25d40f2a,
			name: "casino"
		},
		{
			path: "/game",
			component: _0921abe7,
			name: "game"
		},
		{
			path: "/mobile",
			component: _3af41552,
			name: "mobile"
		},
		{
			path: "/sport",
			component: _afa05562,
			name: "sport"
		},
		{
			path: "/",
			component: _9c3410a6,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
