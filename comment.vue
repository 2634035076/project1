<template>
	<div class="cmt-container">
		<h3>评论:</h3>
		<hr>
		<textarea placeholder="请BB(最多120字)" maxlength="120" v-model="msg"></textarea>
		<mt-button type="primary" size="large" @click="postMoment">发表评论</mt-button>
		
		<div class="cmt-list">
			<div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
				<div class="cmt-title">
					{{i+1}}楼&nbsp; &nbsp; 用户:{{item.user_name}}&nbsp;&nbsp; 时间:{{item.add_time|dataFormat}}
				</div>
				<div class="cmt-body">
					{{item.content}}
				</div>
			</div>	
		</div>
		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	
	export default{
		data(){
			return{
				pageIndex:1,
				comments:[],
				msg:''
			};
		},
		created(){
			this.getComments()
		},
		methods:{
			getComments(){
				this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
					if(result.body.status==0){
						/* this.comments=result.body.message; */  
						this.comments=this.comments.concat(result.body.message);//不覆盖原来数据
					}else{
						Toast('加载评论失败')
					}
				})
			},
			
			getMore(){
				this.pageIndex++;
				this.getComments();
			},
			postMoment(){
				if(this.msg.trim().length==0){
					return Toast('评论内容不能为空');
				}
				this.$http.post("api/postcomment/"+this.id,{content:this.msg.trim()})
				.then(function(result){
					if(result.body.status==0){
						var cmt={user_name:'匿名用户',add_time:Date.now(),content:this.msg.trim()}
					};
					this.comments.unshift(cmt);
					this.msg='';
					
				});
			}
			
		},
		props:["id"] 
	}
</script>

<style lang="less" scoped>
	.cmt-container{
		textarea{
			font-size: 14px;
			height: 85px;
			margin: 0;
		}
		.cmt-list{
			margin-top: 5px 0;
			.cmt-item{
				font-size: 13px;
				.cmt-title{
					line-height: 30px;
					background-color: bisque;
				}
				.cmt-body{
					line-height: 35px;
					text-indent: 2em;
				}
			}
		}
	}
</style>
