on run myProcessId
  tell application "System Events" to get the {title} of every window of (every process whose unix id is myProcessId)
end run

