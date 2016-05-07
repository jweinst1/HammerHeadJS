/**
 * Main file for virtual machine
 */

var HammerHead = (function(){
    //private variable to store operations
    var ASM = {
        "inp_1":function(mach){
           mach.pointer += 1;
        },
        "ldi_0":function(mach){
            mach.cells[mach.pointer] = 0;
        },
        "ldi_1":function(mach){
            mach.cells[mach.pointer] = 1;
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

