import { useState } from "react"

function CommentsPage(){
  
    const[comments, setComments] = useState([]);
    const fetctComments = async () => {
        const response = await fetch('/api/comments/')
        const data = await response.json()
        setComments(data);
    }

return(
    <>
    
    <button onClick={fetctComments}>Load comments</button>
    {comments.map((comments) => {
            return (
                <div key={comments.id}>
                    {comments.id} {comments.text}
                </div>
            )
        }
        )
    }
    </>
)
}

export default CommentsPage;