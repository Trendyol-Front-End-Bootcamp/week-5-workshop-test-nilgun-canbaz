const { getPosts } = require("../index");
const fetch = require("node-fetch");
const mockData = require("./mockData.json");

jest.mock('node-fetch', ()=>jest.fn())

describe('index tests', function () {
    test('should return posts', async function () {
        fetch.mockImplementation(() => Promise.resolve({
            json: () => mockData
        }))
        const posts = await getPosts()

        expect(posts).toHaveLength(9);
        expect(posts).toEqual([
            'voluptatem doloribus consectetur est ut ducimus',
            'beatae enim quia vel',
            'voluptas blanditiis repellendus animi ducimus error sapiente et suscipit',
            'et fugit quas eum in in aperiam quod',
            'consequatur id enim sunt et et',
            'repudiandae ea animi iusto',
            'aliquid eos sed fuga est maxime repellendus',
            'odio quis facere architecto reiciendis optio',
            'voluptatem laborum magni'
        ])
    });

    test('should return error', async function () {
        fetch.mockImplementation(() => Promise.reject(new Error("500 Internal Server Error")))
        const posts = await getPosts()

        expect(posts).toEqual(new Error("500 Internal Server Error"))
    })
});