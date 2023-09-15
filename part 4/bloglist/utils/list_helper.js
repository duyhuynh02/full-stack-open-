const dummy = (blogs) => {
    return 1 
}

const totalLikes = (blogs) => {
    const sumOfLikes = (sum, blog) => {
        return sum + blog.likes 
    } 

    return blogs.reduce(sumOfLikes, 0)
    
}

const favoriteBlog = (blogs) => {
    const first_object = blogs[0]

    const blogsComparing = (first_obj, arr) => {
        let max_object = first_obj 
        const res = [first_obj]
        for (const obj of arr.slice(1)) {
            if (obj.likes > max_object.likes) {
                res[0] = obj 
                max_object = obj 
            }
        }
        return res 
    }

    const result_array = blogsComparing(first_object, blogs)
    const result = result_array[0]


    return {
        "title": result.title,
        "author": result.author, 
        "likes": result.likes 
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog 
}
