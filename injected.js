const URL = '/portaluser/queryMyJobInterviewPortal5';
(function (xhr) {
    var XHR = XMLHttpRequest.prototype;

    var open = XHR.open;
    var send = XHR.send;

    XHR.open = function (method, url) {
        this._method = method;
        this._url = url;
        return open.apply(this, arguments);
    };

    XHR.send = function (postData) {
        this.addEventListener('load', function () {
            if (this._url.indexOf(URL) > -1) {
                console.log("this._method, this._url, this.response");
                this.response && window.postMessage({ type: 'xhr', data: this.response,origin: "extensions" },  "*"); // send to content script
            }
        });
        return send.apply(this, arguments);
    };
})(XMLHttpRequest);

const { fetch: origFetch } = window;
window.fetch = async (...args) => {
    const response = await origFetch(...args);
    response
        .clone()
        .json() // maybe json(), text(), blob()
        .then(data => {
            // window.postMessage({ type: 'fetch', data: data }, '*'); // send to content script
            //window.postMessage({ type: 'fetch', data: URL.createObjectURL(data) }, '*'); // if a big media file, can createObjectURL before send to content script
        })
        .catch(err => console.error(err));
    return response;
};
