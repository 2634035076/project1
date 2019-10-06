<template>
	<div class="newsinfo-container">
		
		
		<h3 class="title">{{newsinfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间:{{newsinfo.add_time|dataFormat}}</span>
			<span>点击次数:{{newsinfo.click}}</span>
		</p>
		<hr>
		<!-- 内容区域 -->
		<div class="content" v-html="newsinfo.content"></div>
		
		<!-- 评论区域 -->
		<comment-box :id="this.id"></comment-box>
		
	</div>
</template>

<script>
	//实现提示框
	import {Toast} from 'mint-ui'
	
	//导入comment评论组件
	import comment from '../subcomponents/comment.vue'
	
	export default{
		data(){
			return{
				id:this.$route.params.id,
				newsinfo:{}
			};
		},
		created(){
			this.getNewsInfo();
		},
		methods:{
			getNewsInfo(){
				this.$http.get('api/getnew/'+this.id).then(result=>{
					if(result.body.status==0){
						this.newsinfo=result.body.message[0]; 
					} else{
						Toast('加载新闻失败')
					}
				})
			}
		},
		components:{
			"comment-box":comment
		}
	}
</script>

<style lang="less" scoped>
	.newsinfo-container{
		padding: 0 7px; 
		.title{
			text-align: center;
			color: brown;
			margin: 15px 0;
		}
		.subtitle{
			color: cadetblue;
			font-size: 15px;
			display: flex;
			justify-content: space-between; 
		}
	
		
	}
</style>
