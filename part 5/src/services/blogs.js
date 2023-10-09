import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  // console.log('token: ', token)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updatedObject) => {
  const response = await axios.put(baseUrl + `/${updatedObject.id}`, updatedObject)
  return response.data
}

const remove = async (deletedObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl + `/${deletedObject.id}`, config)
  return response.data
}

export default { getAll, setToken, create, update, remove }