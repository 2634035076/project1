<template>
	<div class="app-contain">
		<!-- 头区域 -->
		
		<mt-header fixed title="货架">
			<span slot="left" @click="goBack" v-show="flag">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>
		<meta content="width=device-width,user-scalable=no" name="viewport">
		
		
		
		
	
		<!-- 路由区域 -->
		<transition>
			<router-view></router-view>
		</transition>
		
		
		
		
		
		<!-- tabbar区域 -->
		
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-lsn" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-lsn" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-lsn" to="/car">
				<span class=" mui-icon mui-icon-close">
					<span class="mui-badge mui-badge-danger" id="badge">{{$store.getters.getAllCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-lsn" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
		
		
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				flag:false
			}
		},
		created(){
			this.flag=this.$route.path=='/home'?false:true;
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			}
		},
		watch:{
			'$route.path':function(newVal){
				if(newVal=='/home'){
					this.flag=false
				}else{
					this.flag=true
				}
			}
		}
	}

</script>

<style lang="less" scoped>
	.app-contain{
		padding-top: 40px;
		padding-bottom: 50px;
		margin: 0;
		overflow-x: hidden;
	}
	
	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}
	.v-enter-active,
	.v-leave-active{
		transition: all 0.4s ease;
	}
	
	.mui-bar-tab .mui-tab-item-lsn .mui-active{
		color: cornflowerblue;
	}
	
	.mui-bar-tab .mui-tab-item-lsn {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-lsn .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-lsn .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>