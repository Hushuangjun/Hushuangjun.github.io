// 检查是否是用户第一次访问
var isFirstVisit = localStorage.getItem('isFirstVisit');

// 保存原始标题
var originalTitle = document.title;

// 当页面加载完成时触发
window.addEventListener('load', function () {
    // 如果是用户第一次访问，则显示原标题，否则显示自定义标题
    if (isFirstVisit === null) {
        document.title = originalTitle;
        // 设置标志表示用户已经访问过
        localStorage.setItem('isFirstVisit', 'false');
    } else {
        // 显示自定义标题
        document.title = '让我想想原来标题是啥？';
    }

    // 设置一个定时器，3秒后还原标题
    setTimeout(function () {
        document.title = originalTitle;
    }, 3000); // 3秒
});

// 当页面变为不可见时触发
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        // 当用户离开页面时，在这里可以设置你想要显示的标题
        document.title = '页面崩溃啦';
    } else {
        // 当用户回到页面时，在这里可以设置你想要显示的标题
        document.title = '让我想想原来标题是啥？';
    }
});
