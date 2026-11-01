# Create an issue with an estimate, due date and tags, then find it on Today.
key a
wait_for "New Issue"
pause 0.8
type_text "Write the v1.10 release post"
key Tab
type_text "Cover the TUI redesign and the new install scripts."
key Tab
type_text "1h30m"
key Tab
type_text "$(date +%F)"
key Tab
type_text "blog release"
pause 1.2
key C-s
wait_for "[1] Today"
pause 1.2
KEY_BEAT=0.35 select_row "Write the v1.10 release post"
pause 3.5
