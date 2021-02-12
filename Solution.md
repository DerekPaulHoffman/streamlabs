##  Solution and Notes

- I'm able to get my mouse coordinates on the screen and now I have to get the picture starting coordinates and find out if the X/Y is in the x and y of starting minus the width and height of starting location of the image

- went down to 1 image to make it easier for the start

- I can't just use ``` mouseUp ``` and ``` mouseDown ``` as their own variables I need to get the last position as well.

- I need to not just ```mouseUp```,``` mouseDown```, and ```mouseMove``` but also ``` mouseOut``` to solve for errors when the mouse leaves the browser window.

- Im dragging the image and by reusing the ``` render() ``` function it stops repeating

- it's skipping at the moment the cursor is going to the top and the exact placement of the mouse doesn't seem great

- Added in the border seemed pretty easy to apply a stroke style **onDrag**

- and a simple ``` render() ``` function on the mouse up removes the border

- So I think its jumping is because I'm not calculating how far into the image I am and need to put in my mouse position inside of the image

- by subtracting by current mouse position it moves perfectly on the initial drag now I need to fix it for multiple drags

- I got the offeset. I needed to update the offset of the mouse and my biggest issue... I accidentally had an ```x``` where a ```y``` should have been

- Now adding back the other image to work on moving one at a time and overlapping

- the border isn't going away going to figure that out after I set a ```zindex``` var

- I was trying to come up with a way to not draw the second image based on if I was over the image on the top. come to realize I still need to render both images but I don't adjust the `x` and `y` coordinates of the image on the bottom

- I set a state variable that overwrites based on the last element in the array to show which is the top image

- for some reason, my ```canDrag``` variable is screwing up and rendering longer than on mouse up have to debug why the border is no longer going away after adding 2 images back
  
- Finished just removed a ``` render() ``` function by accident

##  Post Completion Questions

- How long did it take you to complete this assignment?
  - 2 Hours 45 Minutes

- What about this assignment did you find most challenging?
  - I think regular syntax bugs killed me for time. I wanted to use the least amount of help possible by rendering directly into my browser and refreshing manually. I think if I put it into an actual hot-reload environment and was able to read more of the syntax errors from the terminal I could have completed it faster. As well as the one bug where I accidentally put an "X" where I should have put a "Y" took at least 30 minutes to find. 

  - Most Challenging was the mouse offset on the image.  It's easy to assign the image to the top of your mouse and let it "glitch" but I wanted it to be smooth and seamless so just thinking about how to implement that was the most challenging and the most rewarding

- What about this assignment did you find unclear?
  - I wasn't sure if you wanted me to complete the "What are we looking for section". I'm pretty sure you just want the project to be scalable. I added in the local storage one because I wanted to try it with a ternary operator.

- What challenges did you face that you did not expect?
  - I forgot during the back end of the project that I need to always render both images. I wrote a bunch of code that checked which image we wanted to move and did not draw the other image. After I completed that I realized I still need to render the other image but just don't change its position.

- Do you feel like this assignment has an appropriate level of difficulty?
  - Yes, I feel like it's great for a vanilla JS example. It shows the basics of JS while still allowing the user to showcase their ES6 abilities. I believe the take-home assignment should showcase what the developer will be doing. Why have someone write a complicated merge/insertion/quicksort algorithm if that is something that the current job will most likely never have them write? 
