module.exports = { mainFunc: mainFunc, showHelp: showHelp };

const getPackage = require('get-repo-package-json')
var semver = require('semver');
var clc = require("cli-color");
const shell = require('shelljs');
shell.config.silent = true;
const fs = require('fs');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)

//explain usage
const usage = "\nUsage: ddc <csv_file_path.csv> <dependency@version>";
function showHelp() {
    console.log(usage);
    console.log('\nOptions:\r')
    console.log('\t--version\t      ' + 'Show version number.' + '\t\t\t' + '[boolean]\r')
    console.log(' \t--update\t' + '      ' + 'Create a PR with updated dependency.' + '\t' + '[boolean]\r')
    console.log('\t--help\t\t      ' + 'Show help.' + '\t\t\t\t' + '[boolean]\n')
}


//main function recieves the csv data and cmd line arguments
function mainFunc(data, dependency, update) {

    
    const [dependencyName, dependencyVersion] = splitDependency(dependency);

    console.log(update);


    console.log(clc.black.bgWhite(`Checking for ${dependencyName}@${dependencyVersion}`));





    const length = data.length;



    data.map((item, index) => {

        getPackage(item.repo).then(pkg => {

            //error handling lol
            if (!pkg.dependencies[dependencyName]) {
                console.log(`No dependency named : ${dependencyName} for ${item.name}`);
                return;
            }
            const version = pkg.dependencies[dependencyName].substr(1);
            const versionCheck = semver.gte(version, dependencyVersion);
            if (update == "true" && versionCheck == false) {
                pkg.dependencies[dependencyName] = `^${dependencyVersion}`;

                shell.exec(`git clone ${item.repo} -q`);
                shell.cd(`${item.name}`);
                shell.exec(`git checkout -b "${dependencyName}_update"`);
                fs.writeFileSync('package.json', JSON.stringify(pkg), {
                    encoding: 'utf8',
                    flag: 'w'
                })
                shell.exec('git add package.json');
                shell.exec(`git commit -m "${dependencyName} update to ${dependencyVersion} from ${version}"`);
                shell.exec(`git push -q --set-upstream origin ${dependencyName}_update `);
                getPRurl(dependencyName,dependencyVersion,version,item,versionCheck,index);



            }
            else {
                console.log(index + "\t" + item.name + '\t' + item.repo + '\t' + (versionCheck ? clc.green(version) : clc.red(version)) + '\t' + (versionCheck ? clc.green(versionCheck) : clc.red(versionCheck)) + '\n');

            }







        })


    })






}


async function getPRurl(dependencyName,dependencyVersion,version,item,versionCheck,index){
    const PRurl = await exec(`gh pr create --title "${dependencyName} Version Update" --body "${dependencyName} updated to ${dependencyVersion} from ${version}"`);
    console.log(index + "\t" + item.name + '\t' + item.repo + '\t' + (versionCheck ? clc.green(version) : clc.red(version)) + '\t' + (versionCheck ? clc.green(versionCheck) : clc.red(versionCheck)) + '\t' + PRurl.stdout);
    shell.exec('rm -fr .git')
}




//to get name and version seperately
function splitDependency(dependency) {
    return dependency.split("@");
}


