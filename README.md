#HammerHeadJS

#####A nifty, array based virtual machine written in Nodejs.

HammerHead is a virtual machine, designed for fast performance, portability, and originality. It works off the concept of an
array of cells, that is of a fixed size, rather than the usual models of stacks and registers. 

In traditional virtual machines, a stack is used as the backbone of the machine, to facilitate the loading and computing of desired values and functionality. Popular VM's such as the JVM use this model. However, a common pitfall with these machines is that the constant pushing and popping operations on the stack