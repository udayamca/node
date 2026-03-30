// const { get } = require("../express-demo/routes/courses");

// const p = getUser(1);
// p.then(user => getRepositories(user.name))
//  .then(repos => getCommit(repos[0]))
//  .then(commit => console.log('Commit: ' + commit))
//  .catch(err => console.log('Error: ' + err.message));

async function displayCommit() {
    try {
        const user = await getUser(1);
        const repos = await(getRepositories(user.name));
        const commit = await getCommit(repos[0]);
        console.log('Commit: ' + commit);
    } catch (err) {
        console.log('Error: ' + err.message);
    }
}
displayCommit();

function getUser(id) {
    return new Promise((resolve, reject) => {
         setTimeout(() => {
            console.log('Reading a user from database...');
            resolve({ id: id, name: 'User' + id });
    }, 2000);
    })
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting repos for ' + username);
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get the repos'));
        }, 2000);
    });
}

function getCommit(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting commit for ' + repo);
            resolve('Commit for ' + repo);
        }, 2000);
    });
}
