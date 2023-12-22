var originalTitle = document.title;
var titleTime;

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        changePageState('╭(°A°`)╮ 页面崩溃啦 ~');
    } else {
        // Do nothing when the page becomes visible
    }
});

// Listen for the focus event
window.addEventListener('focus', function () {
    changePageState('(ฅ>ω<*ฅ) 噫又好了~');

    // Delay for 3 seconds and then restore the original title
    setTimeout(function () {
        document.title = originalTitle;
    }, 3000);
});

function changePageState(newTitle) {
    document.title = newTitle;
}
