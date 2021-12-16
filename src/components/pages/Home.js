import { useState, useEffect } from 'react'
import Video2 from '../modules/Video2'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Comment from '../modules/Comment'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	// retrieving all videosF
	// const [allVideos, setAllVideos] = useState(null)

	// useEffect(() => {
	// 	getAllVideos()
	// }, [])

	// const getAllVideos = () => {
    //     fetch(`http://localhost:8000/videos/`)
    //     .then(response => {
    //         return response.json()
    //     })
    //     .then(foundVideos => {
    //         console.log("anything?", foundVideos.videos)
    //         setAllVideos(foundVideos.videos)
	// 		// console.log("this is allVideos", allVideos)
	// 	})
	// 	.catch((error) => { 
	// 		console.log(error) })
    // }

	let allFoundVideos
	if (props.allVideos !== null) {
		allFoundVideos = props.allVideos.map((video, key)=> {
			// console.log("this is video id", video._id)
			// console.log('this is user', props.curProfile)
			return (
				<div>
					<Video2 index={key} url={video.url} comments={video.comments} title={video.title}
					curProfile={props.curProfile} videoId={video._id} user={props.user} />

					<Comment curProfile={props.curProfile} videoId={video._id} userId={props.user}/>
				</div>
				)
	})}


	return (
		<div>
			{props.allVideos === null ? 
				null :
				<Row xs={1} md={1} className="g-4">
					{allFoundVideos}
				</Row>
			}
		</div>
	)
}

export default Home
