on run myProcessId
	tell application "System Events"
		set theprocs to every process whose unix id is myProcessId
		repeat with proc in theprocs
			set the frontmost of proc to true
		end repeat
	end tell
end run