# Optimization
## 



### SIMD - Single Instruction Multiple Data

* Getting more and more difficult to increase the speed of modern CPUs
* many CPUs can process multiple values at once as long as the data in memory is contiguous (all next to each other) and the operation performed is the same
* The acronym SIMD for Single Instruction Multiple Data
* Used when iterating over large amounts of data
* Requires fewer iterations
* "pack" a group of values into a data structure, process the data and move on to the next group instead of processing one element at a time

Chip manufacturers are getting more and more creative in methods to cram more and more transistors in a tiny area.  There is a limit to how small

### Example - Multiply


### Example - Fused Multiply-Add


### Example - Hypotenuse 3D


### SOA - Struct of Arrays


### Example - SOA Fused Multiply-Add