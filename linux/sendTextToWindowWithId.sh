#! /bin/bash

xdotool windowactivate --sync $1 type "$(printf "$2\n\e ")"