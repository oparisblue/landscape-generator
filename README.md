# landscape-generator

A few days ago, I was talking with one of my friends while they were copying files to a network server using Windows 10, and I noticed that the copy dialog box looked a little different to the one on macOS:

![Windows Copy Dialogs](https://cdn.geekwire.com/wp-content/uploads/2011/08/8171.Figure-3-Consolidated-copy-more-details-view_thumb_181256FE.png)

*Image from [GeekWire](https://www.geekwire.com/2011/microsoft-shows-streamlined-file-copying-windows-8/), first published on the MSDN Blog*

We both agreed that the Network Graphs looked a little like landscapes, which prompted me to make this project. It generates landscapes by simulating some basic rules in order to re-create the look of a network graph.

# Rules

The generator creates a new Y coordinate every 5 pixels, in accordance to the following rules:

 * Every iteration, the next point will be 1 - 10 pixels in the direction we are travelling (either up or down);
 * There is a 1/50 chance that a massive jump of 50 pixels will be applied on-top of that;
 * Every iteration, there is a 1/4 chance that the direction will flip (i.e. if the graph is climbing up, it will start descending instead);
 * If the graph descends below 0, it's Y-Coord is reset to 0. This will happen until it climbs again;
 * There is no limit as to how high the graph can climb, however.

# Implementation

I have implemented this project in ES6 using HTML5 Canvas. To run it simply clone or download and then open the `index.html` file in your Web Browser. It creates a new landscape every time that the page is refreshed.

The code is extensively commented if you are interested as to how it works.
