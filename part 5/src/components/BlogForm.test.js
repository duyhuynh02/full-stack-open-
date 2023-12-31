import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates and call onSubmit', async() => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
    render(<BlogForm createBlog={ createBlog } />)

    const input = screen.getByPlaceholderText('write title of blog here')
    const createButton = screen.getByText('create')

    await user.type(input, 'testing a form title...')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form title...')
})