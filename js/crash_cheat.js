var originalTitle = document.title;
var titleTime;

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        changePageState('╭(°A°`)╮ 页面崩溃啦 ~');
    } else {
        changePageState('(ฅ>ω<*ฅ) 噫又好了~' + originalTitle);
    }
});

function changePageState(newTitle) {
    document.title = newTitle;
    clearTimeout(titleTime);

    // Restore the original title after 2 seconds
    titleTime = setTimeout(function () {
        document.title = originalTitle;
    }, 2000);
}
