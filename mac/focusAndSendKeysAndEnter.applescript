on run argv
	set old to (path to frontmost application as text)
	tell application "System Events"
		set theprocs to every process whose unix id is item 1 of argv
		repeat with proc in theprocs
			set the frontmost of proc to true
		end repeat
	end tell
	tell application "System Events" to keystroke item 2 of argv
	if (item 4 of argv) as boolean then
  	tell application "System Events" to key code 36
	end if
	if (item 3 of argv) as boolean then
		delay 0.2
		activate application old
	end if
end run