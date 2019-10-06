<template>
	<div class="goods-list">
		<router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id">
			<img :src="item.img_url" alt="">
			<h1 class="title">{{item.title}}</h1>
			
			<div class="info">
				<p class="price">
					<span class="now">￥{{item.sell_price}}</span>
					<span class="old">￥{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩余:{{item.stock_quantity}}</span>
				</p>
			</div>
		</router-link>
		<mt-button type="danger" size="large" @click="getMore()" >加载更多</mt-button>
		
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return {
				pageindex:1,
				goodslist:[]
			}
		},
		created(){
			this.getGoodsList()
		},
		methods:{
			getGoodsList(){
				this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
					if(result.body.status==0){
						/* this.goodslist=result.body.message; */
						this.goodslist=this.goodslist.concat(result.body.message);//实现拼接
					}else{
						Toast('加载商品列表失败')
					}
				})
			},
			getMore(){//调用函数
				this.pageindex++;
				this.getGoodsList();
			}
		}
	}
</script>

<style lang="less" scoped>
	.goods-list{
		display: flex;
		flex-wrap: wrap;
		padding: 8px;
		justify-content: space-between;
		.goods-item{
			width: 49%;
			border: 1px solid greenyellow;
			box-shadow: 0 0 1px green;
			margin-top: 3px;
			margin-bottom:3px; 
			padding: 2px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			min-height: 293px;
			img{
				width: 100%;
			}
		}
		.title{
			font-size: 14px;
		}
		.info{
			background-color: antiquewhite;
			p{
				margin: 0;
				padding: 5px;
			}
			.price{
				.now{
					color: red;
					font-size: 16px;
					font-weight: bold;
				}
				.old{
					font-size: 8px;
					text-decoration: line-through;
					margin: 10px;
				}
			}
			.sell{
				display: flex;
				justify-content: space-between;
				margin: 0 10px;
				font-size: 10px;
			}
		}
	}
</style>
