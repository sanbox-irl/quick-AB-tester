import * as fs from 'fs-extra';
import * as path from 'path';
import AdmZip from 'adm-zip';

class Main {
    testA: string = '';
    testB: string = '';
    directory: string = '';

    public Main() {
        const aPath: string = path.join(this.directory, this.testA);
        const bPath: string = path.join(this.directory, this.testB);

        if (!(fs.existsSync(this.directory) && fs.existsSync(aPath) && fs.existsSync(bPath))) {
            console.log('Directory or files did not exist. Exiting...');
            return;
        }

        let baseFolder = path.join(this.directory, 'Test ' + new Date().toDateString());
        let folder = baseFolder;
        let unique = 0;

        // Make it unique...
        while (fs.existsSync(folder)) {
            folder = baseFolder + ' ' + unique++;
        }

        // Make the Folder...
        fs.mkdirSync(folder);

        // Get our Aliases
        let aAlias = this.MakeID();
        let bAlias = this.MakeID();
        while (aAlias == bAlias) {
            aAlias = this.MakeID();
            bAlias = this.MakeID();
        }

        const saveOut: { [path: string]: string } = {};
        saveOut[aPath] = aAlias;
        saveOut[bPath] = bAlias;
        const out = JSON.stringify(saveOut, undefined, 4);

        // save them
        fs.writeFileSync(path.join(folder, 'Key.json'), out);

        // Make our Zips
        var zipper = new AdmZip();
        zipper.addLocalFolder(aPath, aAlias);
        zipper.addLocalFolder(bPath, bAlias);

        const baseName = Math.random() < 0.5 ? aAlias + bAlias : bAlias + aAlias;

        zipper.writeZip(path.join(folder, baseName + ' Test.zip'));

        console.log('Success!');
    }

    MakeID() {
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return possible.charAt(Math.floor(Math.random() * possible.length));
    }
}

// run the program
var main = new Main();
main.Main();
