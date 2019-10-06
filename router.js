import VueRouter from 'vue-router'

//导入对应的路由组件
import homeContaner from './components/tabbar/homeContainer.vue'
import memmberContainer from './components/tabbar/memberContainer.vue'
import carContainer from './components/tabbar/carContainer.vue'
import searchContainer from './components/tabbar/scearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'


var router=new VueRouter({
	routes:[
		{path:'/',redirect:'/home'},
		{path:'/home',component:homeContaner},
		{path:'/member',component: memmberContainer},
		{path:'/car',component:carContainer},
		{path:'/search',component:searchContainer},
		{path:'/home/newslist',component:NewsList},
		{path:'/home/newsinfo/:id',component:NewsInfo},
		{path:'/home/photolist',component:PhotoList},
		{path:'/home/photoinfo/:id',component:PhotoInfo},
		{path:'/home/goodslist',component:GoodsList},
		{path:'/home/goodsinfo/:id',component:GoodsInfo},
		{path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
		{path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'}
	],
	linkActiveClass:'mui-active'
})

export default router
