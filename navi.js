/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

/*
 *	jQuery: Navi.js Content Switcher - v1.1 - 1/14/2013
 *  http://navi.grantcr.com
 *	https://github.com/tgrant54/Navi.js
 *  Copyright (c) 2013 Tyler Grant
 *	Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 */
 ;(function($){
	$.fn.navi = function(o){
		this.each(function() {
			var t=$(this),
				d=t.data("navi"),
				_={
					hash:"#!/",
					content: $("#content"),
					hrefs: $([]),
					pages: [],
					defaultPage:true,
					defaultPageHash:true,
					useAnimation:true,
					animationSpeed:100,
					usePageTitle:true,
					defaultPageTitle:"Navi.js",
					
					init:function() {
						_.menu=$(">ul>li",_.me)
						_.cont=$(">ul>li",_.content)
						_.hashLen=_.hash.length
						_.loadHref()
						_.loadPages()
						_.defaultPage?_.loadDefault():false
						_.hideOther()
						_.setActive()
						_.usePageTitle?_.pageTitle():false
					},
					hideOther:function(){
						_.cont.each(function(e){
							$(e).hasClass("active")?$(e).siblings().removeClass("active").css('display','none'):false
						})
					},
					loadHref:function(){
						_.menu.each(function(n,e) {
							_.hrefs[n]=$("> a",e).attr("href")
						})
					},
					loadPages:function(){
						_.hrefs.each(function(n){
							_.pages[n]=$(this).slice(_.hashLen)
						})
					},
					loadDefault:function(){
						_.menu.each(function(i,e){
							if ($(e).hasClass("active")){
								_.cont.each(function(n,el){ 
									var a = $(el).attr("id")
									if ($(">a",e).attr("href").slice(_.hashLen)==a){
										$(el).siblings().css("display","none")
										$(el).addClass("active").siblings().removeClass("active")
									}
								})
							}
						})
					},
					setActive:function(c){
						var ids = [],
							links = [],
							curHash = location.hash.slice(_.hashLen);
					
						_.cont.each(function(n,e){
							ids[n] = $(e).attr("id")
							if (curHash==ids[n]&&location.hash.slice(0,_.hashLen)==_.hash){
								$(e).fadeIn().addClass("active").siblings()
								.css("display","none").removeClass("active")
							}
						})
						_.menu.each(function(n,e){
							links[n]=$(">a",e).attr("href").slice(_.hash.length)
							if (curHash==links[n]){
								$(e).addClass("active").siblings().removeClass("active")
							}
						})
						_.pageTitle()
					},
					debug:function(str){
						console.log(str)
					},
					animation:function(s,cb){
						_.cont.each(function(n,e){
							var h = $(e).height()
							$(e).attr('height',h)
							_.content.stop().animate({
								height: "0"
							},s,function() {
								_.setActive()
								_.cont.each(function(n,e){
									if ($(e).hasClass("active")){
										_.content.stop().animate({
											height: Number($(e).attr("height"))+5+"px"
										},s,cb)
									}
								})
							})
						})
						
						$(window).bind("resize",function(){
							_.cont.each(function(i,e){
								if ($(e).hasClass("active")){
									_.activeHeight=$(e).height()
									_.content.stop().animate({
										height: Number(_.activeHeight)+5+"px"
									},s)
								}
							})
						})
					},
					pageTitle:function() {
						if (_.usePageTitle) {
							_.menu.each(function(i,e){
								if ($(e).hasClass("active")){
									var title = $(e).attr("data-title")
									$("title").text(_.defaultPageTitle+title)
								}
							})
						}
					}
				}
			d?_=d:t.data({navi: _})
			if (typeof o == 'object'){
				$.extend(_,o);
			}
			_.me||_.init(_.me=t)
			
			$(window).hashchange(function(){
				location.hash==_.hash?_.setActive():_.useAnimation?_.animation(_.animationSpeed):_.setActive();

				
			})
		})
		return this
	}
})(jQuery);
