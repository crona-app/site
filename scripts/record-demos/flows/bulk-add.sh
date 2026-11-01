# Paste a list of `- ` lines, review what Crona parsed, and import them in one go.
key I
wait_for "Add Issues"
pause 0.8
type_text "- Ship install script docs #OSS/cli ~30m @today +docs"
key Enter
type_text "- Fix flaky calendar test ~45m +testing"
key Enter
type_text "- Plan Q1 roadmap ~1h @fri"
key Enter
type_text "- Renew team calendar invites ~15m @tomorrow +ops"
pause 1
key C-s
wait_for "import 4"
pause 2
key Down
pause 1.5
key Down
pause 1.5
key C-s
wait_for "[1] Today"
pause 1.2
KEY_BEAT=0.35 select_row "Ship install script docs"
pause 3.5
