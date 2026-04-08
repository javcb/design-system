@echo off
cd /d "%~dp0"
call node_modules\.bin\storybook.cmd dev -p 6006
