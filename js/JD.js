$(function() {
	// banner轮播
	var box = $("#ban-center");
	var img = $(".banner-img");
	var min1 = $(".min1");
	var width = parseInt(getStyle(box, "width"));
	var left = $("#left");
	var right = $("#right");
	// console.log(box,img,min,width,left,right)
	var n = 0;
	var flag = true;
	var time = setInterval(con, 2000);

	function con() {
		if(!flag){
			flag=true;
			return;
		}
		flag=false;
		n++;
		if(n >= img.length) {
			n = 0;
		}
		for(var i = 0; i < img.length; i++) {
			animate(img[i],{opacity:0},300);
		}
		animate(img[n],{opacity:1},300,function(){flag=true;});
	}
	box.onmouseover = function() {
		clearInterval(time);
	}
	box.onmouseout = function() {
		time = setInterval(con, 2000);
	}
	left.onclick = function() {
		if(!flag){
			flag=true;
			return;
		}
		flag=false;
		n--;
		if(n < 0) {
			n = img.length - 1;
		}
		for(var i = 0; i < img.length; i++) {
			animate(img[i],{opacity:0},700);
		}
		animate(img[n],{opacity:1},700,function(){flag=true;});
	}
	right.onclick = function() {
			con();
		}
// 头部的下拉效果
	 var leftsss=$(".select");
  	 var buding=$(".buding");
      for(var i=0;i<leftsss.length;i++){ 
         leftsss[i].index=i;
         hover(leftsss[i],function(){
           var rightsss=$(".select-lis",this);
           for(var i=0;i<rightsss.length;i++){
             rightsss[i].style.display="block";
             leftsss[this.index].style.background="#fff";
             buding[this.index].style.display="block";
           }
         },function(){
           var rightsss=$(".select-lis",this);
           for(var i=0;i<rightsss.length;i++){
             rightsss[i].style.display="none";
             leftsss[this.index].style.background="";
             buding[this.index].style.display="none";
           }
       })
     }
// 楼层跳转
	var lou = $(".lou");
	var left_1 = $(".left-1")[0];
	var left_lou = $(".left-lou");
	var cHeight = document.documentElement.clientHeight;
	// var btn=$(".btn")[0];
	var nHeight;
	var a = true;
	var b = true;
	var now;
	var louceng = $(".louceng");
	var text = $(".text");
	// 拿到每层楼到顶部的距离并保存
	for(var i = 0; i < lou.length; i++) {
		lou[i].h = lou[i].offsetTop;
	}

	window.onscroll = function() {
		var obj = document.body.scrollTop ? document.body : document.documentElement;
		var top = obj.scrollTop;
		if(top >= lou[0].h - 400) {
			left_1.style.display = "block";
			nHeight = left_1.offsetHeight;
			left_1.style.top = (cHeight - nHeight) / 2 + "px";
		}
		if(top < lou[0].h - 400) {
			left_1.style.display = "none";

		}
		for(var i = 0; i < lou.length; i++) {
			if(top >= lou[i].h) {
				for(var j = 0; j < left_lou.length; j++) {
					louceng[j].style.display = "block";
					text[j].style.display = "none";
				}
				louceng[i].style.display = "none";
				text[i].style.display = "block";
				now = i;
			}
		}
	}
	for(var j = 0; j < left_lou.length; j++) {
		left_lou[j].index = j;
		left_lou[j].onclick = function() {
			// if(a){
			// 	a=false;
			// 	clear(window.onscroll);
			// }
			animate(document.body, {
				scrollTop: lou[this.index].h
			});
			animate(document.documentElement, {
				scrollTop: lou[this.index].h
			});
			now = this.index;
		}
		left_lou[j].onmouseover = function() {
			louceng[this.index].style.display = "none";
			text[this.index].style.display = "block";
		}
		left_lou[j].onmouseout = function() {
			if(this.index == now) {
				return;
			}
			louceng[this.index].style.display = "block";
			text[this.index].style.display = "none";
		}
	}
//小轮播
	function carousel(obj, img, lis, left, right) {
		var obj = obj;
		var width = obj.offsetWidth;
		var img = img;
		var min = lis;
		var left = left;
		var right = right;
		var n = 0;
		var next = 0;
		var flag = true;
		var time = setInterval(con, 2000);

		function con(type) {
			var type = type || "l";
			if(flag == false) {
				return;
			}
			flag = false;
			if(type == "l") {
				next = n + 1;
				if(next >=img.length) {
					next = 0;
				}
				img[next].style.left = width + "px";
				animate(img[n], {
					left: -width
				}, 800);
			} else if(type == "r") {
				next = n - 1;
				if(next <= 0) {
					next = img.length - 1;
				}
				img[next].style.left = -width + "px";
				animate(img[n], {
					left: width
				}, 800);
			}
			animate(img[next], {
				left: 0
			}, 800, function() {
				flag = true;
			});
			min[n].style.background = "#3E3E3E";
			min[next].style.background = "#B61B1F";
			n = next;
		}
		// 清除时间进程时，清除的只是进程号。生命的变量没有清除，所以移出鼠标后还是接着往下移动
		obj.onmouseover = function() {
			clearInterval(time);
		}
		obj.onmouseout = function() {
				time = setInterval(con, 2000);
			}
			// 点击左边按钮，应该从左往右走

		left.onclick = function() {
			con("r");
		}
		right.onclick = function() {
			con("l");
		}
			// 右边按钮点击事件。点击从左往右。
		for(var i = 0; i < min.length; i++) {
			min[i].index = i;
			min[i].onclick = function() {
				//点击的点比现在图片对应的点打，则应该从右往左走
				if(this.index > n) {
					if(flag == false) {
						return;
					}
					flag = false;
					img[this.index].style.left = width + "px";
					animate(img[n], {
						left: -width
					}, 800);
				}
				//				小于n，则从左往右走
				else if(this.index < n) {
					if(flag == false) {
						return;
					}
					flag = false;
					img[this.index].style.left = -width + "px";
					animate(img[n], {
						left: width
					}, 800);
				}
				animate(img[this.index], {
					left: 0
				}, 800, function() {
					flag = true;
				});
				min[n].style.background = "#3E3E3E";
				min[this.index].style.background = "#B61B1F";
				n = this.index;
			}
		}
	}
	carousel($(".top-two")[0], $(".pic"), $(".min2"), $("#left1"), $("#right1"));
	carousel($(".rongyao")[0], $(".pict4"), $(".min10"), $(".left-16")[0], $(".right-16")[0]);
	carousel($(".rongyao1")[0], $(".pict1"), $(".min4"), $(".left-11")[0], $(".right-11")[0]);
	carousel($(".rongyao2")[0], $(".pict2"), $(".min5"), $(".left-12")[0], $(".right-12")[0]);
	carousel($(".rongyao3")[0], $(".pict3"), $(".min6"), $(".left-13")[0], $(".right-13")[0]);
	carousel($(".top-two1")[0], $(".pic3"), $(".min9"), $(".left-15")[0], $(".right-15")[0]);
	carousel($(".top-two2")[0], $(".pic2"), $(".min8"), $(".left-14")[0], $(".right-14")[0]);
	carousel($(".run4")[0], $(".pictr"), $(".min12"), $(".left-17")[0], $(".right-17")[0]);
	carousel($(".run5")[0], $(".pictr1"), $(".min13"), $(".left-18")[0], $(".right-18")[0]);
	carousel($(".run6")[0], $(".pictr2"), $(".min14"), $(".left-19")[0], $(".right-19")[0]);
	carousel($(".run7")[0], $(".pictr3"), $(".min15"), $(".left-20")[0], $(".right-20")[0]);
	carousel($(".great-top")[0], $(".pictu"), $(".min0"), $("#left12"), $("#right12"))
	// 侧导航全部分类选项卡
	var banLeft = $(".ban-left")[0];
	var classLeft = $(".left", banLeft);
	var classa = $(".classa");
	var alianjie = $(".jiayong", banLeft);
	// 遍历
	for(var i = 0; i < classLeft.length; i++) {
		// 赋值
		classLeft[i].index = i;
		hover(classLeft[i], function() {
			// 导航点击事件
			for(var i = 0; i < classLeft.length; i++) {
				classLeft[i].style.cssText = "background-color:#C81623;"
				alianjie[i].style.color = "#fff";
			}
			classLeft[this.index].style.cssText = "background-color:#F7F7F7;"
			alianjie[this.index].style.color = "#C81623";
			// 图片点击事件；不点击时图片消失。none
			for(var j = 0; j < classa.length; j++) {
				classa[j].style.display = "none";
			}
			// 点击事件发生后，图片点击的这张显示。block
			classa[this.index].style.display = "block";
		}, function() {
			classa[this.index].style.display = "none";
		})
	}
	// 1楼选项卡
	 function xuxiangka(obj){
        var box=obj;
        var option_nav=$(".option-nav",box);
        var option_lis=$(".option-lis",box);
        var hidden=$(".hidden",box);
        for(var i=0;i<option_nav.length;i++){
          option_nav[i].index=i;
         option_nav[i].onmouseover=function(){
            for                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               (var i=0;i<hidden.length;i++){
              hidden[i].index=i;
              hidden[i].style.display="none";
              
            }
             hidden[this.index].style.display="block";
            this.style.cssText="border-color: #E5004F;border-bottom:0";
            for(var i=0;i<option_lis.length;i++){
              option_lis[i].style.cssText="display:none;"
            }option_lis[this.index].style.cssText="display:block;"
          }
        }
      }
      xuxiangka($(".bags")[0]);
      xuxiangka($(".beauty")[0]);
      xuxiangka($(".phoneaa")[0]); 
      xuxiangka($(".home")[0]);
      xuxiangka($(".computer")[0]);
      xuxiangka($(".sport")[0]);
      xuxiangka($(".toy")[0]);
      xuxiangka($(".living")[0]);
      xuxiangka($(".food")[0]);
      xuxiangka($(".book")[0]);
      xuxiangka($(".car")[0]);
	// 购物车
	var gouwu=$(".gouwu")[0];
	var gouwuche=$(".gouwuche")[0];
	hover(gouwu,function(){
		gouwuche.style.display="block";
	},function(){
		gouwuche.style.display="none";
	})
	// 最后的上下轮播
	function nodeLunbo(obj,box){
		var lunbo=obj;
		var box=box;
		var shaidan=$(".shaidan")[0];
		var height=shaidan.offsetHeight;
		var t=setInterval(move,1500);
		function move(){
			animate(box,{top:-height},600,function(){
				var imgfirst=getFirst(box);     //拿到第一张图片并放到最后
				box.appendChild(imgfirst);
				box.style.top="0";   //因为浮动起来后，会往前挤，所以把盒子拿回来
			})
		}
		lunbo.onmouseover=function(){
			clearInterval(t);
		}
		lunbo.onmouseout=function(){
			t=setInterval(move,1500);
		}
	}
	nodeLunbo($(".zuihou")[0],$("#toplunbo"));
	// 今日推荐轮播
	function nodeLun(obj,left,right,box,img1){
		var lunbo=obj;
		var left=left;
		var right=right;
		var box=box;
		var img1=img1;
		var width=parseInt(getStyle(img1,"width"));
		console.log(width)
		var t=setInterval(move,2000);
		function move(){
			animate(box,{left:-width},1500,function(){
				var imgfirst=getFirst(box);     //拿到第一张图片并放到最后
				// console.log(imgfirst)
				box.appendChild(imgfirst);
				box.style.left="0";   //因为浮动起来后，会往前挤，所以把盒子拿回来
			})
		}
		lunbo.onmouseover=function(){
			clearInterval(t);
		}
		lunbo.onmouseout=function(){
			t=setInterval(move,2000);
		}
		left.onclick=function(){
			var last=getLast(box);
			var first=getFirst(box);
			insertBefore(last,first);
			box.style.left=-width+"px";
			animate(box,{left:0},1500);
		}
		right.onclick=function(){
			move();
		}
	}

	nodeLun($(".td-right")[0],$(".lb-left")[0],$(".lb-right")[0],$(".lunbo-td")[0],$(".buy-box")[0]);
	var floor1=$('.floor')
	var floor_hide=$('.floor_hide')
	var floor_hidetu=$('.floor_hidetu')
	var floor_tu=$(".floor_tu");
	for(var i=0;i<floor1.length;i++){
		floor1[i].index=i
		hover(floor1[i],function(){
			floor_hidetu[this.index].style.display='block';
			floor_hide[this.index].style.display='block';
			animate(floor_hide[this.index],{left:-56},300)

		},function(){
			floor_hide[this.index].style.display='none';
			floor_hidetu[this.index].style.display='none';
			animate(floor_hide[this.index],{left:0},300)
		})
	}
	var fankui=$(".fankui")[0];
	var fankui_hide=$(".fankui_hide")[0];
	var fankui_hidetu=$(".fankui_hidetu")[0];
	hover(fankui,function(){
		fankui_hide.style.display="block";
		fankui_hidetu.style.display="block";
		animate(fankui_hide,{left:-45},300);
	},function(){
		fankui_hide.style.display="none";
		fankui_hidetu.style.display="none";
		animate(fankui_hide,{left:0},300);
	})
	var back=$(".fanhuidingbu")[0];
	var back_hide=$(".fanhuidingbu_hide")[0];
	var back_tu=$(".fanhuidingbu_hidetu")[0];
	hover(back,function(){
		back_hide.style.display="block";
		back_tu.style.display="block";
		animate(back_hide,{left:-45},300);
		back.onclick=function(){
			animate(document.body,{scrollTop:0},400);
			animate(document.documentElement,{scrollTop:0},400);
		}
	},function(){
		back_hide.style.display="none";
		back_tu.style.display="none";
		animate(back_hide,{left:0},300);
	})
})