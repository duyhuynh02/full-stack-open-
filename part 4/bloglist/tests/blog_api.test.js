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
        likes: 0
    },
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
    })

    test('all notes are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)

    })

    test('all notes should have likes property', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0]).toHaveProperty('likes')
        expect(response.body[1]).toHaveProperty('likes')
    })

    test('id of the blog posts', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined() 
    })

    test('notes are posted successfully', async () => {
        const newBlog = {
            title: "Cây đổ, nhà tốc mái trong giông lốc ở TP HCM",
            author: "Đình Văn",
            url: "https://vnexpress.net/cay-do-nha-toc-mai-trong-giong-loc-o-tp-hcm-4655101.html",
            likes: 3 
        }

        await api 
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const contents = response.body.map(b => b.title)

        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(contents).toContain('Cây đổ, nhà tốc mái trong giông lốc ở TP HCM')
    })

    test('notes are missing title or url', async () => {
        const newBlog = {
            author: "Geshe", 
            likes: 5
        }

        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
    })

})

afterAll(async () => {
    await mongoose.connection.close()
}, 10000)