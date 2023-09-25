const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')

const initialBlogs = [
    {
        title: "Ronaldo nhận sự tiếp đón chưa từng có tại Iran",
        author: "Đặng Lai",
        url: "https://tienphong.vn/ronaldo-nhan-su-tiep-don-chua-tung-co-tai-iran-post1570306.tpo",
        likes: 32,
        user: "650f9b93253f8c07b6f703a9"
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

    test('blogs are returned as json', async () => {
        await api 
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)

    })

    test('all blogs should have likes property', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0]).toHaveProperty('likes')
        expect(response.body[1]).toHaveProperty('likes')
    })

    test('id of the blog posts', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined() 
    })


    test('blogs are posted successfully', async () => {
        const newBlog = {
            title: "Cây đổ, nhà tốc mái trong giông lốc ở TP HCM",
            author: "Đình Văn",
            url: "https://vnexpress.net/cay-do-nha-toc-mai-trong-giong-loc-o-tp-hcm-4655101.html",
            likes: 3,
        }

        const user = await User.findOne({})
        const token = await helper.tokenUser(user)

        await api  
            .post('/api/blogs') 
            .set({ 'Authorization': `Bearer ${token}` })  
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const response = await api.get('/api/blogs')
        const contents = response.body.map(b => b.title)
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(contents).toContain('Cây đổ, nhà tốc mái trong giông lốc ở TP HCM')
    })

    test('blogs are being deleted', async () => {
        const blogs = await Blog.find({})
        const blogToDeleteArray = blogs.map(blog => blog.toJSON())
        const blogToDelete = blogToDeleteArray[0]

        const user = await User.findById(blogToDelete.user) 
        const token = await helper.tokenUser(user)

        await api 
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ 'Authorization': `Bearer ${token}` })  
            .expect(204)
        
        const leftBlogs = await Blog.find({})
        expect(leftBlogs).toHaveLength(initialBlogs.length - 1)
        const titles = leftBlogs.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

    test('blog is updated', async () => {
        const blogs = await Blog.find({})
        const blogToUpdateArray = blogs.map(blog => blog.toJSON())
        const blogToUpdate = blogToUpdateArray[0]

        const updatedBlog = {
            likes: 16
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const leftBlogs = await Blog.find({})
        const newBlogToUpdateArray = leftBlogs.map(blog => blog.toJSON())
        const newBlogToUpdate = newBlogToUpdateArray[0]
        expect(newBlogToUpdate.likes).toBe(16)
    })


    test('blogs are missing title or url', async () => {
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