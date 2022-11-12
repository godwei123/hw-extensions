chrome.runtime.onInstalled.addListener(() => {
    console.log('chrome.runtime.onInstalled');
});

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    console.log(request, sender, sendResponse);
    sendResponse(data);
    chrome.notifications.create('nid', {
        type: 'basic',
        title: 'Title',
        message: data,
    });
});
