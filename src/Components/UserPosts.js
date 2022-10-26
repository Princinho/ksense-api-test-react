export default function UserPosts({ user, posts, reset }) {
    return (
        <div id="posts-wrapper" className="posts-wrapper" onClick={() => reset()}>
            <div className="posts active" id="posts" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" id="close-modal" onClick={()=>reset()}>X</button>
                <h2>{user.username}'s Posts</h2>
                {posts.map(post => <div className="post" key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>)}
            </div>
        </div>)
}