# MakoAccountCreator
Rotmg Account Creator

To install you need the latest stable version of nodejs installed.
Additionally you will need your environment variables set so that you can run node and npm from your command line

### Simple installation - Quick but will be harder to update
[Download zip](https://github.com/FainTMako/MakoAccountCreator/archive/master.zip)
extract zip into destination of your choice
If you are on windows you can run the bat file: runWindows.bat
otherwise in the project root run:
npm start

### Git clone installation - Allows you to upgrade using git pull at any time
This requires that you have git installed on your machine and that you can run git from the command line
cloning this repo will create a folder called MakoAccountCreator
```javascript
git clone https://github.com/FainTMako/MakoAccountCreator.git
cd MakoAccountCreator
npm install
npm start
```
the account creator should start and open a new tab in your default browser.

#MuleDump Setup!
You need to be using the new muledump 
https://github.com/jakcodex/muledump/wiki/Installation-and-Setup
Once you are using that muledump and you have your accounts in there or not
You need to make a full backup of your muledump to a json file
Setup -> Backups -> Create new Backup
Delete the muledump.json file that is in the root of the project
paste in your newly created muledump json backup that you downloaded.
Rename it to muledump.json

Thats it! you should be good to go. If you have the use muledump option checked it will save new accounts to that file.
You can later import the edited muledump json back into your muledump web interface from the same backup screen.
