<template>
	<div id="main-content">
		<div id="unknown" class="box">
			<div class="title" @click="$router.push({ name: 'unknown' })">unknown</div>
			<div class="items">
				<div class="item unknown-item" v-for="item in unknownList" :data-id="item.id" data-click="unclicked" @click.stop="showAllContent">
					<span class="">{{ item.content }}</span>
					<div class="pullUp" @click="pullUp">收起</div>
				</div>
			</div>
		</div>
		<div class="transfer">
			<p class="icon" @click="uToT">&gt&gt&gt</p>
			<p class="icon" @click="tToU">&lt&lt&lt</p>
		</div>
		<div id="temporary" class="box">
			<div class="title" @click="$router.push({ name: 'temporary' })">temporary</div>
			<div class="items">
				<div class="item temporary-item" v-for="item in temporaryList" :data-id="item.id" data-click="unclicked" @click.stop="showAllContent">
					<span class="">{{ item.content }}</span>
					<div class="pullUp" @click="pullUp">收起</div>
				</div>	
			</div>
		</div>
		<div class="transfer">
			<p class="icon" @click="tToC">&gt&gt&gt</p>
			<p class="icon" @click="cToT">&lt&lt&lt</p>
		</div>
		<div id="complete" class="box">
			<div class="title" @click="$router.push({ name: 'complete' })">complete</div>
			<div class="items">
				<div class="item complete-item" v-for="item in completeList" :data-id="item.id" data-click="unclicked" @click="showAllContent">
					<span class="">{{ item.content }}</span>
					<div class="pullUp" @click="pullUp">收起</div>
				</div>	
			</div>
		</div>
		<div class="post" @click="$router.push({ name: 'post' })">提交</div>
		<transition name="fade">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script type="text/javascript">
	export default{
		components: {

		},
		methods: {
			showAllContent: function (e){//点击显示某个具体问题函数
				//获取该事件的DOM
				var target = e.target.children[0]?e.target:e.target.parentNode;
				//获取该DOM所在块的ID
				var blockId = target.parentNode.parentNode.id;
				//需改变样式的前DOM
				var prevObj = null;
				//根据ID改变变量(该变量用于确认被选中DOM)
				switch(blockId){
					case 'unknown':
						//改变变量prevObj的值
						prevObj = this.unknownSelectedItem;
						//改变变量unknownSelectedItem的值
						this.unknownSelectedItem = target;
						break;
					case 'temporary':
						prevObj = this.temporarySelectedItem;
						this.temporarySelectedItem = target;
						break;
					case 'complete':
						prevObj = this.completeSelectedItem;
						this.completeSelectedItem = target;
						break;
				}
				//改变前DOM的背景颜色
				if(prevObj){//第一次值为NULL
					prevObj.style.background = '#775858';
				}
				//改变目标DOM的背景颜色  
				target.style.background = '#604646';
				// //获取兄弟元素
				// var sibObjs = this.siblings(target);
				// //改变该DOM背景颜色
				// target.style.background = '#604646';

				// //还原兄弟元素背景颜色
				// for(var i = 0;i < sibObjs.length;i++){
				// 	sibObjs[i].style.background = '#775858';
				// }
				//判断是否已经被点击
				if(target.dataset.click !== 'unclicked'){
					return;
				}
				var that = this;
				//每行字数为18
				var perLineText = 18;
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
			uToT: function (){//将unknown的DOM转到temporary
				var target = this.unknownSelectedItem;
				var that = this;
				
				if(!target){
					return;
				}

				var index = 2;
				var id = target.dataset.id;
				var unknownObj = document.querySelectorAll("#unknown .items")[0];
				var temporaryObj = document.querySelectorAll("#temporary .items")[0];

				//删除unknown的DOM
				unknownObj.removeChild(target);
				//改变该DOM样式和删除hover事件
				// target.style.height = 40 + 'px';
				// this.removeClass(target,'active');
				target.style.background = '#775858';
				// target.dataset.click = 'unclicked';
				// target.onmouseover = null;
				// target.onmouseout = null;
				//添加DOM到temporary
				temporaryObj.appendChild(target);
				//将修改数据传入后端
				that.$http.post('/', {'index': index, 'id': id})
					.then(
						(response) => {
							
						}
					)
				//将unknown被选中项设为NULL
				this.unknownSelectedItem = null;
			},
			tToU: function (){
				var target = this.temporarySelectedItem;
				var that = this;

				if(!target){
					return;
				}

				var index = 3;
				var id = target.dataset.id;
				var unknownObj = document.querySelectorAll("#unknown .items")[0];
				var temporaryObj = document.querySelectorAll("#temporary .items")[0];

				//删除unknown的DOM
				temporaryObj.removeChild(target);
				//改变该DOM样式
				target.style.background = '#775858';
				//添加DOM到temporary
				unknownObj.appendChild(target);
				//将修改数据传入后端
				that.$http.post('/', {'index': index, 'id': id})
					.then(
						(response) => {
							
						}
					)
				//将unknown被选中项设为NULL
				this.temporarySelectedItem = null;
			},
			tToC: function (){
				var target = this.temporarySelectedItem;
				var that = this;

				if(!target){
					return;
				}

				var index = 4;
				var id = target.dataset.id;
				var temporaryObj = document.querySelectorAll("#temporary .items")[0];
				var completeObj = document.querySelectorAll("#complete .items")[0];

				//删除unknown的DOM
				temporaryObj.removeChild(target);
				//改变该DOM样式
				target.style.background = '#775858';
				//添加DOM到temporary
				completeObj.appendChild(target);
				//将修改数据传入后端
				that.$http.post('/', {'index': index, 'id': id})
					.then(
						(response) => {
							
						}
					)
				//将unknown被选中项设为NULL
				this.temporarySelectedItem = null;
			},
			cToT: function (){
				var target = this.completeSelectedItem;
				var that = this;

				if(!target){
					return;
				}

				var index = 5;
				var id = target.dataset.id;
				var temporaryObj = document.querySelectorAll("#temporary .items")[0];
				var completeObj = document.querySelectorAll("#complete .items")[0];

				//删除unknown的DOM
				completeObj.removeChild(target);
				//改变该DOM样式
				target.style.background = '#775858';
				//添加DOM到temporary
				temporaryObj.appendChild(target);
				//将修改数据传入后端
				that.$http.post('/', {'index': index, 'id': id})
					.then(
						(response) => {
							
						}
					)
				//将unknown被选中项设为NULL
				this.completeSelectedItem = null;
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
			},
			addEvents: function (target,type,func){//事件绑定事件 
				if(target.addEventListener){
					target.addEventListener(type,func,true);
				}else if(target.attachEvent){
					target.attachEvent("on",type,func);
				}
			},
			removeEvents: function (target,type,func){//事件取消绑定事件
				if(target.removeEventListener){
					target.removeEventListener(type,func,true);
				}else if(target.detachEvent){
					target.detachEvent("on",type,func);
				}
			},
			siblings: function (obj){
				var _nodes = [],
					elem = obj,
					_elem = obj;
				while((_elem = _elem.previousSibling)){
					if(_elem.nodeType === 1){
						_nodes.push(_elem);
					}
				}
				while((elem = elem.nextSibling)){
					if(elem.nodeType === 1){
						_nodes.push(elem);
					}
				}

				return _nodes;
			}
		},
		data: function (){
			return {
				contentList: ['我打打算打算这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！','我打打算打算这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！我打打算打算这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！我打打算打算这道题是真的不会啊！这3232erwrewrewqeqweqweqweqweqwewdaswerewrew道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！我打打算打算这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！','我打打算打算这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！2','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不dasdasdasdasdas会啊！3','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！4','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！5','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！6','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！7','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！8','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！9','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！19','这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！这道题是真的不会啊！29'],
				unknownList: [],
				temporaryList: [],
				completeList: [],
				unknownSelectedItem: null,
				temporarySelectedItem: null,
				completeSeletedItem: null
			}
		},
		computed: {

		},
		created: function (){
			var that = this;

			var index = 1;

			that.$http.post('/', { 'index': index})
			.then(
				(response) => {
					var unknownData = response.data['data'][0];
					var temporaryData = response.data['data'][1];
					var completeData = response.data['data'][2];
					//将获取的数据写入3个变量
					for(var item in unknownData){
						var json = {id: unknownData[item]['_id'], content: unknownData[item]['content']};
						that.unknownList.push(json);
						// Array.prototype.push.call(that.unknownList,unknownData[item]['content']);
					}
					for(var item in temporaryData){
						var json = {id: temporaryData[item]['_id'], content: temporaryData[item]['content']};
						that.temporaryList.push(json);
					}
					for(var item in completeData){
						var json = {id: completeData[item]['_id'], content: completeData[item]['content']};
						that.completeList.push(json);
					}
				}
			)
		},
		watch: {

		}
	}
</script>
<style lang="sass">
	$oneBoxWidth: 310px;
	$oneBoxMarginRight: 30px;
	$allBoxWidth: $oneBoxWidth * 3 + $oneBoxMarginRight * 2;
	$boxHeigth: 455px;
	$titleHeight: 35px;
	$contentHeight: $boxHeigth - $titleHeight;
	body{
		background: #333333;
	}
	#main-content{
		width: $allBoxWidth;
		height: $boxHeigth;
		margin: 100px auto 0;
		font-size: 0;
		position: relative;
		.title{
			font-size: 20px;
			height: $titleHeight;
			text-align: center;
			line-height: $titleHeight;
			color: #fff;
			font-weight: 700;
			border-bottom: 1px solid #dedede;
			box-sizing: border-box;
			cursor: pointer;
		}
		#unknown,#temporary,#complete{
			width: $oneBoxWidth;
			height: $contentHeight;
			background: #775858;
			color: #f1f1f1;
			display: inline-block;
			position: relative;
		}	
		#unknown,#temporary{
			// margin-right: $oneBoxMarginRight;
		}	
		.transfer{
			font-size: 14px;
			display: inline-block;
			width: $oneBoxMarginRight;
			font-weight: 600;
			text-align: center;
			color: #fff;
			margin-top: $boxHeigth / 2 - 45px;
			.icon{
				cursor:pointer;
			}
		}
		// .enlargeOneBox{
		// 	width:400px;
		// 	height:500px;
		// 	position:absolute;
		// 	top:-50px;
		// 	left:280px;
		// 	background:#856A6A;
		// 	font-size:16px;
		// }
		.fade-enter-active, .fade-leave-active {
		  transition: opacity .5s;
		}
		.fade-enter, .fade-leave-active {
		  opacity: 0
		}	
		$itemPadding: 10px;
		$itemWidth: $oneBoxWidth - 2 * $itemPadding;
		.box{
			vertical-align: top;
			overflow-y: scroll;
			.items{
				.item{
					padding: 0 10px;
					width: $itemWidth;
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
				    position: relative;
				    word-wrap: break-word;
				    &:hover{
				    	background:#00CCF1!important;
				    	color:#222;
				    }
				    .pullUp{
				    	position: absolute;
				    	bottom: 0;
				    	right: 0;
				    	background: #2687F6;
				    	opacity: 0.8;
				    	width: 40px;
				    	height: 20px;
				    	text-align: center;
				    	line-height: 20px;
				    	font-size: 13px;
				    	display: none;
				    	color: #ffffff!important;
				    }
				    .active{
				    	display: block!important;
				    }
				}
				.active{
					// overflow: visible!important;
					line-height: 20px!important;
					display: block!important;
					padding-top: 10px;
					padding-bottom: 10px;
				}
			}
		}
		.post{
			font-size:14px;
			color:#fff;
			width:50px;
			margin:0 auto;
			text-align:center;
			height:40px;
			line-height:40px;
			cursor:pointer;
		}
	}
</style>

