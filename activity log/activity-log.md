# bingbong-video-client
did a lot of planning
completed routes
    need to flesh routes
    user authentication aspect
    build a follower/following schema
    populate w dummy data

for monday dec 13:
Jon
- comment components

Derrick
-video components

Goro
-follower/following schema
-profile component


Juan
-sidebar component
-follower/following schema

as a group:
breadcrumbs header: 

NOTES:
Goro:
-  Header does not need to be re-rendered on every page as it persists throughout the whole application.
- Whatever you stubbed the route out to be i.e. `/users/:id` will have to be exactly how you refer to it in postman and how it should be represented in your fetch request.
- be careful what you name your state: remember that when we retrieve these documents, they have top level objects.

12-14-21
== BIG TASKS ==
We need to refactor the program, at App.js
We need to make a profile call get the props (props)
i.e. because we are the logged in user, we can make the query
to our own profile, and then pass them down to where what routes/components them
either explicitly or as a hidden part of the GET/POST/ whatever payload...

12-15-21
== TASKS ==
- Make Forms for Routes == THEME OF THE DAY ==
high priority: Video, Comments
- Need some randomizer function, for video "map" function to render in diff order
- Get the Username Prop thing working...lol <-- GORO
- Sidebar


