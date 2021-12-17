import React, { useEffect, useState } from 'react'
import Forms from 'react-bootstrap/Form'


export default function Comment(props) {
  console.log("this is comment props", props)
  const userParsed = props.user.toString()
  console.log("parsed user", userParsed)
  const [newComment, setNewComment] = useState({   
          "postedBy": props.userId,
          // "username":props.userId.email,  
          "commentText": "",
          "thumbnail": ""
      })

  const handleCommentInputChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value })
    // this is to see change and update current input value and assign it to NewVideo
    }

    console.log('comment props', props)

  //function to post a comment 
  const postComment = (e) => {
      e.preventDefault()
      console.log ('this is video id', props.videoId)
      // console.log('this is userid', props)
      console.log('this is commenttext', newComment)
      
      let preJSONBody = {
          postedBy: props.userId,
          commentText: newComment.commentText,
          thumbnail: newComment.thumbnail,
      }
      fetch(`http://localhost:8000/comments/${props.videoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.user.token}`
                },
        body: JSON.stringify(preJSONBody)
      
    })
          .then(response => response.json())
          .then(postedComment => {
            props.getAllComments()
            setNewComment({
                postedBy: props.userId,
                // username: props.userId.email,
                commentText: "",
                thumbnail: "",
              })
            })
            .catch(err=>console.error)
    }
    // let user import comments from schema (findBy: video id) using a populate method
    // *** must alter the comment route/model***

    

    return (
      <form onSubmit={postComment}>
          <div>

          <label htmlFor="comment">Type a comment:</label>
          <input
              type="text"
              name="commentText"
              id="comment"
              onChange={handleCommentInputChange}
              value={newComment.commentText}
          />
          
          </div>
          <input type="submit" value="Submit"/>
      </form>
  




    )    
}

