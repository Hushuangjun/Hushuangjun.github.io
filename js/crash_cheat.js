var originalTitle = document.title;
var titleTime;

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        changePageState('╭(°A°`)╮ 页面崩溃啦 ~');
    } else {
        // Check if the title was set to '(ฅ>ω<*ฅ) 噫又好了~'
        // If yes, restore the original title immediately
        if (document.title === '(ฅ>ω<*ฅ) 噫又好了~') {
            document.title = originalTitle;
        }
    }
});

// Listen for the focus event
window.addEventListener('focus', function () {
    // Check if the title was set to '╭(°A°`)╮ 页面崩溃啦 ~'
    // If yes, restore the original title after 3 seconds
    if (document.title === '╭(°A°`)╮ 页面崩溃啦 ~') {
        changePageState('(ฅ>ω<*ฅ) 噫又好了~');

        // Delay for 3 seconds and then restore the original title
        titleTime = setTimeout(function () {
            document.title = originalTitle;
        }, 3000);
    }
});

function changePageState(newTitle) {
    document.title = newTitle;
    clearTimeout(titleTime); // Clear the previous timeout to ensure proper timing
}
