(function(e){if(typeof module==="function"){module.exports=e(this.jQuery||require("jquery"))}else if(typeof define==="function"&&define.amd){define(["jquery"],function(t){return e(t)})}else{this.NProgress=e(this.jQuery)}})(function(e){function r(e,t,n){if(e<t)return t;if(e>n)return n;return e}function i(e){return(-1+e)*100}function s(e,t,r){var s;if(n.positionUsing==="translate3d"){s={transform:"translate3d("+i(e)+"%,0,0)"}}else if(n.positionUsing==="translate"){s={transform:"translate("+i(e)+"%,0)"}}else{s={"margin-left":i(e)+"%"}}s.transition="all "+t+"ms "+r;return s}var t={};t.version="0.1.2";var n=t.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:true,trickleRate:.02,trickleSpeed:800,showSpinner:true,template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};t.configure=function(t){e.extend(n,t);return this};t.status=null;t.set=function(e){var i=t.isStarted();e=r(e,n.minimum,1);t.status=e===1?null:e;var o=t.render(!i),u=o.find('[role="bar"]'),a=n.speed,f=n.easing;o[0].offsetWidth;o.queue(function(r){if(n.positionUsing==="")n.positionUsing=t.getPositioningCSS();u.css(s(e,a,f));if(e===1){o.css({transition:"none",opacity:1});o[0].offsetWidth;setTimeout(function(){o.css({transition:"all "+a+"ms linear",opacity:0});setTimeout(function(){t.remove();r()},a)},a)}else{setTimeout(r,a)}});return this};t.isStarted=function(){return typeof t.status==="number"};t.start=function(){if(!t.status)t.set(0);var e=function(){setTimeout(function(){if(!t.status)return;t.trickle();e()},n.trickleSpeed)};if(n.trickle)e();return this};t.done=function(e){if(!e&&!t.status)return this;return t.inc(.3+.5*Math.random()).set(1)};t.inc=function(e){var n=t.status;if(!n){return t.start()}else{if(typeof e!=="number"){e=(1-n)*r(Math.random()*n,.1,.95)}n=r(n+e,0,.994);return t.set(n)}};t.trickle=function(){return t.inc(Math.random()*n.trickleRate)};t.render=function(r){if(t.isRendered())return e("#nprogress");e("html").addClass("nprogress-busy");var s=e("<div id='nprogress'>").html(n.template);var o=r?"-100":i(t.status||0);s.find('[role="bar"]').css({transition:"all 0 linear",transform:"translate3d("+o+"%,0,0)"});if(!n.showSpinner)s.find('[role="spinner"]').remove();s.appendTo(document.body);return s};t.remove=function(){e("html").removeClass("nprogress-busy");e("#nprogress").remove()};t.isRendered=function(){return e("#nprogress").length>0};t.getPositioningCSS=function(){var e=document.body.style;var t="WebkitTransform"in e?"Webkit":"MozTransform"in e?"Moz":"msTransform"in e?"ms":"OTransform"in e?"O":"";if(t+"Perspective"in e){return"translate3d"}else if(t+"Transform"in e){return"translate"}else{return"margin"}};return t})