#! /usr/bin/env node
const utils = require('./utils.js');
const yargs = require("yargs");

const usage = "\nUsage: ddc <csv_file_path.csv> <dependency@version>";


//if command is passed with no content , show halp
if(yargs.argv._[0] == null){  
    utils.showHelp();  
    return;  
}


//info for --help flag 
const options = yargs
    .usage(usage)
    .option("update", {
         describe: "Create a PR with updated dependency", type: "boolean", demandOption
            : false
    })
    .help(true)
    .argv;



const fs = require('fs');
const csv = require('fast-csv');
const data = [];

const filePath = yargs.argv._[0];
const dependency = yargs.argv._[1];

//to check if update flag i
let update;
if(yargs.argv.update==true){
    update = "true";
}
else{
    update = "false";
}



//reading csv file and passing contents to main function in utils.js
fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => data.push(row))
    .on('end', () => utils.mainFunc(data,dependency,update));