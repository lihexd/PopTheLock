# Tizen-App-PopTheLock

## Introduction/概述
Pop The Lock is a leisure game for Tizen mobile phones and Samsung Gear S2. Through a circular slide rail, there is a small dot on the slide, at the same time there is a bottom line generally small vertical lines, as a symbol of the end of the game, if the player control dots that crosses the vertical bar the game failed. Through stimulation of the hand of the spirit of fast activities and highly concentrated to alleviate the pressure of the people in daily life. This app not only runs well in Tizen mobile phones, but also runs well in Gear S2.  
  
  
Pop The Lock 是一款休闲游戏，针对长时间使用手机的人，缓解长期使用手机的疲累，锻炼人的反应能力。通过一个圆形滑轨，有一个小圆点在其上滑动，同时有一个底线一般的小竖线，作为游戏结束的标志，如果玩家的控制的小圆点跨过了竖线则游戏失败。通过刺激人的手的快速活动和精神的高度集中来缓解人们在日常生活中的压力。非常好玩。
## Algorithm/算法介绍
Pop The Lock based on TIZEN web project development, mainly USES The technology of Html and Javascript. By ontouchstart, ontouchmove and ontouchend method in computing the fingers touch to determine whether the origin and horizontal line contact, thus into the offset, the end points or operations.  
  
  
Pop The Lock基于TIZEN web project开发，主要使用了Html与Javascript技术。通过在ontouchstart、ontouchmove和ontouchend方法中计算手指触碰来判断原点是否与横线相接触，从而进抵消、加分或结束等操作。  
##    
interface               	Interface functions 

Init	                 	Initialize the game interface  

NewTile	                	Initialize the origin and the horizontal line   

RandomTile              	Randomly generated new dash  

move	                 	Move the origin   

Merge		                To offset the origin and the horizontal line  


```js
var WINDOWS_WIDTH=window.screen.width;
var WINDOWS_HEIGHT=window.screen.height;
var RADIUS1=WINDOWS_WIDTH<WINDOWS_HEIGHT?WINDOWS_WIDTH/4:WINDOWS_HEIGHT/4;
var RADIUS2=1.3*RADIUS1;
var RADIUS3=(RADIUS2-RADIUS1)/2;
var LINEWIDTH=0.8*RADIUS3;

var i;
var m_p;
var sign;
var start;
var number;

function drawball(cxt,deg){
	deg=deg*2*Math.PI/360;
	cxt.beginPath();
	cxt.fillStyle="#ffff00";
	cxt.arc((RADIUS1+RADIUS2)/2*Math.sin(deg)+WINDOWS_WIDTH/2,-(RADIUS1+RADIUS2)/2*Math.cos(deg)+WINDOWS_HEIGHT/2,RADIUS3,0,2*Math.PI);
	cxt.fill();
}

function drawnumber(cxt,num){
	cxt.font=0.8*RADIUS1+"px 华文琥珀";
	cxt.textAlign="center";
	cxt.textBaseline="middle";
	cxt.fillStyle="white";
	cxt.fillText(num,WINDOWS_WIDTH/2,WINDOWS_HEIGHT/2);
}

function drawLine(cxt,deg,RADIUS1,RADIUS2){
	deg=deg*2*Math.PI/360;
	cxt.beginPath();
	cxt.lineWidth=23;
	cxt.lineWidth=LINEWIDTH;
	cxt.lineCap="round";
	cxt.strokeStyle="#f73d64";
	cxt.moveTo(RADIUS1*Math.sin(deg)+WINDOWS_WIDTH/2,-RADIUS1*Math.cos(deg)+WINDOWS_HEIGHT/2);
	cxt.lineTo(RADIUS2*Math.sin(deg)+WINDOWS_WIDTH/2,-RADIUS2*Math.cos(deg)+WINDOWS_HEIGHT/2);
	cxt.stroke();
}

function init(cxt1,cxt2){
	i=0;
	start=0;
	number=0;
	sign=Math.random()>0.5?1:-1;
	if(sign===1){
		m_p=i+35+Math.random()*120;
	}else{
		m_p=i-35-Math.random()*120;
	}
	document.getElementById("bgCanvas").style.background="#30df87";
	drawnumber(cxt1,number);
	drawball(cxt1,m_p);
	drawLine(cxt2,0,RADIUS1,RADIUS2);
}

function newgame(canvas,cxt1,cxt2){
	init(cxt1,cxt2);
	var h;
	document.addEventListener('touchstart',function(e){
		if(start===1){
			if(Math.abs(i-m_p)>12){
				clearInterval(h);
				document.getElementById("bgCanvas").style.background="#f07752";
				start=-1;
			}
			else{
				if(sign===1){sign=-1;}
				else {sign=1;}
				number++;
				if(sign===1){
					m_p=i+35+Math.random()*120;
				}
				else{
					m_p=i-35-Math.random()*120;
				}
				cxt1.clearRect(0,0,WINDOWS_WIDTH,WINDOWS_HEIGHT);
				drawnumber(cxt1,number);
				drawball(cxt1,m_p);
			}
		}
		else if(start===0){
			h=setInterval(
				function(){
					cxt2.clearRect(0,0,WINDOWS_WIDTH,WINDOWS_HEIGHT);
					drawLine(cxt2,i,RADIUS1,RADIUS2);
					
					if(sign===1&&i>m_p+12||sign===-1&&i<m_p-12){
						clearInterval(h);
						document.getElementById("bgCanvas").style.background="#f07752";
						start=-2;
					}
					if(sign===1){i+=1;}
					else {i-=1 ;}
				},
				50
			);
			start=1;
		}
		else if(start===-1){
			cxt1.clearRect(0,0,WINDOWS_WIDTH,WINDOWS_HEIGHT);
			cxt2.clearRect(0,0,WINDOWS_WIDTH,WINDOWS_HEIGHT);
			init(cxt1,cxt2);
			start=0;
		}
		else{
			start=-1;
		}
	});
}

function drawBound(cxt,RADIUS,color){
	cxt.beginPath();
	cxt.lineWidth=1;
	cxt.fillStyle=color;
	cxt.arc(WINDOWS_WIDTH/2,WINDOWS_HEIGHT/2,RADIUS,0,2*Math.PI);
	cxt.fill();
}

window.onload=function(){
	
	var bcanvas=document.getElementById("bgCanvas");
	bcanvas.width=WINDOWS_WIDTH;
	bcanvas.height=WINDOWS_HEIGHT;
	var bcontext=bcanvas.getContext("2d");
	
	var canvas1=document.getElementById("myCanvas1");
	canvas1.width=WINDOWS_WIDTH;
	canvas1.height=WINDOWS_HEIGHT;
	var context1=canvas1.getContext("2d");
	
	var canvas2=document.getElementById("myCanvas2");
	canvas2.width=WINDOWS_WIDTH;
	canvas2.height=WINDOWS_HEIGHT;
	var context2=canvas2.getContext("2d");
	
	drawBound(bcontext,RADIUS2+LINEWIDTH/2,"#204f7c");
	drawBound(bcontext,RADIUS1-LINEWIDTH/2,"#7dd1e6");
	
	document.addEventListener('tizenhwkey', function(e) {
		if(e.keyName == "back") {
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (error) {
				console.error("getCurrentApplication(): " + error.message);
			}
		}
	});
	
	newgame(canvas2,context1,context2);
}
	```
