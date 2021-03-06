// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
//window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
//(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
//(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

/*
 * jQuery EasyDate 0.2.4 ($Rev: 54 $)
 * Copyright (c) 2009 Parsha Pourkhomami (parshap@gmail.com)
 * Licensed under the MIT license.
 */
(function(e){e.easydate={};e.easydate.locales={};e.easydate.locales.enUS={future_format:"%s %t",past_format:"%t %s",second:"second",seconds:"seconds",minute:"minute",minutes:"minutes",hour:"hour",hours:"hours",day:"day",days:"days",week:"week",weeks:"weeks",month:"month",months:"months",year:"year",years:"years",yesterday:"yesterday",tomorrow:"tomorrow",now:"just now",ago:"ago","in":"in"};var d={live:true,set_title:true,format_future:true,format_past:true,units:[{name:"now",limit:5},{name:"second",limit:60,in_seconds:1},{name:"minute",limit:3600,in_seconds:60},{name:"hour",limit:86400,in_seconds:3600},{name:"yesterday",limit:172800,past_only:true},{name:"tomorrow",limit:172800,future_only:true},{name:"day",limit:604800,in_seconds:86400},{name:"week",limit:2629743,in_seconds:604800},{name:"month",limit:31556926,in_seconds:2629743},{name:"year",limit:Infinity,in_seconds:31556926}],uneasy_format:function(p){return p.toLocaleDateString()},locale:e.easydate.locales.enUS};var f=0;var k={};var h={};var a={};function l(r,q,p){if(!isNaN(q)&&q!=1){r=r+"s"}return p.locale[r]||r}var o=e.easydate.pause=function(q){var s=function(p){clearTimeout(k[p]);delete k[p];h[p]=true};if(!q){for(var r in k){s(r)}}else{e(q).each(function(){var p=jQuery.data(this);if(!isNaN(k[p])){s(p)}})}};var c=e.easydate.resume=function(p){var s=function(r){delete h[r];b(a[r])};if(!p){for(var q in h){s(q)}}else{e(p).each(function(){var r=jQuery.data(this);if(!isNaN(h[r])){s(r)}})}};var g=e.easydate.set_now=function(q){var r;if(q instanceof Date){r=q.getTime()}else{r=Date.parse(q)}if(isNaN(r)){return}f=r-(new Date()).getTime();for(var p in a){if(!isNaN[k[p]]){clearTimeout(k[p])}b(a[p])}};var n=e.easydate.get_now=function(){var p=new Date();p.setTime(p.getTime()+f);return p};var j=e.easydate.format_date=function(q,x){var r=e.extend({},d,x);var v=((n().getTime()-q.getTime())/1000);var u=Math.abs(v);if(isNaN(v)){return}if((!r.format_future&&v<0)||(!r.format_past&&v>0)){return}for(var s in r.units){var w=r.units[s];if((w.past_only&&v<0)||(w.future_only&&v>0)){continue}if(u<w.limit){if(isNaN(w.in_seconds)){return l(w.name,NaN,r)}var p=u/w.in_seconds;p=Math.round(p);var t;if(v<0){t=l("future_format",NaN,r).replace("%s",l("in",NaN,r))}else{t=l("past_format",NaN,r).replace("%s",l("ago",NaN,r))}return t.replace("%t",p+" "+l(w.name,p,r))}}return r.uneasy_format(q)};function m(r,t){var q=n();var w=((q.getTime()-r.getTime())/1000);var p=Math.abs(w);if(isNaN(w)){return}var v=0;for(var s in t.units){var u=t.units[s];if((u.past_only&&w<0)||(u.future_only&&w>0)){continue}if(p<u.limit){if(isNaN(u.in_seconds)){if(w<0){return(v-p)*1000+100}else{return(u.limit-p)*1000+100}}else{if(w<0){return(p%u.in_seconds)*1000+100}else{return(u.in_seconds-(p%u.in_seconds))*1000+100}}}v=u.limit}if(w<0){for(var s=t.units.length-1;s>=0;s--){var u=t.units[s];if(u.past_only){continue}return(u.limit-p)*1000+100}}}function i(q,r){var p=q.data("easydate.date");if(isNaN(p)){var s;var t=Date.parse(s=q.attr("title"))||Date.parse(s=q.html());if(!isNaN(t)){p=new Date();p.setTime(t);q.data("easydate.date",p);if(r.set_title&&!q.attr("title")){q.attr("title",s)}}}return p}function b(r){var s=r.data("easydate.settings");var p=e.data(r[0]);a[p]=r;delete k[p];var q=i(r,s);if(isNaN(q)){return}r.html(j(q,s));if(s.live){var t=m(q,s);if(!isNaN(t)){if(t>2147483647){t=2147483647}var u=setTimeout(function(){b(r)},Math.round(t));k[p]=u}}}e.fn.easydate=function(p){var q=e.extend({},d,p);this.data("easydate.settings",q);this.removeData("easydate.date");this.each(function(){var r=e.data(this);if(!isNaN(k[r])){clearTimeout(k[r]);delete k[r]}b(e(this))})}})(jQuery);

// Query String plugin
(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) p[1] = 'true';
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);
