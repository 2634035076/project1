//入口文件
import Vue from 'vue'

//引入路由包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)

//注册Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car =JSON.parse(localStorage.getItem('car')||'[]')
var store =new Vuex.Store({
	state:{//this.$store.atate.***
		car:car//将购物车里的商品数据用数组存起来
	},
	mutations:{//this.$store.commit('方法名称','按需传递唯一的参数')
		addToCar(state,goodsinfo){ //点解加入购物车，把GoodsInfo里的对象保存到car上
			var flag=false;
			
			state.car.some(item=>{
				if(item.id==goodsinfo.id){
					item.count+=parseInt(goodsinfo.count);
					flag=true 
					return true;
				}
			})
			if(!flag){
				state.car.push(goodsinfo)
			}
			
			//当更新car之后，把car数组存储到本地的localstorage
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsInfo(state,goodsinfo){
			state.car.some(item=>{
				if(item.id==goodsinfo.id){
					item.count=parseInt(goodsinfo.count)
					return true
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		removeFromCar(state,id){
			state.car.some((item,i)=>{
				if(item.id==id){
					state.car.splice(i,1)
					return true;
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsSelected(state,info){
			state.car.some(item=>{
				if(item.id==info.id){
					item.selected=info.selected
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		}
	},
	//提供数据给别人用
	getters:{//this.$store.getters.***
		getAllCount(state){
			var c=0;
			state.car.forEach(item=>{
				c+=item.count;
			})
			return c;
		},
		getGoodsCount(state){
			var o={}
			state.car.forEach(item=>{
				o[item.id]=item.count
			})
			return o;
		},
		getGoodsSelected(state){
			var o={}
			state.car.forEach(item=>{
				o[item.id]=item.selected
			})
			return o
		},
		getGoodsCountAndAmount(state){
			var o={
				count:0,
				amount:0
			}
			state.car.forEach(item=>{
				if(item.selected){
					o.count+=item.count
					o.amount+=item.price*item.count
				}
			})
			return o
		}
	}
})

//导入vue-resource
//安装vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求根路径
Vue.http.options.root='http://www.liulongbin.top:3005'
//全局设置post表单数据组织形式
Vue.http.options.emulateJSON=true;

//安装图片预览插件
 import VuePreview from 'vue-preview'
Vue.use(VuePreview)


//导入时间插件
import moment from 'moment'
//设置实践全局过滤器
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern)
})


//按需导入mint-ui组件
/* import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Button.name,Button)
Vue.use(Lazyload) */
import MintUi from 'mint-ui'
Vue.use(MintUi)
import 'mint-ui/lib/style.css'

//按需引入mint-ui搜索组件
import { Search } from 'mint-ui';
Vue.component(Search.name, Search);

//导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入自己的路由模块
import router from './router.js'

//导入app根组件
import app from './App.vue'

var vm=new Vue({
	el:'#app',
	render:c=>c(app),
	router,//挂载路由对象
	store//挂载store
})