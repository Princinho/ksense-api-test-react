import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserPosts from './Components/UserPosts';
function App() {
  const apiUrl = 'https://jsonplaceholder.typicode.com/'
  const [users, setUsers] = React.useState(null)
  const [selectedUserId, setSelectedUserId] = React.useState(null)
  const [userPosts, setUserPosts] = React.useState(null)
  const [errorMsg, setErrorMsg] = React.useState('')

  React.useEffect(() => {
    fetch(`${apiUrl}users`)
      .then(response => {
        if (response.ok) return response.json()
        else throw new Error("Could not retrieve users")
      })
      .then(data => setUsers(data))
      .catch(err => setErrorMsg(err.message))
  }, [])

  React.useEffect(() => {
    const fullUrl = `${apiUrl}users/${selectedUserId}/posts`
    console.log(fullUrl)
    if (selectedUserId)
      fetch(fullUrl)
        .then(response => {
          if (response.ok) return response.json()
          else throw new Error("Could not retrieve user's posts")
        }).then(posts => setUserPosts(posts))
  }, [selectedUserId])
  console.log(userPosts)
  function showUserPosts(userId) {
    setSelectedUserId(userId)
  }
  function reset() {
    setSelectedUserId(null)
    setUserPosts(null)
  }
  return (
    <main>
      <h1>JSON API tester (React)<img src={logo} style={{height:"1em"}}/></h1>
      <div id="users" className="users">
        {users && <>
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Company</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>


              {users.map(user => <tr key={user.id} onClick={() => showUserPosts(user.id)}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>{user.address.city}, {user.address.street}</td>
              </tr>)}
            </tbody>
          </table>
        </>}
      </div>
      {userPosts && <UserPosts posts={userPosts} user={users.find(user=>user.id===selectedUserId)} reset={reset} />}
    </main>
  );
}

export default App;
