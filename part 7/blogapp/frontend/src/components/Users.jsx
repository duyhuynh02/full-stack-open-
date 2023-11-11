import { Link, 
  } from 'react-router-dom'

const Users = ({ users }) => {
    //handle undefined value
    if (users.length === 0) {
        return null
    }

    return (
        <div>
            <h2>Users</h2>
            <h3>Number of blogs</h3>
            {users[0].map((user) => (
                <li key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                    {user.blogs.length} 
                </li>
            ))}
        </div>
    )
  }
  
  export default Users;
  