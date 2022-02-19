# Smooth Polyline

This repository is an experiment in rendering polylines as tracks with given
width (to either side of the polyline) and smooth corners/bends/spikes.

The algorithm so far is to take each polyline segment, calculate parallel lines
on both sides, place circles at the polyline points and that's as far as I got.

What still needs to be done is documented below.

## To-Do

### Calculate the arc start and sweep/end angles to make the round corners

Right now the whole circle is rendered, but I just need a circle segment between
the points where the circle touches the lines. Once this is one, I will be able
to outline the whole solution on this side of the original polyline.

### Calculate bends in the polyline itself and on the other side of it

To make the walls of the track, I also need to round off the polyline points
and the other wall and then I will have two solutions on each side of the
polyline where they share one wall - the one made by the polyline.

### Add a UI switch for highlighting only one of the solutions and not the other

Two solutions exist, one on each side of the polyline. In order to make the
render less messy looking, have a switch for which solution to draw in solid
black and draw the other in silver stroke.

### Figure out how to handle obtuse angles

I added one hardcoded shape with an obtuse angle and it seems to break
everything so I need to find a solution for that.
