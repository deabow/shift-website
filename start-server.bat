@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d C:\Users\Dipo\Desktop\shift
"C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npx-cli.js" next dev > server.log 2>&1
