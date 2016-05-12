/**
 * Main file for virtual machine
 */

var HammerHead = (function(){
    //private variable to store operations
    var ASM = {
        //inp op codes increase the pointer
        "aaa":function(mach){
           mach.pointer += 1;
        },
        "aab":function(mach){
            mach.pointer += 2;
        },
        "aac":function(mach){
            mach.pointer += 3;
        },
        "aad":function(mach){
            mach.pointer += 4;
        },
        "aae":function(mach){
            mach.pointer += 5;
        },
        "aaf":function(mach){
            mach.pointer += 10;
        },
        "aag":function(mach){
            mach.pointer += 20;
        },
        "aah":function(mach){
            mach.pointer += 25;
        },
        "aai":function(mach){
            mach.pointer += 50;
        },
        "aaj":function(mach){
            mach.pointer += 100;
        },
        "aak":function(mach){
            mach.pointer += 200;
        },
        "aal":function(mach){
            mach.pointer += 500;
        },
        "aam":function(mach){
            mach.pointer += 1000;
        },
        //dep opcodes decrease the pointer
        "aan":function(mach){
            mach.pointer -= 1;
        },
        "aao":function(mach){
            mach.pointer -= 2;
        },
        "aap":function(mach){
            mach.pointer -= 3;
        },
        "aaq":function(mach){
            mach.pointer -= 4;
        },
        "aar":function(mach){
            mach.pointer -= 5;
        },
        "aas":function(mach){
            mach.pointer -= 10;
        },
        "aat":function(mach){
            mach.pointer -= 20;
        },
        "aau":function(mach){
            mach.pointer -= 25;
        },
        "aav":function(mach){
            mach.pointer -= 50;
        },
        "aaw":function(mach){
            mach.pointer -= 100;
        },
        "aax":function(mach){
            mach.pointer -= 200;
        },
        "aay":function(mach){
            mach.pointer -= 500;
        },
        "aaz":function(mach){
            mach.pointer -= 1000;
        },
        //sets pointer to specific value
        "aaA":function(mach){
            if(typeof mach.cells[mach.pointer] === 'number') mach.pointer = mach.cells[mach.pointer];
        },
        "aaB":function(mach){
            mach.pointer = 0;
        },
        "aaC":function(mach){
            mach.pointer = 1;
        },
        "aaD":function(mach){
            mach.pointer = 2;
        },
        "aaE":function(mach){
            mach.pointer = 3;
        },
        "aaF":function(mach){
            mach.pointer = 5;
        },
        "aaG":function(mach){
            mach.pointer = 6;
        },
        "aaH":function(mach){
            mach.pointer = 8;
        },
        "aaI":function(mach){
            mach.pointer = 10;
        },
        "aaJ":function(mach){
            mach.pointer = 20;
        },
        "aaK":function(mach){
            mach.pointer = 25;
        },
        "aaL":function(mach){
            mach.pointer = 50;
        },
        "aaM":function(mach){
            mach.pointer = 100;
        },
        "aaN":function(mach){
            mach.pointer = 200;
        },
        "aaO":function(mach){
            mach.pointer = 500;
        },
        "aaP":function(mach){
            mach.pointer = 1000;
        },
        "aaQ":function(mach){
            mach.pointer *= 2;
        },
        "aaR":function(mach){
            mach.pointer *= 3;
        },
        "aaS":function(mach){
            mach.pointer *= 4;
        },
        "aaT":function(mach){
            mach.pointer *= 5;
        },
        "aaU":function(mach){
            mach.pointer *= 10;
        },
        "aaV":function(mach){
            mach.pointer *= 100;
        },
        "aaW":function(mach){
           mach.pointer = Math.floor(mach.pointer / 2);
        },
        "aaX":function(mach){
            mach.pointer = Math.floor(mach.pointer / 3);
        },
        "aaY":function(mach){
            mach.pointer = Math.floor(mach.pointer / 5);
        },
        "aaZ":function(mach){
            mach.pointer = Math.floor(mach.pointer / 10);
        },
        //opcodes load an integer value to the cell
        "aba":function(mach){
            mach.cells[mach.pointer] = 0;
        },
        "abb":function(mach){
            mach.cells[mach.pointer] = 1;
        },
        "abc":function(mach){
            mach.cells[mach.pointer] = 2;
        },
        "abd":function(mach){
            mach.cells[mach.pointer] = 3;
        },
        "abe":function(mach){
            mach.cells[mach.pointer] = 4;
        },
        "abf":function(mach){
            mach.cells[mach.pointer] = 5;
        },
        "abg":function(mach){
            mach.cells[mach.pointer] = 10;
        },
        "abh":function(mach){
            mach.cells[mach.pointer] = 20;
        },
        "abi":function(mach){
            mach.cells[mach.pointer] = 25;
        },
        "abj":function(mach){
            mach.cells[mach.pointer] = 50;
        },
        "abk":function(mach){
            mach.cells[mach.pointer] = 100;
        },
        "abl":function(mach){
            mach.cells[mach.pointer] = 200;
        },
        "abm":function(mach){
            mach.cells[mach.pointer] = 500;
        },
        "abn":function(mach){
            mach.cells[mach.pointer] = 1000;
        },
        "abo":function(mach){
            mach.cells[mach.pointer] = 2000;
        },
        "abp":function(mach){
            mach.cells[mach.pointer] = 5000;
        },
        "abq":function(mach){
            mach.cells[mach.pointer] = 10000;
        },
        "abr":function(mach){
            mach.cells[mach.pointer] = 100000;
        },
        //loads decimal value
        "abs":function(mach){
            mach.cells[mach.pointer] = 0.1;
        },
        "abt":function(mach){
            mach.cells[mach.pointer] = 0.2;
        },
        "abu":function(mach){
            mach.cells[mach.pointer] = 0.25;
        },
        "abv":function(mach){
            mach.cells[mach.pointer] = 0.5;
        },
        "abw":function(mach){
            mach.cells[mach.pointer] = 0.6;
        },
        "abx":function(mach){
            mach.cells[mach.pointer] = 0.75;
        },
        //load boolean
        "aby":function(mach){
           mach.cells[mach.pointer] = true;
        },
        "abz":function(mach){
            mach.cells[mach.pointer] = false;
        },
        //lds opcodes load a string to the current cell
        "abA":function(mach){
            mach.cells[mach.pointer] = "";
        },
        //lda opcodes load arrays to the current cell
        "abB":function(mach){
            mach.cells[mach.pointer] = [];
        },
        //opcodes load empty objects to the current cell
        "abC":function(mach){
            mach.cells[mach.pointer] = {};
        },
        //opcodes load null to the current cell.
        "abD":function(mach){
            mach.cells[mach.pointer] = null;
        },
        //opcodes load an undefined in the current cell
        "abE":function(mach){
            mach.cells[mach.pointer] = undefined;
        },
        //sets return value to current cell
        "abF":function(mach){
            mach.returnval = mach.cells[mach.pointer];
        },
        "abG":function(mach){
            mach.returnval = mach.cells[mach.pointer+1];
        },
        "abH":function(mach){
            mach.returnval = mach.cells[mach.pointer-1];
        },
        //adding integers
        "abI":function(mach){
            mach.cells[mach.pointer] += 1;
        },
        "abJ":function(mach){
            mach.cells[mach.pointer] += 2;
        },
        "abK":function(mach){
            mach.cells[mach.pointer] += 3;
        },
        "abL":function(mach){
            mach.cells[mach.pointer] += 5;
        },
        "abM":function(mach){
            mach.cells[mach.pointer] += 10;
        },
        "abO":function(mach){
            mach.cells[mach.pointer] += 20;
        },
        "abP":function(mach){
            mach.cells[mach.pointer] += 25;
        },
        "abQ":function(mach){
            mach.cells[mach.pointer] += 50;
        },
        "abR":function(mach){
            mach.cells[mach.pointer] += 100;
        },
        "abS":function(mach){
            mach.cells[mach.pointer] += 200;
        },
        "abT":function(mach){
            mach.cells[mach.pointer] += 500;
        },
        "abU":function(mach){
            mach.cells[mach.pointer] += 1000;
        },
        "abV":function(mach){
            mach.cells[mach.pointer] += 2000;
        },
        "abW":function(mach){
            mach.cells[mach.pointer] += 5000;
        },
        "abX":function(mach){
            mach.cells[mach.pointer] += 10000;
        },
        "abY":function(mach){
            mach.cells[mach.pointer] += 25000;
        },
        "abZ":function(mach){
            mach.cells[mach.pointer] += 50000;
        },
        //subtract integers
        "aca":function(mach){
            mach.cells[mach.pointer] -= 1;
        },
        "acb":function(mach){
            mach.cells[mach.pointer] -= 2;
        },
        "acc":function(mach){
            mach.cells[mach.pointer] -= 3;
        },
        "acd":function(mach){
            mach.cells[mach.pointer] -= 5;
        },
        "ace":function(mach){
            mach.cells[mach.pointer] -= 10;
        },
        "acf":function(mach){
            mach.cells[mach.pointer] -= 20;
        },
        "acg":function(mach){
            mach.cells[mach.pointer] -= 25;
        },
        "ach":function(mach){
            mach.cells[mach.pointer] -= 50;
        },
        "aci":function(mach){
            mach.cells[mach.pointer] -= 100;
        },
        "acj":function(mach){
            mach.cells[mach.pointer] -= 200;
        },
        "ack":function(mach){
            mach.cells[mach.pointer] -= 500;
        },
        "acl":function(mach){
            mach.cells[mach.pointer] -= 1000;
        },
        "acm":function(mach){
            mach.cells[mach.pointer] -= 2000;
        },
        "acn":function(mach){
            mach.cells[mach.pointer] -= 5000;
        },
        "aco":function(mach){
            mach.cells[mach.pointer] -= 10000;
        },
        "acp":function(mach){
            mach.cells[mach.pointer] -= 25000;
        },
        "acq":function(mach){
            mach.cells[mach.pointer] -= 50000;
        },
        //multiply integer in current cell
        "acr":function(mach){
            mach.cells[mach.pointer] *= 1;
        },
        "acs":function(mach){
            mach.cells[mach.pointer] *= 2;
        },
        "act":function(mach){
            mach.cells[mach.pointer] *= 3;
        },
        "acu":function(mach){
            mach.cells[mach.pointer] *= 5;
        },
        "acv":function(mach){
            mach.cells[mach.pointer] *= 10;
        },
        "acw":function(mach){
            mach.cells[mach.pointer] *= 20;
        },
        "acx":function(mach){
            mach.cells[mach.pointer] *= 25;
        },
        "acy":function(mach){
            mach.cells[mach.pointer] *= 50;
        },
        "acz":function(mach){
            mach.cells[mach.pointer] *= 100;
        },
        "acA":function(mach){
            mach.cells[mach.pointer] *= 200;
        },
        "acB":function(mach){
            mach.cells[mach.pointer] *= 500;
        },
        "acC":function(mach){
            mach.cells[mach.pointer] *= 1000;
        },
        "acD":function(mach){
            mach.cells[mach.pointer] *= 2000;
        },
        "acE":function(mach){
            mach.cells[mach.pointer] *= 5000;
        },
        //divide integer in cell
        "acF":function(mach){
           mach.cells[mach.pointer] /= 2;
        },
        "acG":function(mach){
            mach.cells[mach.pointer] /= 3;
        },
        "acH":function(mach){
            mach.cells[mach.pointer] /= 4;
        },
        "acI":function(mach){
            mach.cells[mach.pointer] /= 5;
        },
        "acJ":function(mach){
            mach.cells[mach.pointer] /= 10;
        },
        "acK":function(mach){
            mach.cells[mach.pointer] /= 25;
        },
        "acL":function(mach){
            mach.cells[mach.pointer] /= 100;
        },
        "acM":function(mach){
            mach.cells[mach.pointer] /= 1000;
        },
        //floor division of current cell
        "acN":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/2)
        },
        "acO":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/3)
        },
        "acP":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/5)
        },
        "acQ":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/10)
        },
        "acR":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/20)
        },
        "acS":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/25)
        },
        "acT":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/100)
        },
        "acU":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/250)
        },
        "acV":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/500)
        },
        "acW":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/1000)
        },
        "acX":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/2000)
        },
        "acY":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/5000)
        },
        "acZ":function(mach){
            mach.cells[mach.pointer] = Math.floor(mach.cells[mach.pointer]/1000)
        },
        //rp opcodes repeat the previous opcode some number of times. Utilizes repeatcount tracker of the machine
        "ada":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 0;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        "adb":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 1;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        "adc":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 4;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        "add":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 9;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        "ade":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 14;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        "adf":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 19;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        "adg":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 29;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        "adh":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 49;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        "adi":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 99;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        "adj":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 199;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        "adk":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 299;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        "adl":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 499;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        "adm":function(mach){
            if(mach.repeatcount === false) {
                mach.repeatcount = 999;
                mach.index -= 2;
            }
            else if(mach.repeatcount === 0){
                mach.repeatcount = false;
            }
            else {
                mach.repeatcount -= 1;
                mach.index -= 2;
            }
        },
        //jump forward some number
        "adn":function(mach){
            mach.index += 1;
            //prevention of array out of bounds
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        },
        "ado":function(mach){
            mach.index += 2;
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        },
        "adp":function(mach){
            mach.index += 3;
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        },
        "adq":function(mach){
            mach.index += 4;
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        },
        "adr":function(mach){
            mach.index += 5;
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        },
        "ads":function(mach){
            mach.index += 6;
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        },
        "adt":function(mach){
            mach.index += 10;
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        },
        "adu":function(mach){
            mach.index += 20;
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        },
        "adv":function(mach){
            mach.index += 50;
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        },
        "adw":function(mach){
            mach.index += 100;
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        },
        "adx":function(mach){
            mach.index += 150;
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        },
        "ady":function(mach){
            mach.index += 250;
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        },
        "adz":function(mach){
            mach.index += 500;
            if(mach.index > mach.instrucnum) mach.index = mach.instrucnum;
        }
    };
    function HammerHead(){
        this.cells = new Array(10000);
        this.pointer = 0;
        //seperate counter for indexing instructions
        this.index = 0;
        //keeps track of repeating instructions
        this.repeatcount = false;
        this.funcs = ASM;
        this.returnval = null;
        this.instrucnum = 0;
    }
    HammerHead.prototype.runcode = function(code){
        //splits the code by newline or white space
        var instrucs = code.split(/ |\n/);
        this.instrucnum = instrucs.length-1;
        for(this.index = 0;this.index<instrucs.length;this.index++) {
            if(instrucs[this.index] in this.funcs) {
                try {
                    this.funcs[instrucs[this.index]](this);
                }
                catch(err){
                    return "ERROR"
                }
            }
            //external, non-determinstic instruction that loads strings into the current cell
            else if(/^\$.+/.test(instrucs[this.index])) {
                this.cells[this.pointer] = instrucs[this.index].slice(1, instrucs[this.index].length);
            }
            else {
                return "ERROR"
            }
        }
        //returns the requested value
        var response = this.returnval;
        this.returnval = null;
        return response
    };
    return HammerHead;
})();

exports.HammerHead = HammerHead;

