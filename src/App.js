// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/pages/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import Profile from './components/pages/Profile'
import Video from './components/modules/Video'
import AddVideo from './components/modules/AddVideo'
import Comment from './components/modules/Comment'




const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
  const [curProfile, setCurProfile] = useState([])
  const [allVideos, setAllVideos] = useState(null)


// build the forms
// when creating a json payload, always initialize it to the current user
// make sure nothing runs in app because the user isn't logged in technically...
// Running it in profile...

// THIS ASYNC STRATEGY WORKED...
//   useEffect( async ()=>{
//           const response = await fetch(`http://localhost:8000/users`)
//           const data = await response.json()
//           const { profile } = data

//           // let foundUser = data.filter((user)=>{
//           //   if ((user))
//           // })
//           setCurProfile(profile)
//           console.table(data)
//           console.table(profile)
  
//       },[])

// WE STRINGIFY BODY OBJECTS WHEN SENDING POST REQUESTS
// WHEN RETRIEVING RESPOSNES, WE PARSE IT INTO JSON...
useEffect(() => {
  getAllVideos()
  getAllProfile()
}, [user])

const getAllVideos = () => {
      fetch(`http://localhost:8000/videos/`)
      .then(response => {
          return response.json()
      })
      .then(foundVideos => {
          console.log("anything?", foundVideos.videos)
          setAllVideos(foundVideos.videos)
    // console.log("this is allVideos", allVideos)
  })
  .catch((error) => { 
    console.log(error) })
  }

const getAllProfile = () => {
  if (user !== null) {
    fetch(`http://localhost:8000/users/`)
    .then(response => response.json())
    .then((foundUserResponse) => {
      console.log("trying to render: ", foundUserResponse)
      let foundUser = foundUserResponse.profile.filter((cUser)=>{
        return user._id === cUser.owner })
      if (foundUser === null) {
        setCurProfile(null)
      }
      console.log("this would be the matching user..", foundUser)
      setCurProfile(foundUser) 
    }) // this promise is failing and i don't know why lmao...
    .catch(err => console.log(err))
    // more unexpected behavior...now the token seems to work but I get a duplicate key error for the schema...which is unfortunate.
  }
}


  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}
  //upon sign in we should "pass down profile info with the user" as a prop to any component we want
  // we refactor 
  // 



		return (
      <Fragment>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home msgAlert={msgAlert} user={user} curProfile={curProfile} allVideos={allVideos}/>} />
          <Route
            path="/sign-up"
            element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
          />
          <Route
            path="/sign-in"
            element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
          />
          <Route
            path="/sign-out"
            element={
              <RequireAuth user={user}>
                <SignOut
                  msgAlert={msgAlert}
                  clearUser={clearUser}
                  user={user}
                />
              </RequireAuth>
            }
          />
          <Route
            path="my-profile"
            element={
              <RequireAuth user={user}>
                <Profile
                  getAllProfile={getAllProfile}
                  curProfile={curProfile}
                  user={user}
                />
              </RequireAuth>
            }
          />
          <Route
            path="post-new-video"
            element={
              <RequireAuth user={user}>
                <AddVideo 
                  getAllProfile={getAllProfile}
                  curProfile={curProfile}
                  user={user}
                />
              </RequireAuth>
            }
          />

          <Route
            path="/change-password"
            element={
              <RequireAuth user={user}>
                <ChangePassword msgAlert={msgAlert} user={user} />
              </RequireAuth>
            }
          />
        </Routes>
        {/* <Video /> */}
        {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={deleteAlert}
          />
        ))}
      </Fragment>
    )
}

export default App
