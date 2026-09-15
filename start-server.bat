@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"
call npm run dev > server.log 2>&1
