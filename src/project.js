require=function o(s,r,a){function u(e,t){if(!r[e]){if(!s[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(p)return p(e,!0);var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}var n=r[e]={exports:{}};s[e][0].call(n.exports,function(t){return u(s[e][1][t]||t)},n,n.exports,o,s,r,a)}return r[e].exports}for(var p="function"==typeof require&&require,t=0;t<a.length;t++)u(a[t]);return u}({GameScript:[function(t,e,i){"use strict";cc._RF.push(e,"d526aPAsWJPR4IZFEvSxi7+","GameScript"),cc.Class({extends:cc.Component,properties:{starPrefab:{default:null,type:cc.Prefab},maxStarDuration:0,minStarDuration:0,ground:{default:null,type:cc.Node},player:{default:null,type:cc.Node},scoreDisplay:{default:null,type:cc.Label},scoreAudio:{default:null,url:cc.AudioClip}},onLoad:function(){this.groundY=this.ground.y+this.ground.height/2,this.timer=0,this.starDuration=0,this.spawnNewStar(),this.score=0},spawnNewStar:function(){var t=cc.instantiate(this.starPrefab);this.node.addChild(t),t.setPosition(this.getNewStarPosition()),(t.getComponent("KangScript").game=this).starDuration=this.minStarDuration+cc.random0To1()*(this.maxStarDuration-this.minStarDuration),this.timer=0},getNewStarPosition:function(){var t,e=this.groundY+cc.random0To1()*this.player.getComponent("PlayerScript").jumpHeight+30,i=this.node.width/2;return t=cc.randomMinus1To1()*i,cc.p(t,e)},start:function(){},update:function(t){this.timer>this.starDuration?this.gameOver():this.timer+=t},gameOver:function(){this.player.stopAllActions(),cc.director.loadScene("game")},gainScore:function(){this.score+=1,this.scoreDisplay.string="Score: "+this.score.toString(),cc.audioEngine.playEffect(this.scoreAudio,!1)}}),cc._RF.pop()},{}],HelloWorld:[function(t,e,i){"use strict";cc._RF.push(e,"280c3rsZJJKnZ9RqbALVwtK","HelloWorld"),cc.Class({extends:cc.Component,properties:{label:{default:null,type:cc.Label},text:"Hello, World!"},onLoad:function(){this.label.string=this.text},update:function(t){}}),cc._RF.pop()},{}],KangScript:[function(t,e,i){"use strict";cc._RF.push(e,"d568cbERkpHCaOMge83etRK","KangScript"),cc.Class({extends:cc.Component,properties:{pickRadius:0,game:{default:null,serializable:!1}},getPlayerDistance:function(){var t=this.game.player.getPosition();return cc.pDistance(this.node.position,t)},onPicked:function(){this.game.spawnNewStar(),this.game.gainScore(),this.node.destroy()},start:function(){},update:function(t){var e=1-this.game.timer/this.game.starDuration;this.node.opacity=50+Math.floor(205*e),this.getPlayerDistance()<this.pickRadius&&this.onPicked()}}),cc._RF.pop()},{}],PlayerScript:[function(t,e,i){"use strict";cc._RF.push(e,"c5507tXXFRFjpRQK4Mo4p/H","PlayerScript"),cc.Class({extends:cc.Component,properties:{jumpHeight:0,jumpDuration:0,maxMoveSpeed:0,accel:0},setJumpAction:function(){var t=cc.moveBy(this.jumpDuration,cc.p(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());return cc.repeatForever(cc.sequence(t,e))},setInputControl:function(){var e=this;cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,function(t){switch(t.keyCode){case cc.KEY.a:e.accLeft=!0;break;case cc.KEY.d:e.accRight=!0}}),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,function(t){switch(t.keyCode){case cc.KEY.a:e.accLeft=!1;break;case cc.KEY.d:e.accRight=!1}})},onLoad:function(){this.jumpAction=this.setJumpAction(),this.node.runAction(this.jumpAction),this.accLeft=!1,this.accRight=!1,this.xSpeed=0,this.setInputControl()},start:function(){},update:function(t){this.accLeft?this.xSpeed-=this.accel*t:this.accRight&&(this.xSpeed+=this.accel*t),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t}}),cc._RF.pop()},{}]},{},["HelloWorld","GameScript","KangScript","PlayerScript"]);