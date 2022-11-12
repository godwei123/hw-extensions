// 可以访问DOM，注入到页面

var s = document.createElement('script');
s.src = chrome.runtime.getURL('injected.js');
s.onload = function () {
    this.remove();
};
(document.body || document.head || document.documentElement).appendChild(s);
window.addEventListener('message', function (e) {
    console.log('content script received:', e.data.data);
    e.data.data &&
        alert(e.data.data) &&
        chrome.runtime.sendMessage(
            {
                data: e.data.data,
            },
            response => {
                console.log(response);
            }
        );
});
