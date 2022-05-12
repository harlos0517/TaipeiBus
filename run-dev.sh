#!/bin/sh
tmux new-session -d 'cd frontend; yarn dev'
tmux split-window -h 'cd backend/data/optimized; http-server -p 1337 --cors'
tmux -2 attach-session -d
