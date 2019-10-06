<template>
	<div>
		<swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
		
		 <ul class="mui-table-view mui-grid-view mui-grid-8">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		                    <img src="../../images/1536591.jpg" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="../../images/1536595.jpg" alt="">
		                    <div class="mui-media-body">资料分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <img src="../../images/1536605.jpg" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img src="../../images/1536625.jpg" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/1536631.jpg" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img src="../../images/1536647.jpg" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		            
		        </ul> 
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	import swiper from '../subcomponents/swiper.vue'
	
	export default{
		data(){
			return{
				lunbotuList:[]
			};
		},
		created(){
			this.getLunbotu();
		},
		methods:{
			getLunbotu(){
				this.$http.get('api/getlunbo').then(result=>{
					/* console.log(result.body) */
					if(result.body.status==0){
						this.lunbotuList=result.body.message;
					}else{
						Toast('加载轮播图失败')
					}
				})
			}
		},
		components:{
			swiper
		}
	}
</script>

<style lang="less" scoped>
	
	.mui-table-view.mui-grid-view{
		font-size: 13px;
		img{
			width: 60px;
			height: 60px;
		}
	}
	
</style>
