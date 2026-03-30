const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Success!'); // pending to resolve or fullfill the promise
        reject(new Error('Something went wrong')); // pending to reject the promise
    }, 2000);
});

myPromise
    .then(result => console.log('Result: ' + result))
    .catch(error => console.log('Error: ' + error.message));