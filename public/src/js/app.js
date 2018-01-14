var deferredPrompt

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function () {
            console.log('Service worker registered!')
        })
        .catch(function (error) {
            console.log(error);
        })
}

window.addEventListener('beforeinstallprompt', function (event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
});

var myPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        //resolve('This is executed once the timer is done!');
        reject({code: 500, message: 'An error occurred!'});
        // console.log('This is executed once the timer is done!')
    }, 3000);
});

fetch('https://httpbin.org/ip')
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
    .catch(function (error) {
        console.log(error)
    });

fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'applications/json'
    },
    body: JSON.stringify({message: 'Does this work?'})
})
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
    .catch(function (error) {
        console.log(error)
    });

// myPromise.then(function (text) {
//     return text;
// }, function (error) {
//     console.log(error.code, error.message);
// }).then(function (newText) {
//     console.log(newText);
// });

myPromise.then(function (text) {
    return text;
}).then(function (newText) {
    console.log(newText);
}).catch(function (error) {
    console.log(error.code, error.message);
});

console.log('This is executed right after setTimeout()');
