#HammerHeadJS

#####A nifty, array based virtual machine written in Nodejs.

HammerHead is a virtual machine, designed for fast performance, portability, and originality. It works off the concept of an
array of cells, that is of a fixed size, rather than the usual models of stacks and registers. 

In traditional virtual machines, a stack is used as the backbone of the machine, to facilitate the loading and computing of desired values and functionality. Popular VM's such as the JVM use this model. However, a common pitfall with these machines is that the constant pushing and popping operations on the stack causes a decrease in performance. 

Registers, on the otherhand are a faster method of computation. Most physical CPU's and machines use registers. Registers, providing quickly accessivle spaces of storage and computation,  are more difficult to access in an ordered fashion, and are normally limited in the available number of registers.

###The Array Machine

HammerHead uses an array based machine, which uses the blocks of memory in a traditional array to store and manipulate values. The machine itself operates on a pre-allocated 10000 cell array, all of which are `undefined` initially. To facilitate easy access to individual cells, the machine has a pointer arm, or a stored integer value that corresponds to the current cell. This current cell, is the one op and instruction codes will correspond to when used on the machine.

##Instruction Codes

HammerHead uses 24-bit length instruction codes, seperated into lengths of 3 bytes. All instructions are UTF-8 encoded, to correspond to an easier to read format and handling. Part of HammerHead's purpose is to serve as a gateway for many different languages to run both in the browser and in the desktop via a compiled executable of the machine, or from a Node package.

Additionally, all the instruction codes are deterministic. This means, the codes themselves do not contain arguments for values, or operands, but always corrsepond to some preset value or function on the machine. in MIPS architecture, to add two values of a register, and store them in another register, such as `add r1, r2, r3` where the value will be stored in `r1`, you have to do the following:

```
000000 00010 00011 00001 00000 100000
opcode funct  register register destination
```

In this format, the instruction code is formed via an order of smaller codes that encompass smaller meanings. 

With HammerHead, the instructions are entirely deterministic, laid out much like unicode characters are. For example, on the machine's array, adding the next cell to the current cell, would corrsepond to a code such as `acr`, or in binary `01100001 01100011 01110010`. The `acr` code will only ever perform that single function on the machine doing a code such as `abr` will perform an entirely different function as it leads to another family of instructions.

###Organization

The instruction set in HammerHead are organized as 3 byte length, 24 bit instructions, which are read encoded as alphabet letters. In terms of format, `[A-Za-z][A-Za-z][A-Za-z]` would be the proper regular expression to match any instruction. The first byte, or letter, is treated as the most important sign, while the second is sorted under the first, and the third under the second.

For example, the code `aaa` is the very first code in all of hammerheads instruction set, which corresponds to incrementing the pointer of the machine by 1 cell. The code `aab`, is very closely related, as it increments the pointer by 2. Yet when we get to the code `aar`, the function of the code is then to decrement the pointer by 1.