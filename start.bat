@echo off
echo Stopping any existing Java processes...
taskkill /F /IM java.exe 2>nul
timeout /t 2 /nobreak > nul

echo Starting Backend on port 8080...
start "BACKEND" cmd /k "cd /d c:\Users\gangi\OneDrive\Desktop\onlineMovieTickets\backend && mvn spring-boot:run"

echo Waiting for backend to start...
timeout /t 20 /nobreak > nul

echo Starting Frontend...
start "FRONTEND" cmd /k "cd /d c:\Users\gangi\OneDrive\Desktop\onlineMovieTickets\frontend && npm run dev"

echo.
echo Both servers are starting!
echo Backend  : http://localhost:8080
echo Frontend : http://localhost:5173
echo.
pause
