const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blogs')

const initialBlogs = [
    {
        title: "Ronaldo nhận sự tiếp đón chưa từng có tại Iran",
        author: "Đặng Lai",
        url: "https://tienphong.vn/ronaldo-nhan-su-tiep-don-chua-tung-co-tai-iran-post1570306.tpo",
        likes: 32 
    },
    {
        title: "Lâm Đồng sẽ không chấp thuận dự án liên quan đến đất rừng",
        author: "Anh Tú",
        url: "https://vnexpress.net/lam-dong-se-khong-chap-thuan-du-an-lien-quan-den-dat-rung-4654182.html",
        likes: 17
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
}, 30000)


describe('api testings for', () => {

    test('notes are returned as json', async () => {
        await api 
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 10000)

    test('all notes are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)

    }, 10000)

})

afterAll(async () => {
    await mongoose.connection.close()
}, 10000)