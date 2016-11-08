'use strict';

goog.provide('Blockly.PROS.procedures');

goog.require('Blockly.PROS');


Blockly.PROS['procedures_defreturn'] = function(block) {
	// Define a procedure with a return value.
	var funcName = Blockly.PROS.variableDB_.getName(
			block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
	var branch = Blockly.PROS.statementToCode(block, 'STACK');
	var type = block.getFieldValue('TYPE') || 'void';
	var returnValue = Blockly.PROS.valueToCode(block, 'RETURN',
			Blockly.PROS.ORDER_NONE) || '';
	if (returnValue) {
		returnValue = '  return ' + returnValue + ';\n';
	}
	var code = type + ' ' + funcName + block.getArgString(true) + ' {\n' +
			branch + returnValue + '}';
	code = Blockly.PROS.scrub_(block, code);
	return code;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.PROS['procedures_defnoreturn'] =
		Blockly.PROS['procedures_defreturn'];

Blockly.PROS['procedures_definit'] = function(block) {
	// Define a procedure with a return value.
	var branch = Blockly.PROS.statementToCode(block, 'GLOBALS') + Blockly.PROS.statementToCode(block, 'STACK');
	var code = 'void init() {\n' +
			branch + '}';
	code = Blockly.PROS.scrub_(block, code);
	return code;
};

Blockly.PROS['procedures_defloop'] = function(block) {
	// Define a procedure with a return value.
	var branch = Blockly.PROS.statementToCode(block, 'STACK');
	var code = 'void loop() {\n' +
			branch + '}';
	code = Blockly.PROS.scrub_(block, code);
	return code;
};

Blockly.PROS['procedures_callreturn'] = function(block) {
	// Call a procedure with a return value.
	var funcName = Blockly.PROS.variableDB_.getName(
			block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
	var args = [];
	for (var x = 0; x < block.arguments_.length; x++) {
		args[x] = Blockly.PROS.valueToCode(block, 'ARG' + x,
				Blockly.PROS.ORDER_COMMA) || 'null';
	}
	var code = funcName + '(' + args.join(', ') + ')';
	return [code, Blockly.PROS.ORDER_FUNCTION_CALL];
};

Blockly.PROS['procedures_callnoreturn'] = function(block) {
	// Call a procedure with no return value.
	var funcName = Blockly.PROS.variableDB_.getName(
			block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
	var args = [];
	for (var x = 0; x < block.arguments_.length; x++) {
		args[x] = Blockly.PROS.valueToCode(block, 'ARG' + x,
				Blockly.PROS.ORDER_COMMA) || 'null';
	}
	var code = funcName + '(' + args.join(', ') + ');\n';
	return code;
};

Blockly.PROS['procedures_ifreturn'] = function(block) {
	// Conditionally return value from a procedure.
	var condition = Blockly.PROS.valueToCode(block, 'CONDITION',
			Blockly.PROS.ORDER_NONE) || 'false';
	var code = 'if (' + condition + ') {\n';
	if (block.hasReturnValue_) {
		var value = Blockly.PROS.valueToCode(block, 'VALUE',
				Blockly.PROS.ORDER_NONE) || 'null';
		code += '  return ' + value + ';\n';
	} else {
		code += '  return;\n';
	}
	code += '}\n';
	return code;
};