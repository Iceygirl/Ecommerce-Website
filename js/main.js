/* main.js document */

window.onload = function (){
	mx.app.showTip();
	mx.app.showBanner();
	mx.app.showMenu();
	mx.app.toRun();
}

var mx = {};

mx.tools = {};
mx.tools.getStyle = function (obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] :getComputedStyle(obj,false)[attr];
}

mx.tools.getByClass = function (oParent,sClass){
	var arr = [];
	var aEle = oParent.getElementsByTagName('*');
	var re = new RegExp('\\b'+sClass+'\\b');  
	
	for(var i=0;i<aEle.length;i++){
		if( aEle[i].className.search(re) != -1){
			arr.push(aEle[i]);
		}
	}
	
	return arr;
}
mx.ui = {};
mx.ui.textChange = function (obj,str){
	
	obj.onfocus = function (){
		if(obj.value == str){
			obj.value = '';
		}
	}
	
	obj.onblur = function (){
		if(obj.value == ''){
			obj.value = str;
		}
	}
}

mx.ui.fadeIn = function (obj){
	
	var cur = mx.tools.getStyle(obj,'opacity');
	if(cur == 100){
		return false;
	}
	
	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function (){
		var speed = 5;
		if(value == 100){
			clearInterval(obj.timer);
		}else{
			value+=speed;
			obj.style.opacity = value/100;
		}
	},30);
}

mx.ui.fadeOut = function (obj){
	var cur = mx.tools.getStyle(obj,'opacity');
	if(cur == 0){
		return false;
	}
	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function (){
		var speed = -5;
		if(value == 0){
			clearInterval(obj.timer);
		}else{
			value+=speed;
			obj.style.opacity = value/100;
		}
	},30);
}

mx.ui.move = function (obj,old,now){
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		var iSpeed = (now-old)/10;
		iSpeed = iSpeed>0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
		
		if( old == now){
			clearInterval(obj.timer);
		} else {
			old += iSpeed;
			obj.style.left = old +'px';
		}
	},30);
}

mx.app = {};
mx.app.showTip = function (){
	var oTxt1 = document.getElementById('text1');
	var oTxt2 = document.getElementById('text2');
	
	mx.ui.textChange(oTxt1,'Search Websit');
	mx.ui.textChange(oTxt2,'Search Websit');
}

mx.app.showBanner = function (){
	var oAd = document.getElementById('ad');
	var oUl = oAd.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	
	var oP = oAd.getElementsByTagName('p')[0];
	var pArr = [
		'1Lorem ipsum dolor sit amet Cras bibendum porta diam, non dignissim sapien malesuada vitae.',
		'2Consectetur adipiscing elit.',
		'3Cras suscipit lacus dapibus ante mattis in adipiscing nibh placerat.'
	];
	
	
	var iNow = 0;
	var timer = setInterval(auto,3000);
	
	oP.innerHTML = pArr[iNow];
	
	function auto (){
		if(iNow > aLi.length-1){
			iNow = 0;
		}
		
		var iSub = (iNow+1)%pArr.length;
		oP.innerHTML = pArr[iSub];  //之前想要初始化auto()，有些问题产生
		
		for(var i=0;i<aLi.length;i++){
			mx.ui.fadeOut(aLi[i]);
		}
		
		mx.ui.fadeIn(aLi[iNow]);
		
		iNow++;
	}
	
	function autoPrev(){
		if(iNow < 0){
			iNow = aLi.length-1;
		}
		
		for(var i=0;i<aLi.length;i++){
			mx.ui.fadeOut(aLi[i]);
		}
		
		mx.ui.fadeIn(aLi[iNow]);
		oP.innerHTML = pArr[iNow];
		iNow--;
	}
	
	
	var oPrev = mx.tools.getByClass(oAd,'prevAd')[0];
	var oNext = mx.tools.getByClass(oAd,'nextAd')[0];
	var oPrevBg = mx.tools.getByClass(oAd,'prevBg')[0];
	var oNextBg = mx.tools.getByClass(oAd,'nextBg')[0];
	
	oPrevBg.onmouseover = oPrev.onmouseover = function (){
		oPrev.style.display = 'block';
		clearInterval(timer);
	}
	oNextBg.onmouseover = oNext.onmouseover = function (){
		oNext.style.display = 'block';
		clearInterval(timer);
	}
	oPrevBg.onmouseout = function (){
		oPrev.style.display = 'none';
		timer = setInterval(auto,3000);
	}
	oNextBg.onmouseout = function (){
		oNext.style.display = 'none';
		timer = setInterval(auto,3000);
	}
	
	oPrev.onclick = function (){
		autoPrev();
	}
	
	oNext.onclick = function (){
		auto();
	}
}

mx.app.showMenu = function (){
	var oSort = document.getElementById('sort');
	var aDd = oSort.getElementsByTagName('dd');
	var aUl = oSort.getElementsByTagName('ul');
	var aH =  oSort.getElementsByTagName('h2');
	
	for(var i=0;i<aDd.length;i++){
		aDd[i].index = i;
		
		aDd[i].onclick = function (ev){
			var ev = ev || window.event;
			var This = this;
			
			for(var i=0;i<aDd.length;i++){
				aUl[i].style.display = 'none';
			}
			aUl[this.index].style.display = 'block';
			
			document.onclick = function (){
				aUl[This.index].style.display = 'none';
			}
			
			ev.cancelBubble = true;
		}
	}
	
	for(var i=0;i<aUl.length;i++){
		aUl[i].index = i;
		
		(function (ul){
			var aLi = ul.getElementsByTagName('li');
			
			for(var i=0;i<aLi.length;i++){
				aLi[i].index = i;
				aLi[i].onmouseover = function (){
					
					for(var i=0;i<aLi.length;i++){
						aLi[i].className ='';
					}
					
					aLi[this.index].className = 'active';
				}
				
				aLi[i].onclick = function (ev){
					var ev = ev || window.event;
					aH[this.parentNode.index].innerHTML = this.innerHTML;
					ev.cancelBubble = true;
					this.parentNode.style.display = 'none';
				}
			}
		})(aUl[i]);
	}
	
}

mx.app.toRun = function (){
	var oUl = document.getElementById('list');
	var aLi = oUl.getElementsByTagName('li');
	
	var oDiv = document.getElementById('scroll_wrap_r');
	var oPrev = mx.tools.getByClass(oDiv,'prev')[0];
	var oNext = mx.tools.getByClass(oDiv,'next')[0];
	
	oUl.innerHTML += oUl.innerHTML;
	oUl.style.width = aLi[0].offsetWidth*aLi.length + 'px';
	var iNow = 0;
	
	var timer = setInterval(auto,1300);
	
	function auto(){
		if( iNow == aLi.length/2){
			iNow = 0;
			oUl.style.left = 0;
		}
		mx.ui.move(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
		iNow++;
	}
	
	function autoPrev(){
		if( iNow == 0){
			iNow = aLi.length/2;
			oUl.style.left = -oUl.offsetWidth/2+'px';
		}
		mx.ui.move(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
		iNow--;
	}
	
	oPrev.onclick = function (){
		autoPrev();
		//alert('a');
	}
	
	oNext.onclick = function (){
		auto();
	}
	
	oDiv.onmouseover = function (){
		clearInterval(timer);
	}
	
	oDiv.onmouseout = function (){
		timer = setInterval(auto,1200);
	}
}

