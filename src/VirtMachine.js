/**
 * Main file for virtual machine
 */

var HammerHead = (function(){
    //private variable to store operations
    var ASM = {
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
        "sre_c":function(mach){
            mach.returnval = mach.cells[mach.pointer]
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

