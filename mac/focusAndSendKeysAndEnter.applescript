on run argv
	tell application "System Events"
		set theprocs to every process whose unix id is item 1 of argv
		repeat with proc in theprocs
			set the frontmost of proc to true
		end repeat
	end tell
	tell application "System Events" to keystroke item 2 of argv
  tell application "System Events" to key code 36
end run