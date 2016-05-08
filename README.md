#HammerHeadJS

#####A nifty, array based virtual machine written in Nodejs.

HammerHead is a virtual machine, designed for fast performance, portability, and originality. It works off the concept of an
array of cells, that is of a fixed size, rather than the usual models of stacks and registers. 

In traditional virtual machines, a stack is used as the backbone of the machine, to facilitate the loading and computing of desired values and functionality. Popular VM's such as the JVM use this model. However, a common pitfall with these machines is that the constant pushing and popping operations on the stack causes a decrease in performance. 

Registers, on the otherhand are a faster method of computation. Most physical CPU's and machines use registers. Registers, providing quickly accessivle spaces of storage and computation,  are more difficult to access in an ordered fashion, and are normally limited in the available number of registers.

###The Array Machine

HammerHead uses an array based machine, which uses the blocks of memory in a traditional array to store and manipulate values. The machine itself operates on a pre-allocated 10000 cell array, all of which are `undefined` initially. To facilitate easy access to individual cells, the machine has a pointer arm, or a stored integer value that corresponds to the current cell. This current cell, is the one op and instruction codes will correspond to when used on the machine.

##Instruction Codes

HammerHead uses determinstic and indeterministic instruction codes, all of which are dividied into families.