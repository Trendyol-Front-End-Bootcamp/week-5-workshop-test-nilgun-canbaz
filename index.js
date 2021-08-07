const fetch = require("node-fetch");

async function getPosts() {
    try {
        const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json());

        const userPostCount = posts.reduce((tempObject, post) => {
            tempObject[post.userId] = tempObject[post.userId] ? tempObject[post.userId] + 1 : 1;

            return tempObject;
        }, {});

        const userId = Object.keys(userPostCount).reduce((a, b) => userPostCount[a] > userPostCount[b] ? a : b);

        return posts.filter(post => post.userId == userId).map(post => post.title);
    } catch (e) {
        return e;
    }
}

module.exports = {
    getPosts
}