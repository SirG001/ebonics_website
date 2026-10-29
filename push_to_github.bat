@echo off
echo ===================================================
echo   Pushing Ebonics Website Fixes to GitHub...
echo ===================================================
echo.
cd /d "%~dp0"
git push origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ===================================================
    echo   SUCCESS! Changes pushed to GitHub successfully.
    echo   GitHub Pages will update in 1-2 minutes.
    echo ===================================================
) else (
    echo ===================================================
    echo   Push failed. Please make sure you are signed in
    echo   to GitHub in your browser.
    echo ===================================================
)
echo.
pause
