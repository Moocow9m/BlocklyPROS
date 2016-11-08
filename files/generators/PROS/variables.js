'use strict';

goog.provide('Blockly.PROS.variables');

goog.require('Blockly.PROS');


Blockly.PROS['variables_get'] = function(block) {
	// Variable getter.
	var code = Blockly.PROS.variableDB_.getName(block.getFieldValue('VAR'),
			Blockly.Variables.NAME_TYPE);
	return [code, Blockly.PROS.ORDER_ATOMIC];
};

Blockly.PROS['variables_array_get_pointer'] = function(block) {
	// Variable getter.
	var code = Blockly.PROS.variableDB_.getName(block.getFieldValue('VAR'),
			Blockly.Variables.NAME_TYPE);
	return [code, Blockly.PROS.ORDER_ATOMIC];
};

Blockly.PROS['variables_set'] = function(block) {
	// Variable setter.
	var argument0 = Blockly.PROS.valueToCode(block, 'VALUE',
			Blockly.PROS.ORDER_ASSIGNMENT) || '0';
	var varName = Blockly.PROS.variableDB_.getName(
			block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
	return varName + ' = ' + argument0 + ';\n';
};

Blockly.PROS['variables_declare'] = function(block) {
	// Declare variable. 
	var varName = Blockly.PROS.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
	var val = block.getFieldValue('VALUE') || '0';
	return varName + ' = ' + val + ';\n';
};


Blockly.PROS['variables_array_get'] = function(block) {
	//Note: Uses 0-based indices, not 1-based like other Blockly generators
	var index = Blockly.PROS.valueToCode(block, 'INDEX',
			Blockly.PROS.ORDER_NONE) || '0';
	var array = Blockly.PROS.variableDB_.getName(block.getFieldValue('ARRAY'), Blockly.Variables.NAME_TYPE) || '_';
	var code = array + '[' + index + ']';
	return [code, Blockly.PROS.ORDER_MEMBER];
};

Blockly.PROS['variables_array_set'] = function(block) {
	//Note: Uses 0-based indices, not 1-based like other Blockly generators
	var index = Blockly.PROS.valueToCode(block, 'INDEX',
			Blockly.PROS.ORDER_NONE) || '0';
	var array = Blockly.PROS.variableDB_.getName(block.getFieldValue('ARRAY'), Blockly.Variables.NAME_TYPE) || '_';
	var value = Blockly.PROS.valueToCode(block, 'VALUE',
			Blockly.PROS.ORDER_ASSIGNMENT) || '0';
	return array + '[' + index + '] = ' + value + ';\n';
};

Blockly.PROS['variables_array_declare'] = function(block) {
	// Declare array. 
	var varName = Blockly.PROS.variableDB_.getName(
			block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
	var len = block.getFieldValue('LENGTH');
	var code = '';
	for(var i = 0; i < len; i++) {
		var val = block.getFieldValue('VALUE' + i) || '0';
		code = code + varName + '[' + i + '] = ' + val + ';\n';
	}
	return code;
};