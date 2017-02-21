<template>
		<div class="postBox" v-show="postBoxShow">
			<div class="top">
				<div class="name">
					新难点
				</div>
				<i class="closePostBox" @click="closePostBox" @click.stop="$router.push({ name: 'index' });">
					关闭
				</i>
			</div>
			<div class="content" contenteditable="true">
				
			</div>
			<div class="postBt" @click="post">
				上传
			</div>
		</div>
</template>
<script type="text/javascript">
	export default{
		components: {

		},
		methods: {
			closePostBox: function (){
				this.postBoxShow = false;
			},
			post: function (){
				var content = document.getElementsByClassName('content')[0];

				var index = 0;

				var that = this;

				var contentValue = content.innerHTML;

				that.$http.post('/', { 'index': index, 'content': contentValue })
				.then( 
					(response) => {
						that.$router.push({ name: 'index' });				
					}
				)
				// //创建XMLHttpRequest对象
				// function createXMLHttpRequest(){
				//     var xhr;
				//     try{
				//         xhr = new XMLHttpRequest();
				//     }
				//     catch(e){
				//         xhr = new ActiveXObject("Microsoft.XMLHTTP");
				//     }
				//     return xhr;
				// }

				// var xhr = createXMLHttpRequest();

				// xhr.open("post",'/',true);

				// xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

				// xhr.onreadystatechange = function (){
				// 	if(xhr.readyState == 4 && xhr.status == 200){
				// 		that.$router.push({ name: 'index' });
				// 	}
				// };

				// xhr.send('content=' + contentValue + '&index=' + index);
			}
		},
		data: function (){
			return {
				postBoxShow: true
			}
		},
		computed: {

		},
		watch: {

		}
	}
</script>
<style lang="sass">
	$allHeight: 400px;
	$topHeight: 30px;
	$footerHeight:50px;
	$contentHeight: $allHeight - $topHeight - $footerHeight;
	.postBox{
		width: 400px;
		height: $allHeight;
		position: absolute;
		top: 10px;
		left: 280px;
		background: #664545;
		.top{
			width: 100%;
			height: $topHeight;
			border-bottom: 1px solid #dedede;
			box-sizing: border-box;
			font-size: 14px;
			color: #fff;
			.name{
				width: 100px;
				height: $topHeight;
				text-align: center;
				line-height: $topHeight;
			}
			.closePostBox{
				display: block;
				position: absolute;
				top: 0;
				right: 0;
				width: 50px;
				height: 30px;
				text-align: center;
				line-height: 30px;
				font-style: normal;
				cursor: pointer;
			}	
		}
		.content{
			width: 100%;
			height: $contentHeight;
			background:#856A6A;
			border-bottom:1px solid #dedede;
			box-sizing: border-box;
			font-size: 16px;
			padding: 10px;
			color: #fff;
			line-height: 20px;
		}
		.postBt{
			width: 100%;
			height: $footerHeight;
			font-size: 16px;
			line-height: $footerHeight;
			text-align: center;
			color: #fff;
			cursor: pointer;
		}
	}
</style>