<template>
	<div class="enlargeOneBox" v-show="enlargeOneBoxShow">
		<div class="top">
			<div class="name">
				疑点难点
			</div>
			<i class="closeEnlargeOneBox" @click="closeEnlargeOneBox" @click.stop="$router.push({ name: 'index' });">
				关闭
			</i>
		</div>
		<div class="content">
			<div class="items">
					<div class="item" v-for="item in contentList" data-click="unclicked" @click="showAllContent">
						<span>{{ item }}</span>
						<div class="pullUp" @click="pullUp">收起</div>
					</div>	
			</div>	
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		components: {

		},
		methods: {
			closeEnlargeOneBox: function (){
				this.enlargeOneBoxShow = false;		
			},
			showAllContent: function (e){
				//获取该事件的DOM
				var target = e.target.children[0]?e.target:e.target.parentNode;
				//判断是否已经被点击
				if(target.dataset.click !== 'unclicked'){
					return;
				}
				var that = this;

				var perLineText = 24;

				//获取该DOM里的文字行数
				var lineNum = Math.ceil(target.children[0].innerHTML.length/perLineText);
				//每行高度为20
				var lineHeight = 20;
				//上下总共的padding为20
				var padding = 20;
				//根据内容获取
				var targetHeight = lineNum * lineHeight + padding;
				//标记该DOM已被点击
				target.dataset.click = 'clicked';
				//目标函数触发点击事件，改变样式
				that.addClass(target,'active');

				//获得该DOM的现有高度
				var nowHeight = target.offsetHeight;
				var onMouseOver = function (e){
					if(checkHover(e,this)){
				        that.addClass(target.children[1],'active');
				    }
				};
				var onMouseOut = function (e){
					if(checkHover(e,this)){
				        that.removeClass(target.children[1],'active');
				    }
				};
				//
				function contains(parentNode, childNode){
				    if(parentNode.contains){
				        return parentNode != childNode && parentNode.contains(childNode);
				    }else{
				        return !!(parentNode.compareDocumentPosition(childNode) & 16);
				    }
				}
				//判断是否是子元素
				function checkHover(e,target){
				    if(getEvent(e).type=="mouseover"){
				        return !contains(target,getEvent(e).relatedTarget||getEvent(e).fromElement) && !((getEvent(e).relatedTarget||getEvent(e).fromElement)===target);
				    }else{
				        return !contains(target,getEvent(e).relatedTarget||getEvent(e).toElement) && !((getEvent(e).relatedTarget||getEvent(e).toElement)===target);
				    }
				}

				function getEvent(e){
				    return e||window.event;
				}
				//模拟jq的animate动画事件增加该DOM的高度
				var timer = setInterval(function (){
					if(nowHeight > targetHeight){
						clearInterval(timer);
						//给DOM（收起）改变样式
						that.addClass(target.children[1],'active');
						// that.addEvents(target,'mouseover',onMouseOver);
						// that.addEvents(target,'mouseout',onMouseOut);
						target.onmouseover = onMouseOver;
						target.onmouseout = onMouseOut;
						return;
					}
					//每次增加的高度为3
					var addHeight = 3;
					nowHeight += addHeight;
					target.style.height = nowHeight + 'px';
				},30);
				
			},
			pullUp: function (e){//点击收起函数
				var target = e.target.parentNode;
				var targetHeight = 40;
				var nowHeight = target.offsetHeight;
				var that = this;
				//移除hover事件
				target.onmouseover = null;
				target.onmouseout = null;
				var timer = setInterval(function (){
					if(nowHeight === targetHeight){
						clearInterval(timer);
						target.dataset.click = 'unclicked';
						that.removeClass(target,'active');
						return;
					}
					var subHeight = 3;
					nowHeight -= subHeight;
					target.style.height = nowHeight + 'px';
				},30);
				that.removeClass(e.target,'active');
			},
			hasClass: function (obj,cls){//判断对象是否有这个class函数
				return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
			},
			addClass: function (obj,cls){//给对象添加class函数
				if (!this.hasClass(obj,cls)) obj.className += " " + cls;  
			},
			removeClass: function (obj, cls){//给对象删除class函数  
				if (this.hasClass(obj, cls)) {  
				    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
				    obj.className = obj.className.replace(reg, ' ');  
				}	
			},
			toggleClass: function (obj,cls){//对象toggleClass事件函数  
				if(this.hasClass(obj,cls)){  
			        this.removeClass(obj, cls);  
			    }else{  
			        this.addClass(obj, cls);  
			    } 
			}
		},
		data: function (){
			return {
				enlargeOneBoxShow: true,
				contentList: ['这道题有什么不会的很简单的！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！1','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！2','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！3','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！4','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！5','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！6','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！7','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！8','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！9']
			}
		},
		computed: {

		},
		watch: {

		},
		created: function (){
			
		}
	}
</script>
<style lang="sass" scoped>
	$enlargeOneBoxHeight: 505px;
	$topHeight: 30px;
	$contentHeight: $enlargeOneBoxHeight - $topHeight;
	.enlargeOneBox{
		width: 400px;
		height: $enlargeOneBoxHeight;
		position: absolute;
		top: -50px;
		left: 280px;
		background: #856A6A;
		font-size: 16px;
		.top{
			width: 100%;
			height: $topHeight;
			border-bottom: 1px solid #dedede;
			box-sizing: border-box;
			color: #fff;
			.name{
				width: 100px;
				height: $topHeight;
				text-align: center;
				line-height: $topHeight;
			}
			.closeEnlargeOneBox{
				display: block;
				position: absolute;
				top: 0;
				right: 0;
				width: 50px;
				height: 30px;
				text-align: center;
				line-height: 30px;
				font-style: normal;
				font-size: 14px;
				cursor: pointer;
			}		
		}
		.content{
			height: $contentHeight;
			overflow-y:scroll;
			.items{
				.item{
					padding: 0 10px;
					width: 100%;
					height: 40px;
					text-align: left;
					line-height: 40px;
					-webkit-line-clamp: 1;
				    -webkit-box-orient: vertical;
				    display: -webkit-box;
				    overflow: hidden;
				    font-size: 14px;
				    letter-spacing: 1px;
				    box-sizing: border-box;
				    border-bottom: 1px solid #dedede;
				    cursor:pointer;
				    position:relative;
				    word-wrap:break-word;
				    color:#fff;
				    &:hover{
				    	background:#00CCF1;
				    }
				    .pullUp{
				    	position:absolute;
				    	bottom:0;
				    	right:0;
				    	background:#2687F6;
				    	opacity:0.8;
				    	width:40px;
				    	height:20px;
				    	text-align:center;
				    	line-height:20px;
				    	font-size:13px;
				    	display:none;
				    }
				    .active{
				    	display:block!important;
				    }
				}
				.active{
					// overflow:visible!important;
					line-height:20px!important;
					display:block!important;
					padding-top:10px;
					padding-bottom:10px;
				}
			}
		}
	}
	
</style>