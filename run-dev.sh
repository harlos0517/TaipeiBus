#!/bin/sh
tmux new-session -d 'cd frontend; yarn dev'
tmux split-window -h 'cd backend; http-server -p 1337'
tmux -2 attach-session -d
