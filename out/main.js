"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const adm_zip_1 = __importDefault(require("adm-zip"));
class Main {
    constructor() {
        this.testA = 'C:\\Users\\jjspi\\Documents\\Projects\\Unity Projects\\GM48 Grace and Jack Make Games\\Build\\Normal Builds\\Build 3';
        this.testB = 'C:\\Users\\jjspi\\Documents\\Projects\\Unity Projects\\GM48 Grace and Jack Make Games\\Build\\Normal Builds\\Build 5';
        this.directory = 'C:\\Users\\jjspi\\Documents\\Projects\\Unity Projects\\GM48 Grace and Jack Make Games\\Build\\AB Tests';
    }
    Main() {
        const aPath = this.testA;
        const bPath = this.testB;
        if (!(fs.existsSync(this.directory) && fs.existsSync(aPath) && fs.existsSync(bPath))) {
            if (fs.existsSync(this.directory) == false)
                console.log("Directory didn't exist!");
            if (fs.existsSync(aPath) == false)
                console.log("APath didn't exist!");
            if (fs.existsSync(bPath) == false)
                console.log("BPath didn't exist!");
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
        const saveOut = {};
        saveOut[aPath] = aAlias;
        saveOut[bPath] = bAlias;
        const out = JSON.stringify(saveOut, undefined, 4);
        // save them
        fs.writeFileSync(path.join(folder, 'Key.json'), out);
        // Make our Zips
        var zipper = new adm_zip_1.default();
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
//# sourceMappingURL=main.js.map