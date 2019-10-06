<template>
	<div class="goodsddesc-container">
		<h3>{{desc.title}}</h3>
		<hr>
		<div class="content" v-html="desc.content"></div>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return {
				desc:{},
				id:this.$route.params.id
			}
		},
		created(){
			this.getGoodsDesc();
		},
		methods:{
			getGoodsDesc(){
				this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
					if(result.body.status==0){
						this.desc=result.body.message[0];
					}else{
						Toast('获取商品信息失败')
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.goodsddesc-container{
		padding: 4px;
		h3{
			font-size: 16px;
			color: coral;
			text-align: center;
		}
		.content{
			margin: 0 3px;
			img{
				width: 100%;
			}
		}
	}
</style>
