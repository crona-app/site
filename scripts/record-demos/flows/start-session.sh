# Start a Pomodoro on today's top task, watch it run, then end it with a commit note.
key f
wait_for "Start Timer"
pause 1.2
key p
wait_for "Pomodoro Session"
pause 1.8
key C-s
wait_for "Focus 1 of 4"
pause 5
key x
wait_for "End Session"
type_text "Outlined the release notes"
pause 0.6
key C-s
wait_for "[1] Today"
pause 2
