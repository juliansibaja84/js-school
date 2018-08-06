# Challenge 11
For this challenge a videoPlayer was designed. The project can be executed inside the folder
**video-player** by running the commands ```npm install``` and ```npm start```.

One of the abilities of the player is to jump from a clip to another with hotkeys, the hotkeys used
are ```alt+leftArrow``` and ```alt+rightArrow```. These hotkeys work if the videoPlayer is clicked.

The code has to be reusable, so I used webpack and babel to build a function that encapsulates the application. The function is inside **video-player/lib-gen/builds/video-player.js** and is called _showVideoPlayer(url, element)_ and accepts two parameters an url of a video and a element to be displayed the player. There is also a _index.html_ file inside the **lib-gen** folder that I made as a test for this feature.