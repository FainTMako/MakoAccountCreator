if not "%minimized%"=="" goto :minimized
set minimized=true
@echo off

start /min cmd /C "npm start"
goto :EOF
:minimized