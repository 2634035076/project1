<template>
	<div class="car-container">
		<!-- 商品区域 -->
		<div class="goodslist">
			<div class="mui-card" 	v-for="(item,i) in goodsList" :key="item.id">
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
							@change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
							<img src="item.thumb_path">
							
							<div class="info">
								<h1>{{item.title}}</h1>
								<p class="jige">
									<span class="price">{{item.sell_price}}</span>
									<numbox class="anniu" :initcount="$store.getters.getGoodsCount[item.id]"
									:goodsid="item.id"></numbox>
									<a herf="#" @click.prevent="remove(item.id,i)">删除</a>
								</p>
							</div>
							
						</div>
					</div>
				</div>
		</div>
		
		<!-- 计算区域 -->
		<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
							<p>总计(不含运费)</p>
							<p>已勾选 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件,
							  总价: {{$store.getters.getGoodsCountAndAmount.amount}}
							   <span class="red"></span></p>
						</div>
						<mt-button type="danger">结算</mt-button>
					</div>
					
				</div>
			</div>
		
	</div>
</template>

<script>
	import numbox from '../subcomponents/shopcar_numbox.vue'
	
	export default{
		data(){
			return {
				goodsList:[]
			}
		},
		created(){
			this.getGoodsList();
		},
		methods:{
			getGoodsList(){
				var idArr=[];
				this.$store.state.car.forEach(item=>idArr.push(item.id));
				if(idArr.length<=0){
					return;
				}
				
				
				this.$http.get("api/goods/getshopcarlist/"+idArr.join(",")).then(result=>{
					if(result.body.status==0){
						this.goodsList=result.body.message;
					}
				})
			},
			remove(id,index){
				this.goodsList.splice(index,1);
				this.$store.commit('removeFromCar',id);
			},
			selectedChanged(id,val){
				this.$store.commit('updateGoodsSelected',{id,selected:val});
			}
		},
		components:{
			numbox
		}
	}
</script>

<style lang="less" scoped>
	.car-container{
		background-color: antiquewhite;
		overflow: hidden;
		.goodslist{
			.mui-card-content-inner{
				display: flex;
				align-items: center;
			}
			img{
				width: 60px;
				height: 60px;
			}
			h1{
				font-size: 13px;
			}
			.info{
				
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				.jige{
					display: flex;
					flex-wrap: nowrap;
					.price{
						color: red;
						font-weight: bold;
						padding-right: 6px;
					}
					.anniu{
						padding-right: 6px;
					}
				}
			}
		}
		.jiesuan{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.red{
			color: red;
			font-weight: bold;
			font-size: 18px;
		}
	}
</style>
