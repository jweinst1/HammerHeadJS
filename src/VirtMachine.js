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
        "lds_":function(mach){
            mach.cells[mach.pointer] = "";
        },
        //lda opcodes load arrays to the current cell
        "lda_":function(mach){
            mach.cells[mach.pointer] = [];
        },
        //ldo opcodes load empty objects to the current cell
        "ldo_":function(mach){
            mach.cells[mach.pointer] = {};
        },
        //ldn opcodes load null to the current cell.
        "ldn_":function(mach){
            mach.cells[mach.pointer] = null;
        },
        //ldu opcodes load an undefined in the current cell
        "ldu_":function(mach){
            mach.cells[mach.pointer] = undefined;
        },
        //ccs opcodes concat strings to the current cell
        "ccs_a":function(mach){
            mach.cells[mach.pointer] += "a"
        },
        "ccs_b":function(mach){
            mach.cells[mach.pointer] += "b"
        },
        "ccs_c":function(mach){
            mach.cells[mach.pointer] += "c"
        },
        //sre opcodes set the return value
        "sre_c":function(mach){
            mach.returnval = mach.cells[mach.pointer];
        },
        "sre_0":function(mach){
            mach.returnval = mach.cells[0];
        },
        //adi op codes add an integer to the value of the current cell
        "adi_1":function(mach){
            mach.cells[mach.pointer] += 1;
        },
        "adi_2":function(mach){
            mach.cells[mach.pointer] += 2;
        },
        //sbi op codes subtract integers from the current value of the cell
        "sbi_1":function(mach){
            mach.cells[mach.pointer] -= 1;
        },
        "sbi_2":function(mach){
            mach.cells[mach.pointer] -= 2;
        },
        //mli op codes multiply integers on the current value of the cell
        "mli_1":function(mach){
            mach.cells[mach.pointer] *= 1;
        },
        "mli_2":function(mach){
            mach.cells[mach.pointer] *= 2;
        },
        //dvi op codes divide integers on the current value of the cell
        "dvi_1":function(mach){
            mach.cells[mach.pointer] /= 1;
        },
        "dvi_2":function(mach){
            mach.cells[mach.pointer] /= 2;
        },
        //rdi op code perform remainder operations on the current value of the cell
        "rdi_1":function(mach){
            mach.cells[mach.pointer] %= 1;
        },
        "rdi_2":function(mach){
            mach.cells[mach.pointer] %= 2;
        },
        //afi op codes add the value of the current cell to the next cells
        "afi_1":function(mach){
            mach.cells[mach.pointer+1] += mach.cells[mach.pointer]
        },
        "afi_2":function(mach){
            mach.cells[mach.pointer+2] += mach.cells[mach.pointer]
        },
        "afi_3":function(mach){
            mach.cells[mach.pointer+3] += mach.cells[mach.pointer]
        },
        //bt opcodes set the current cell value to true if it evaluates to true
        "bt_":function(mach){
            mach.cells[mach.pointer] ? mach.cells[mach.pointer] = true : mach.cells[mach.pointer] = false
        },
        //tfw opcodes transfer values forward and overwrite the targeted cell's value
        "tfw_1":function(mach){
            mach.cells[mach.pointer+1] = mach.cells[mach.pointer]
        },
        "tfw_2":function(mach){
            mach.cells[mach.pointer+2] = mach.cells[mach.pointer]
        },
        //tbw opcodes transfer values backward and overwrite the targeted cells' value
        "tbw_1":function(mach){
            mach.cells[mach.pointer-1] = mach.cells[mach.pointer]
        },
        "tbw_2":function(mach){
            mach.cells[mach.pointer-2] = mach.cells[mach.pointer]
        },
        //rp opcodes repeat the previous opcode some number of times. Utilizes repeatcount tracker of the machine
        "rp_1":function(mach){
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
        "rp_5":function(mach){
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
        "rp_10":function(mach){
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
    }
    HammerHead.prototype.runcode = function(code){
        //splits the code by newline or white space
        var instrucs = code.split(/ |\n/);
        for(this.index = 0;this.index<instrucs.length;this.index++) {
            if(instrucs[this.index] in this.funcs) {
                this.funcs[instrucs[this.index]](this);
            }
            else {
                return "ERROR OP"
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

