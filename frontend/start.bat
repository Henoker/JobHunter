@echo off
REM Switch to the F: drive
F:

REM Start the React frontend
start "" "cmd.exe" /k "cd F:\SCAMPER\JobHunter\frontend && yarn start"

REM Start the Django backend with virtual environment activation
start "" "cmd.exe" /k "cd F:\SCAMPER\JobHunter\backend && call F:\SCAMPER\JobHunter\backend\jhuntervenv\Scripts\activate.bat && python manage.py runserver"