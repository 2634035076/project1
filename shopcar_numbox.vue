<template>
	<div>
		<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'  style="height: 25px;"
		>
			  <!-- "-"按钮，点击可减小当前数值 -->
			  <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
			  <input class="mui-numbox-input" type="number" :value="initcount" @change="countChange"
			   ref="numberbox" readonly />
			  <!-- "+"按钮，点击可增大当前数值 -->
			  <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
		</div>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js'
	
	export default{
		mounted(){
			//初始化数字选择框组件
			mui(".mui-numbox").numbox();
		},
		methods:{
			countChange(){
					this.$store.commit('updateGoodsInfo',{id:this.goodsid,count:this.$refs.numberbox.value});
			}
		},
		props:['initcount','goodsid']
	}
</script>

<style lang="less" scoped>
</style>
