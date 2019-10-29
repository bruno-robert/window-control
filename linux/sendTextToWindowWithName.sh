#! /bin/bash

wmctrl -a "$1"&&xdotool type "$(printf "$2\n\e ")"