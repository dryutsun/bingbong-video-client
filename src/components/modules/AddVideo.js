import React, { useEffect, useState } from 'react'

export default function AddVideo (props) {
const [newVideo, setNewVideo] = useState ({
    url: '',
    title: '',
    owner: props.user._id,
    categoryName: '',
    comments: []
})

const handleInputChange = (e) =>{
    setNewVideo({ ...newVideo, [e.target.name]: e.target.value })
    // this is to see change and update current input value and assign it to NewVideo
}

const postVideo =(e)=>{
    e.preventDefault()
    let preJSONBody = {
      url: newVideo.url,
      title: newVideo.title,
      owner: props.user._id,
      categoryName: newVideo.categoryName,
      comments: [],
    }
    fetch("http://localhost:8000/videos", {
        method: 'POST',
        body: JSON.stringify(preJSONBody),
        headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.user.token}`
    }
})
    .then(response=>response.json())
    .then(postedVideo=>{
      props.getAllVideos()
        setNewVideo({
            url: '',
            title: '',
            owner: props.user._id,
            categoryName: '',
            comments: []
        }) 
    })
    .catch(err=>console.error)
}
    //considering alert or some type of confirmation message after posting a video


    return (
      <form onSubmit={postVideo}>
        <div>
          <label htmlFor="url">Embed Video Link:</label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={handleInputChange}
            value={newVideo.url}
          />
        </div>
          <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleInputChange}
            value={newVideo.title}
          />
        </div>
          <div>
          <label htmlFor="categoryName">Category:</label>
          <input
            type="text"
            name="categoryName"
            id="categoryName"
            onChange={handleInputChange}
            value={newVideo.categoryName}
          />
        </div>

        <input type="submit" value="Submit"/>
      </form>
    )
}
