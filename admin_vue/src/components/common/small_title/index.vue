<template>
	<div class="small-title">
		<p class="small-title-txt"><b>{{txt}}</b></p>
	</div>	
</template>
<script>
	export default {
		name: 'small-title',
		props: {
			txt: {
				type: String,
				default() {
					return 'small'
				}
			}
		},
		data() {
			return {
			}
		}
	}
</script>
<style lang='less' rel='stylesheet/less'>
	@color_title: #33adff;
	.small-title-txt{
		&:before{
			content: '';
    		display: inline-block;
		    width: 3px;
		    height: 15px;
		    margin-right: 6px;
		    background-color:@color_title;
		    vertical-align: sub;
		}
	}
</style>