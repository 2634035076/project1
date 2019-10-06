<template>
	<div>
		<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
			  <!-- "-"按钮，点击可减小当前数值 -->
			  <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
			  <input class="mui-numbox-input" type="number" value="1" @change="countChange" ref="numberbox" />
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
					//当文本框数据改变你立即传递给父组件	
				this.$emit('getcount',parseInt(this.$refs.numberbox.value));
			}
		},
		props:["max"],
		watch:{
			//属性监听
			'max':function(newVal,oldVal){
				//使用jsAPI设置numbox最大值	
				mui(".mui-numbox").numbox().setOption('max',newVal);
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
