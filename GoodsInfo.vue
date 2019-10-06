<template>
	<div class="goodsinfo-container">
		<transition
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter">
			<div class="ball" v-show="ballflasg" ref="ball"></div>
		</transition>
		
		<!-- 轮播图区域 -->
		<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="msg" :isfull="false"></swiper>
					</div>
				</div>
			</div>
		
		
		<!-- 购买区域 -->
		<div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							<span class="oldprice">市场价:￥<del>{{goodsinfo.market_price}}</del></span>&nbsp;&nbsp;&nbsp;&nbsp;
							销售价:￥<span class="nowprice">{{goodsinfo.sell_price}}</span>
						</p>
						<p>购买数量:<goodsinfo_num @getcount="getSelectedCount" :max="goodsinfo.stock_quantity">
						</goodsinfo_num></p>
						<p>
							<mt-button type="primary">立即购买</mt-button>
							<mt-button type="danger" @click="addcar">加入购物车</mt-button>
						</p>
					</div>
				</div>
			</div>
		
		
		
		<!--商品参数区域  -->
		<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{goodsinfo.goods_no}}</p>
						<p>库存情况:{{goodsinfo.stock_quantity}}</p>
						<p>上架时间:{{goodsinfo.add_time|dataFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
					<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
				</div>	
			</div>
		
	</div>
</template>

<script>
	import swiper from '../subcomponents/swiper.vue'
	import {Toast} from 'mint-ui'
	import goodsinfo_num from '../subcomponents/goodsinfo_num.vue'
	
	export default{
		data(){
			return {
				id:this.$route.params.id,
				msg:[],
				goodsinfo:[],
				ballflasg:false,
				selectedCount:1
			};
		},
		created(){
			this.getLunbo();
			this.getGoodsinfo();
		},
		methods:{
			getLunbo(){
				this.$http.get('api/getthumimages/'+this.id).then(result=>{
					if(result.body.status==0){
						result.body.message.forEach(item=>{
							item.img=item.src;
						});
						this.msg=result.body.message;
					}else{
						Toast('请求图片失败')
					}
				})
			},
			getGoodsinfo(){
				this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
					if(result.body.status==0){
						this.goodsinfo=result.body.message[0];
					}else{
						Toast('加载商品数据失败')
					}
				})
			},
			goDesc(id){
				//点击使用编程式导航跳转到图文介绍
				this.$router.push({name:'goodsdesc',params:{id}});
			},
			goComment(id){
				this.$router.push({name:'goodscomment',params:{id}} );
			},
			addcar(){
				this.ballflasg=!this.ballflasg;
				//凭借出一个保存到car数组里的数据
				var goodsinfo={id:this.id,count:this.selectedCount,price:this.goodsinfo.sell_price,	
				selected:true};
				//调用store中的mutations将商品加入购物车
				this.$store.commit('addToCar',goodsinfo);
			},
			beforeEnter(el){
				el.style.transform="translate(0,0)";
			},
			enter(el,done){
				el.offsetWidth;
				//获取小球在页面中的位置
				const ballPosition=this.$refs.ball.getBoundingClientRect();
				//获取徽标在页面中的位置
				const badgePosition=document.getElementById('badge').getBoundingClientRect();
				
				const xDist=badgePosition.left-ballPosition.left;
				const yDist=badgePosition.top-ballPosition.top;
				
				el.style.transform=`translate(${xDist}px,${yDist}px)`;
				el.style.transition='all 0.6s cubic-bezier(.4,-0.3,1,.68)';
				done()
			},
			afterEnter(el){
				this.ballflasg=!this.ballflasg;
			},
			getSelectedCount(count){
				//把子组件传递的值保存到data上
				this.selectedCount=count;
			}
		},
		components:{
			swiper,
			goodsinfo_num
		}
	}
</script>

<style lang="less" scoped>
	.goodsinfo-container{
		background-color: antiquewhite;
		overflow: hidden;
		.nowprice{
			color:red;
			font-size: 16px;
			font-weight: bold;
		}
		.ball{
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background-color:red;
			position: absolute;
			z-index: 99;
			top:411px;
			left:78px;
		}
	}
	.mui-card-footer{
		display: block;
		button{
			margin: 12px 0;
		}
			
	}
</style>
