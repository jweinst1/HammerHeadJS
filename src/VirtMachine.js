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
            mach.pointer += 1000;
        },
        //dep opcodes decrease the pointer
        "dep_1":function(mach){
            mach.pointer -= 1;
        },
        "dep_2":function(mach){
            mach.pointer -= 2;
        },
        "dep_3":function(mach){
            mach.pointer -= 3;
        },
        "dep_4":function(mach){
            mach.pointer -= 4;
        },
        "dep_5":function(mach){
            mach.pointer -= 5;
        },
        "dep_10":function(mach){
            mach.pointer -= 10;
        },
        "dep_20":function(mach){
            mach.pointer -= 20;
        },
        "dep_25":function(mach){
            mach.pointer -= 25;
        },
        "dep_50":function(mach){
            mach.pointer -= 50;
        },
        "dep_100":function(mach){
            mach.pointer -= 100;
        },
        "dep_200":function(mach){
            mach.pointer -= 200;
        },
        "dep_1000":function(mach){
            mach.pointer -= 1000;
        },
        //stp opcodes set the pointer to a specific value.
        "stp_0":function(mach){
            mach.pointr = 0;
        },
        "stp_1":function(mach){
            mach.pointr = 1;
        },
        "stp_5":function(mach){
            mach.pointr = 5;
        },
        "stp_c":function(mach){
            if(typeof mach.cells[mach.pointer] === 'number') mach.pointer = mach.cells[mach.pointer]
        },
        //ldi opcodes load an integer value to the cell
        "ldi_0":function(mach){
            mach.cells[mach.pointer] = 0;
        },
        "ldi_1":function(mach){
            mach.cells[mach.pointer] = 1;
        },
        "ldi_2":function(mach){
            mach.cells[mach.pointer] = 2;
        },
        "ldi_3":function(mach){
            mach.cells[mach.pointer] = 3;
        },
        "ldi_4":function(mach){
            mach.cells[mach.pointer] = 4;
        },
        "ldi_5":function(mach){
            mach.cells[mach.pointer] = 5;
        },
        "ldi_10":function(mach){
            mach.cells[mach.pointer] = 10;
        },
        "ldi_20":function(mach){
            mach.cells[mach.pointer] = 20;
        },
        "ldi_25":function(mach){
            mach.cells[mach.pointer] = 25;
        },
        "ldi_50":function(mach){
            mach.cells[mach.pointer] = 50;
        },
        "ldi_100":function(mach){
            mach.cells[mach.pointer] = 100;
        },
        "ldi_200":function(mach){
            mach.cells[mach.pointer] = 200;
        },
        "ldi_500":function(mach){
            mach.cells[mach.pointer] = 500;
        },
        "ldi_1000":function(mach){
            mach.cells[mach.pointer] = 1000;
        },
        "ldi_2000":function(mach){
            mach.cells[mach.pointer] = 2000;
        },
        "ldi_5000":function(mach){
            mach.cells[mach.pointer] = 5000;
        },
        "ldi_10000":function(mach){
            mach.cells[mach.pointer] = 10000;
        },
        //ldb opcodes load a boolean to the current cell
        "ldb_t":function(mach){
           mach.cells[mach.pointer] = true;
        },
        "ldb_f":function(mach){
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

