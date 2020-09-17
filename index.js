const express = require('express');
const _process = require('process');
const path = require('path');
const fs = require('fs');

// ## IMPORTANT FIX: CHANGE WORKING DIRECTORY TO CURRENT SCRIPT DIRECTORY ##
_process.chdir(path.join(__dirname, 'public'));

// set up the server
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.listen('8080');

// Sort the music files
function sortByPrefix(list) {
    var ret = new Array(list.length);
    var pre = null, name = null;
    list.forEach(item => {
        pre = item.substring(0, item.indexOf("_"));
        name = item.substring(item.indexOf("_") + 1);
        ret[parseInt(pre) - 1] = name;
    });
    return ret;
}

// Get data of local files
class MusicFinder {
    constructor(src) {
        this.src = src;
    }
    readFile(relPath) {
        return fs.readFileSync(path.join(this.src, relPath), {encoding: 'utf8'});
    }
    getFiles(relPath) {
        return fs.readdirSync(path.join(this.src, relPath)).filter(file => file != '.DS_Store');
    }
    getYears() {
        return this.getFiles('/');
    }
    getComposers(year) {
        return this.getFiles('/' + year);
    }
    getMusics(year, composer) {
        return sortByPrefix(this.getFiles('/' + year + '/' + composer));
    }
    getMusicInfo(year, composer, index, music) {
        var relPath = '/' + year + '/' + composer + '/' + (index + 1) + "_" + music + '/';
        try {
            return this.readFile(relPath + 'description.txt').trim().replace(/\r\n|\r|\n/g, ' ');
        } catch (err) {
            console.error('WARN: missing description for ' + relPath);
            return '';
        }
    }
}
var musicFinder = new MusicFinder('music');

// Get all music
var allMusic = {}
musicFinder.getYears().forEach(year => {
    allMusic[year] = {};
    musicFinder.getComposers(year).forEach(composer => {
        allMusic[year][composer] = [];
        musicFinder.getMusics(year, composer).forEach((music, index) => {
            allMusic[year][composer][index] = {'name': music, 'info': musicFinder.getMusicInfo(year, composer, index, music)};
        });
    });
});

// Get home message
homeMsg = fs.readFileSync('./home/msg.txt', {encoding: 'utf8'}).trim().split(/\r\n|\r|\n/);

// Deal with GET request
app.get('/', (req, res) => {
    res.render('index', data = {
        musics: allMusic,
        msg: homeMsg,
    });
});
