/**
 * Main file for virtual machine
 */

var HammerHead = (function(){
    //private variable to store operations
    var ASM = {
        "ldi_0":function(mach){
            mach.cells[mach.pointer] = 0;
        },
        "ldi_1":function(mach){
            mach.cells[mach.pointer] = 1;
        }
    };
    function HammerHead(){
        this.cells = new Array(10000);
        this.pointer = 0;
        //seperate counter for indexing instructions
        this.index = 0;
        this.funcs = ASM;
    }
    HammerHead.prototype.runcode = function(code){
        //splits the code by newline or white space
        var instrucs = code.split(/ |\n/);
    };
    return HammerHead;
})();

exports.HammerHead = HammerHead;