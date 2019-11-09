on numberAsKeycode(theString)
	tell application "System Events"
		repeat with currentChar in (every character of theString)
			set cID to id of currentChar
			if cID is 45 then
				key code {27}
			else if cID is 46 then
				key code {47}
			else if cID is 43 then
				key code {24} using {shift down}
			else if ((cID ³ 48) and (cID ² 57)) then
				key code {item (cID - 47) of {29, 18, 19, 20, 21, 23, 22, 26, 28, 25}}
			
			else
				keystroke currentChar
			end if
		end repeat
	end tell
end numberAsKeycode

on printAllKeys()
	tell application "System Events"
		set x to 1
		repeat 100 times
			key code x
			set x to x + 1
		end repeat 
	end tell
end printAllKeys

on run argv
	set old to (path to frontmost application as text)
	tell application "System Events"
		set theprocs to every process whose id is item 1 of argv
		repeat with proc in theprocs
			set the frontmost of proc to true
		end repeat
	end tell
	numberAsKeycode(item 2 of argv)
	
	
	if (item 4 of argv) as boolean then
  	tell application "System Events" to key code 36
	end if
	if (item 3 of argv) as boolean then
		delay 0.2
		activate application old
	end if
end run