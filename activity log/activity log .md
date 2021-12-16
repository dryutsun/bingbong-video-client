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
- Whatever you stubbed the route out to be i.e. `/users/:id` will have to be exactly how you refer to it in your route, i.e. it becomes a variable for req.params handle.
- be careful what you name your state: remember that when we retrieve these documents, they have top level objects.