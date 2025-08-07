const franc = require('franc');
const langs = require('langs');
const colors = require('colors');
const input = process.argv[2];
const langCode = franc(input);
if(langCode === 'und') {
        console.log('Sorry, could not detect language.'.red)
} else {
        const language = langs.where('3', langCode);
        console.log(`Our best guess is: ${language.name}, or as the locals would say, ${language.local}.`.green)
}
