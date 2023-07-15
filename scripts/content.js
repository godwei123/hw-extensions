// 可以访问DOM，注入到页面

if (document.location.host === 'career.huawei.com') {
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('injected.js');
    s.onload = function () {
        this.remove();
    };
    (document.body || document.head || document.documentElement).appendChild(s);
    window.addEventListener('message', function (e) {
        console.log('content script received:', e.data);
        if (e.data?.origin==="extensions"){
            alert(e.data.data);
        }
    });
}
