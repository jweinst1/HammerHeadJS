/**
 * Main file for virtual machine
 */

var HammerHead = (function(){
    //private variable to store operations
    var ASM = {
        //inp op codes increase the pointer
        "inp_1":function(mach){
           mach.pointer += 1;
        },
        "inp_2":function(mach){
            mach.pointer += 2;
        },
        "inp_3":function(mach){
            mach.pointer += 3;
        },
        "inp_4":function(mach){
            mach.pointer += 4;
        },
        "inp_5":function(mach){
            mach.pointer += 5;
        },
        "inp_10":function(mach){
            mach.pointer += 10;
        },
        "inp_20":function(mach){
            mach.pointer += 20;
        },
        "inp_25":function(mach){
            mach.pointer += 25;
        },
        "inp_50":function(mach){
            mach.pointer += 50;
        },
        "inp_100":function(mach){
            mach.pointer += 100;
        },
        "inp_200":function(mach){
            mach.pointer += 200;
        },
        "inp_1000":function(mach){
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
        //tfw opcodes transfer values forward and overwrite the targeted cell's value
        "tfw_1":function(mach){
            mach.cells[mach.pointer+1] = mach.cells[mach.pointer]
        }
    };
    function HammerHead(){
        this.cells = new Array(10000);
        this.pointer = 0;
        //seperate counter for indexing instructions
        this.index = 0;
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

