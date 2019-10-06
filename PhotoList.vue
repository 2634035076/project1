<template>
	<div>
		<!-- 滑动条区域 -->
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper
			mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item',item.id==0?'mui-active' :'']" v-for="item in cates"
					 :key="item.id" @tap="getPhotoListByCateId(item.id)">
						{{item.title}}
					</a>
				</div>
			</div>
		</div>
		
		<!-- 图片区域 -->
		<ul class="photo-list">
			<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
				<img v-lazy="item.img_url">
				<div class="info">
					<h3 class="info-title">{{item.title}}</h3>
					<div class="info-body">{{item.zhaiyao}}</div>
				</div>
			</router-link>
		</ul>
		
		
		
	</div>
</template>

<script>
	//导入mui.js文件
	import mui from '../../lib/mui/js/mui.min.js'
	
	
	export default{
		data(){
			return{
				cates:[],
				list:[]
			};
		},
		created(){
			this.getAllCategory();
			this.getPhotoListByCateId(0);
		},
		mounted(){
			//初始化scroll,解决模块不能滑动问题
			mui('.mui-scroll-wrapper').scroll({
				deceleration:0.0006
			});
		},
		
		methods:{
			getAllCategory(){
				this.$http.get("api/getimgcategory").then(result=>{
					if(result.body.status==0){
						//手动拼接处一个完整的列表
						result.body.message.unshift({title:"全部",id:0});
						this.cates=result.body.message;
					}
				})
			},
			getPhotoListByCateId(cateId){
				//根据分类id获取图片列表
				this.$http.get('api/getimages/'+cateId).then(result=>{
					if(result.body.status==0){
						this.list=result.body.message;
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.photo-list{
		list-style: none;//去除小点
		margin: 0;
		padding: 10px;
		padding-bottom: 0;
		li{
			text-align: center;//剧中
			background-color: antiquewhite;
			margin-bottom: 10px;
			box-shadow: 0 0 6px; //阴影
			position: relative;
			img{
				width: 100%;
				vertical-align: middle;//背景色和图片一样大
			}
			img[lazy="loading"]{
				width: 40px;
				height: 300px;
				margin: auto;
			}
			.info{
				color: antiquewhite;
				text-align: left;
				position: absolute;
				bottom: 0;
				background-color: rgba(0, 0,0, 0.4);//出现文字的格子 透明
				max-height: 84px;
				.info-title{
					font-size: 15px;
				}
				.info-body{
					font-size: 14px;
				}
			}
		}
	}
</style>
