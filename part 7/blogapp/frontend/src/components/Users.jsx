const Users = ({ users }) => {
    // console.log('users: ', prop.users)  
    console.log('users hihihi: ', users)
    // console.log(users[2].blog)
    return (
        <div>
            <h2>Users</h2>
            <h3>Number of blogs</h3>
            {users[0].map((user) => (
                <li key={user.id}>{user.name} {user.blogs.length}</li>
            ))}
        </div>
    )
  }
  
  export default Users;
  