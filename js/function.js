// 获取类名
	// 参数  （类名，对象）
	function getClass(classname,obj){
		// 参数初始化
		obj=obj||document;
		// 如果在谷歌中可以识别
		if(obj.getElementsByClassnName){
			return obj.getElementsByClassnName(classname);
		}
		// ie中不识别
		else{
			var arr=[];
			// 获取所有标签名字
			var objs=obj.getElementsByTagName("*");
			// 遍历标签, 判断标签中的类名
			for(var i=0;i<objs.length;i++){
				// if(objs[i].className==classname){
					// 如果有多个类名，调用checkclass函数。参数（类名，第i个对象）
					if(checkClass(classname,objs[i])){
					arr.push(objs[i]);
				}
			}return arr;
		}
	}
		function checkClass(val,obj){
			// 将obj的所有类名给classstr
			var classStr=obj.className;
			// 用字符串对象方法 用空格将字符分割成数组给了classarr
			var classarr=classStr.split(" ");
			// 遍历数组中所有类名
			for(var i=0;i<classarr.length;i++){
				// 如果传过来的类名与这个类名一样
				if(val==classarr[i]){
					return true;
				}
			}return false;
		}
// 获取内容
	function operateText(obj,val){
		if(val!=undefined){
			if(obj.innerText){
			obj.innerHTML=val;
		}else{
			obj.textContent=val;
		}
		}else{
			if(obj.innerText){
			return obj.innerHTML;
		}else{
			return obj.textContent;
		}
		}
		
	}
// 获取样式
	function getStyle(obj,style){
		obj=obj||document;
		if(obj.currentStyle){
			return obj.currentStyle[style];
		}else{
			return getComputedStyle(obj,null)[style];
		}
	}
// 获取元素
	function $(val,obj){
			if(typeof val=="string"){
				obj=obj||document;
				val.replace(/^\s*|\s*$/g,"");
				if(val.charAt(0)=="#"){
					return document.getElementById(val.slice(1));
				}else if(val.charAt(0)=="."){
					return getClass(val.slice(1),obj);
				}else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}$/.test(val)){
					return obj.getElementsByTagName(val);
				}else if(/^<[a-zA-Z][a-zA-Z0-9]{0,10}>$/.test(val)){
					return document.createElement(val.slice(1,-1));
				}
			}
			else if(typeof val=="function"){
				window.onload=function(){
					val();
				}
			}
	}
// 获取子节点
	function getChilds(obj,type){
		// 要或者不要  
		var type=type||"no";
		// 拿到所有的子节点
		var kids=obj.childNodes;
		var arr=[];
		for(var i=0;i<kids.length;i++){
			if(type=="no"){
				if(kids[i].nodeType=="1"){
					arr.push(kids[i]);
				}
			}
				// 拿到元素节点或者文本节点
			else if(type=="yes"){
				if(kids[i].nodeType=="1"||kids[i].nodeType=="3"&&kids[i].nodeValue.replace(/^\s*|\s*$/g,"")){
					arr.push(kids[i])
				}
			}  
		}
		return arr;
	}
//获取第一个子节点 
	function getFirst(obj,type){
		var type=type||"no";
		return getChilds(obj,type)[0];
	}
// 拿到最后一个子节点
	function getLast(obj,type){
		var type=type||"no";
		var childs=getChilds(obj,type);
		return childs[childs.length-1];
	}
// 拿到第n个子元素
	function getN(obj,n,type){
		var type=type||"no";
		var childs=getChilds(obj,type);
		if(n>childs.length||n<1){
			return false;
		}return childs[n-1];
	}
//获取下一个兄弟节点
function getNext(obj,type){
	var type=type||"no";
	var next=obj.nextSibling;
	if(next===null){
		return false;
	}
	// 要元素节点
	if(type=="no"){
		while(next.nodeType=="3"||next.nodeType=="8"){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
    // 要元素和非空格的文本节点
	else if(type=="yes"){
		while(next.nodeType=="3"&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType=="8"){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
} 
// 获取上一个兄弟节点
function getPrevious(obj,type){
	type=type||"no";
	var previous=obj.previousSibling;
	if(type==null){
		return false;
	}
	if(type=="no"){
		while(previous.nodeType==3||previous.nodeType==8){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}
		}
		return previous;
	}else if(type=="yes"){
		while(previous.nodeType==3&&!previous.nodeValue.replace(/^\s*|\s*$/g,"")||previous.nodeType==8){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}
		}
		return previous;
	}
}
// 将元素追加到某个对象之前
	function insertBefore(obj,beforeObj){
		var parent=beforeObj.parentNode;
		parent.insertBefore(obj,beforeObj);
	}
// 将元素追加到某个对象之后(插到下一个元素之前)
	function insertAfter(obj,afterObj){
		var parent=afterObj.parentNode;
		var next=getNext(afterObj,"yes");
		if(!next){ //next==false
			parent.appendChild(obj);
		}else{
			parent.insertBefore(obj,next);
		}
	}
// 节点轮播
	function nodeLunbo(obj,left,right,box,img1){
		var flag=true;

		var lunbo=obj;
		var left=left;
		var right=right;
		var box=box;
		var img1=img1;
		var width=parseInt(getStyle(img1,"width"));
		var t=setInterval(move,1500);
		function move(){
			if(flag==false){
			return;
			}
			flag=false;
			animate(box,{left:-width},600,function(){
				var imgfirst=getFirst(box);     //拿到第一张图片并放到最后
				box.appendChild(imgfirst);
				box.style.left="0"; 
				flag=true;  //因为浮动起来后，会往前挤，所以把盒子拿回来
			})
		}
		lunbo.onmouseover=function(){
			clearInterval(t);
		}
		lunbo.onmouseout=function(){
			t=setInterval(move,1500);
		}
		left.onclick=function(){
			var last=getLast(box);
			var first=getFirst(box);
			insertBefore(last,first);
			box.style.left=-width+"px";
			animate(box,{left:0},600,function(){
				flag=true;
			});
		}
		right.onclick=function(){
			move();
		}
	}
//双轮播
	function carousel(obj,img,lis,left,right){
	var obj=obj;
	var width=obj.offsetWidth;
	var img=img;
	var lis=lis;
	var left=left;
	var right=right;
	var n=0;
	var next=0;
	var flag=true;
	var t=setInterval(move,2000);
	function move(type){
		type=type||'right';
			if(!flag){
			return;
			}
			flag=false;
			if(type=='right'){
				next=n+1;
				if(next>=img.length){
					next=0;
				}
			img[next].style.left=width+'px';
			animate(img[n],{left:-width},600);
		}else if(type=='left'){
			next=n-1;
			if(next<0){
				next=img.length-1;
			}
			img[next].style.left=-width+'px';
			animate(img[n],{left:width},600);
		}
			animate(img[next],{left:0},600,function(){flag=true});
			lis[n].style.background="#3E3E3E";
			lis[next].style.background='#B61B1F';
			n=next;
	}
	obj.onmouseover=function(){
		clearInterval(t)
	}
	obj.onmouseout=function(){
		t=setInterval(move,2000);
	}
	left.onclick=function(){
		move('left');
	}
	right.onclick=function(){
		move('right');
	}
	for(var i=0;i<lis.length;i++){
			lis[i].index=i;
			lis[i].onclick=function(){
			if(this.index<n){
				if(!flag){
					return;
				}
				flag=false;
				img[this.index].style.left=-width+'px';
				animate(img[n],{left:width},600);
			}else if(this.index>n){
				if(!flag){
					return;
				}
				flag=false;
				img[this.index].style.left=width+'px';
				animate(img[n],{left:-width},600);
			}
			animate(img[this.index],{left:0},600,function(){flag=true});
			lis[n].style.background="#3E3E3E";
			lis[this.index].style.background='#B61B1F';
			n=this.index;
			next=this.index;
			}
		}
	} 
//添加绑定事件
	function addEvent(obj,event,fun){
	 	if (obj.attachEvent){
	 		 obj.attachEvent("on"+event,fun);
	 	}   
	 	else{
	 		obj.addEventListener(event,fun,false);
	 	}
	}
// 移除绑定事件
	function removeEvent(obj,event,fun){
	 	if (obj.attachEvent){
 			 obj.detachEvent("on"+event,fun);
 		}   
 		else{
 			obj.removeEventListener(event,fun,false);
 		}
	} 
//鼠标滚轮事件
	function mouseWheel(obj,up,down){
		if(obj.attachEvent){
			obj.attachEvent("onmousewheel",scrollfun);
		}else{
			obj.addEventListener("mousewheel",scrollfun,false);
			obj.addEventListener("DOMMouseScroll",scrollfun,false);
		}
		function scrollfun(e){
			var e=e||window.event;
			if(e.preventDefault){
				e.preventDefault();
			}else{
				e.returnValue=false;
			}
			var nub=e.wheelDelta||e.detail;
			if(nub==120||nub==-3){
				// 改变this指针，将this指针指向obj
				up.call(obj);
			}else if(nub==-120||nub==3){
				down.call(obj);
			}
		}
	} 
//15.hover
//判断某个元素是否包含有另外一个元素
	function contains (parent,child) {
		if(parent.contains){
			return parent.contains(child) && parent!=child;
		}else{
			return (parent.compareDocumentPosition(child)===20);
		}
	}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
	function checkHover (e,target) {
		if(getEvent(e).type=="mouseover"){
			return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
				!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
		}else{
			return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
				!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
		}
	}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
	function hover (obj,overfun,outfun) {
		if(overfun){
			obj.onmouseover=function  (e) {
				if(checkHover(e,obj)){
					overfun.call(obj,[e]);
				}
			}
		}
		if(outfun){
			obj.onmouseout=function  (e) {
				if(checkHover(e,obj)){
					outfun.call(obj,[e]);
				}
			}
		}
	}
	function getEvent (e) {
		return e||window.event;
	}
// 创建cookie
	function setcookie(attr,value,time){
		if(time==undefined){
			document.cookie=attr+"="+value;
		}else{
			var now=new Date();
			now.setTime(now.getTime()+time*1000);
			document.cookie=attr+"="+value+";expires="+now.toGMTString();
		}
	}
// 获取cookie
	function getcookie(val){
		var str=document.cookie;
		var arr=str.split("; ");
		for(var i=0;i<arr.length;i++){
			var arrvalue=arr[i].split("=");
			if(val==arrvalue[0]){
				return arrvalue[1];
			}
		}return false;
	}
// 删除cookie
	function delcookie(attr){
		var now=new Date();
		now.setTime(now.getTime()-1);
		document.cookie="attr"+"="+"suibian;expires="+now.toGMTString();
	}
// ajax 封装函数
function ajax(obj){
	var url=obj.url;
	var type=obj.type||"GET";
	var datatype=obj.datatype||"text";
	var asynch=obj.asynch==undefined? true:obj.asynch;
	var success=obj.success;
	var data="";
	if(obj.data){
		for(var i in obj.data){
			data+=i+"="+obj.data[i]+"&";
		}
		data=data.slice(0,-1);
	}
	var ajax=window.XMLHttpRequest? new XMLHttpRequest():new ActiveXObject("microsoft.XMLHTTP");
	if(type=="GET"){
		ajax.open("GET",url+"?"+data,asynch);
		ajax.send(null);
	}else if(type=="POST"){
		ajax.open("POST",url,asynch);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if(ajax.status==200){
				if(success){
					if(datatype=="text"){
						success(ajax.responseText);
					}else if(datatype=="XML"){
						success(ajax.responseXML);
					}else if(datatype=="json"){
						success(eval("("+ajax.response+")"));
					}
				}
			}else if(ajax.status==404){
				alert("页面未找到");
			}else{
				alert("获取错误");
			}
		}
	}
}