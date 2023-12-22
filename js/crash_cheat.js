var OriginTitle = document.title;
var titleTime1, titleTime2, titleTime3;

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="shortcut icon"]').attr('href', "/images/杰尼龟.ico");
        document.title = '😰 w(ﾟДﾟ)w 页面崩溃啦!  ';
        clearTimeout(titleTime1);
        clearTimeout(titleTime2);
        clearTimeout(titleTime3);
    } else {
        $('[rel="shortcut icon"]').attr('href', "/images/杰尼龟.ico");
        document.title = '😏 ♪(^∇^*) 噫? 又好了! ';

        titleTime1 = setTimeout(function () {
            document.title = '🤔 啊来来! 原标题是啥来着?  ';
        }, 2000);

        titleTime2 = setTimeout(function () {
            document.title = '😮哦~! 想起来了!  ';
        }, 4000);

        titleTime3 = setTimeout(function () {
            document.title = OriginTitle;
        }, 6000);
    }
});
