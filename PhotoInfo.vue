<template>
	<div class="photoinfo-container">
		<h3>{{photoinfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间:{{photoinfo.add_time|dataFormat}}</span>
			<span>点击量:{{photoinfo.click}}</span>
		</p>
		<hr>
		
		<!-- 缩略图区域 -->
		<div class="thumbs">
			<!-- <img class="preview-img" v-for="(item,index) in list" :src="item.src"
			height="100" @click="$preview.open(index,list)" :key="item.src"> -->
			<vue-preview :slides="list" @close="getThumbs"></vue-preview>
		</div>
		
		
		<!-- 图片内容区域 -->
		<div class="content" v-html="photoinfo.content"></div>
		
		<!--放置评论子组件  -->
		<comment :id="id"></comment>
	</div>
	
</template>

<script>
	import comment from '../subcomponents/comment.vue'
	
	export default{
		data(){
			return{
				id:this.$route.params.id,
				photoinfo:{},
				list:[]
			};
		},
		created(){
			this.getPhotoInfo();
			this.getThumbs()
		},
		methods:{
			getPhotoInfo(){
				this.$http.get('api/getimageInfo/'+this.id).then(result=>{
					if(result.body.status==0){ 
						this.photoinfo=result.body.message[0];
					}
				})
			},
			getThumbs(){
				this.$http.get('api/getthumimages/'+this.id).then(result=>{
					if(result.body.status==0){
						//循环每个图片数据，补全宽和高
						result.body.message.forEach(item=>{
							item.msrc = item.src;
							item.w=600;
							item.h=400;
						});
						this.list=result.body.message;
					}
				})
			}
		},
		components:{
			comment
		}
	}
</script>

<style lang="less" scoped>
	.photoinfo-container{
		padding: 3px;
		h3{
			text-align: center;
			color: brown;
			margin: 15px 0;
		}
		.subtitle{
			display: flex;
			justify-content: space-between;
			font-size: 14px;
		}
		.content{
			font-size: 16px;
			line-height: 25px;
		}
		.thumbs {
		  /deep/ .my-gallery {
			display: flex;
			flex-wrap: wrap;
			figure {
			  width: 30%;
			  margin: 5px;
			  img {
				width: 100%;
				margin: 25px;
				align-items: center;
				box-shadow: 0 0 2px rosybrown;
			  }
			}
		  }
		}

	}
</style>
