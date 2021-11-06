const doWorkCallback = (callback) => {
    setTimeout(() => {
        callback('This is my error!', undefined);
    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(result);
    }
})


const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([]), reject('Wrong')
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log('Success! ', result);
}).catch((error) => {
    console.log('Error! ', error);
})