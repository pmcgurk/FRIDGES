#!/bin/bash


gst-launch-1.0 v4l2src device=/dev/video0 ! v4l2sink device=/dev/video1 &
gst-launch-1.0 v4l2src device=/dev/video1 ! v4l2sink device=/dev/video2 &
