const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Asynchronous promise 1...');
        resolve(1);
    }, 2000);
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Asynchronous promise 2...');
        resolve(2);
    }, 2000);
});

Promise.all([p1, p2])
    .then(result => console.log('Result: ', result))
    .catch(error => console.log('Error: ', error.message));

Promise.race([p1, p2])
    .then(result => console.log('Result: ' + result))
    .catch(error => console.log('Error: ' + error.message));

