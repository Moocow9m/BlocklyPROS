'use strict';

goog.provide('Blockly.PROS');

goog.require('Blockly.Generator');


Blockly.PROS = new Blockly.Generator('PROS');

//List of accepted variable types for dropdowns
Blockly.PROS.PROS_VARIABLE_TYPES =
	[['float', 'float'],
	 ['int', 'int'],
	 ['unsigned int', 'unsigned int'],
	 ['short', 'short'],
	 ['unsigned short', 'unsigned short'],
	 ['bool', 'bool']];
	 
Blockly.PROS.PROS_GLOBAL_VARS = [];

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.PROS.addReservedWords(
	',auto,break,case,char,const,continue,default,do,double,else,enum,extern,float,for,goto,if,inline,int,long,register,restrict,return,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile,while,_Alignas,_Alignof,_Atomic,_Bool,_Complex,_Generic,_Imaginary,_Noreturn,_Static_assert,_Thread_local,'
	// http://en.cppreference.com/w/c/keyword
	+ 'game,api,PI,PI2,PI3,PI4,DEG2RAD,RAD2DEG,ZRMS,ZR2D,ZR3D,ALLIANCE'
);

/**
 * Order of operation ENUMs.
 * http://en.cppreference.com/w/cpp/language/operator_precedence
 */
Blockly.PROS.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.PROS.ORDER_MEMBER = 2;         // . []
Blockly.PROS.ORDER_FUNCTION_CALL = 2;  // ()
Blockly.PROS.ORDER_INCREMENT = 3;      // ++
Blockly.PROS.ORDER_DECREMENT = 3;      // --
Blockly.PROS.ORDER_LOGICAL_NOT = 3;    // !
Blockly.PROS.ORDER_BITWISE_NOT = 3;    // ~
Blockly.PROS.ORDER_UNARY_PLUS = 3;     // +
Blockly.PROS.ORDER_UNARY_NEGATION = 3; // -
Blockly.PROS.ORDER_MULTIPLICATION = 5; // *
Blockly.PROS.ORDER_DIVISION = 5;       // /
Blockly.PROS.ORDER_MODULUS = 5;        // %
Blockly.PROS.ORDER_ADDITION = 6;       // +
Blockly.PROS.ORDER_SUBTRACTION = 6;    // -
Blockly.PROS.ORDER_BITWISE_SHIFT = 7;  // << >>
Blockly.PROS.ORDER_RELATIONAL = 8;     // < <= > >=
Blockly.PROS.ORDER_EQUALITY = 9;       // == != 
Blockly.PROS.ORDER_BITWISE_AND = 10;   // &
Blockly.PROS.ORDER_BITWISE_XOR = 11;   // ^
Blockly.PROS.ORDER_BITWISE_OR = 12;    // |
Blockly.PROS.ORDER_LOGICAL_AND = 13;   // &&
Blockly.PROS.ORDER_LOGICAL_OR = 14;    // ||
Blockly.PROS.ORDER_CONDITIONAL = 15;   // ?:
Blockly.PROS.ORDER_ASSIGNMENT = 15;    // = += -= *= /= %= <<= >>= ...
Blockly.PROS.ORDER_COMMA = 17;         // ,
Blockly.PROS.ORDER_NONE = 99;          // (...)

/**
 * Arbitrary code to inject into locations that risk causing infinite loops.
 * Any instances of '%1' will be replaced by the block ID that failed.
 * E.g. '  checkTimeout(%1);\n'
 * @type ?string
 */
Blockly.PROS.INFINITE_LOOP_TRAP = null;

/**
 * Initialise the database of variable names.
 */
Blockly.PROS.init = function() {
	// Create a dictionary of definitions to be printed before the code.
	Blockly.PROS.definitions_ = Object.create(null);
	// Create a dictionary mapping desired function names in definitions_
	// to actual function names (to avoid collisions with user functions).
	Blockly.PROS.functionNames_ = Object.create(null);

	if (Blockly.Variables) {
		if (!Blockly.PROS.variableDB_) {
			Blockly.PROS.variableDB_ =
					new Blockly.Names(Blockly.PROS.RESERVED_WORDS_);
		} else {
			Blockly.PROS.variableDB_.reset();
		}

		var defvars = [];
		var variables = workspace.variableList;
		if (variables.length) {
			for (var i = 0; i < variables.length; i++) {
				defvars[i] = Blockly.PROS.variableDB_.getName(variables[i],
					Blockly.Variables.NAME_TYPE);
    }
    Blockly.PROS.definitions_['variables'] =
        'var ' + defvars.join(', ') + ';';
  }
	}
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.PROS.finish = function(code) {
	//Suppress global variables on single-page displays
	return code;
}

Blockly.PROS.finishFull = function(code) {
	// Convert the definitions dictionary into a list.
	var definitions = [];
	for (var name in Blockly.PROS.definitions_) {
		definitions.push(Blockly.PROS.definitions_[name]);
	}
	code = definitions.join('\n\n') + '\n\n' + 
	'void setPos(float x, float y, float z) {\n\tfloat pos[3];\n\tpos[0] = x; pos[1] = y; pos[2] = z;\n\tapi.setPositionTarget(pos);\n}'
	+ '\n\n' + code;
	//HACK: Make sure the code contains an init function in case the init page has not been properly initialized
	if(code.indexOf('//Begin page init\nvoid init() {\n') === -1) {
		code = 'void init() {}\n' + code;
	}
	return code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.PROS.scrubNakedValue = function(line) {
	//ZR editor should ignore all blocks that are not children of the page's function block
	return '';
};

/**
 * Encode a string as a properly escaped JavaScript string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} JavaScript string.
 * @private
 */
Blockly.PROS.quote_ = function(string) {
	// TODO: This is a quick hack.  Replace with goog.string.quote
	string = string.replace(/\\/g, '\\\\')
								 .replace(/\n/g, '\\\n')
								 .replace(/'/g, '\\\'');
	return string; //Do not add quotes so printf formatting can be used
};

/**
 * Common tasks for generating JavaScript from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The JavaScript code created for this block.
 * @return {string} JavaScript code with comments and subsequent blocks added.
 * @this {Blockly.CodeGenerator}
 * @private
 */
Blockly.PROS.scrub_ = function(block, code) {
	if (code === null) {
		// Block has handled code generation itself.
		return '';
	}
	var commentCode = '';
	// Only collect comments for blocks that aren't inline.
	if (!block.outputConnection || !block.outputConnection.targetConnection) {
		// Collect comment for this block.
		var comment = block.getCommentText();
		if (comment) {
			commentCode += this.prefixLines(comment, '// ') + '\n';
		}
		// Collect comments for all value arguments.
		// Don't collect comments for nested statements.
		for (var x = 0; x < block.inputList.length; x++) {
			if (block.inputList[x].type == Blockly.INPUT_VALUE) {
				var childBlock = block.inputList[x].connection.targetBlock();
				if (childBlock) {
					var comment = this.allNestedComments(childBlock);
					if (comment) {
						commentCode += this.prefixLines(comment, '// ');
					}
				}
			}
		}
	}
	var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
	var nextCode = this.blockToCode(nextBlock);
	return commentCode + code + nextCode;
};