/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var WINDOWS_WIDTH=window.screen.width;
var WINDOWS_HEIGHT=window.screen.height;
var RADIUS1=WINDOWS_WIDTH<WINDOWS_HEIGHT?WINDOWS_WIDTH/3:WINDOWS_HEIGHT/3;
var RADIUS2=1.3*RADIUS1;
var RADIUS3=(RADIUS2-RADIUS1)/2;
var LINEWIDTH=0.8*RADIUS3;

var i;
var m_p;
var sign;
var start;
var number;
var m_v;

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
	m_v=10;
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
				m_v
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
