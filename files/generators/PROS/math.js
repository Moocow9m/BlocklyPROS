'use strict';

goog.provide('Blockly.PROS.math');

goog.require('Blockly.PROS');

Blockly.PROS['math_number'] = function(block) {
	// Numeric value.
	var code = block.getFieldValue('NUM');
	//Validate that the input starts with a number. parseFloat will correctly ignore the trailing f on single-precision floats.
	//TODO: better validation to make sure there isn't other crud after the number
	if(isNaN(parseFloat(code))) {
		code = '0';
	}
	return [code, Blockly.PROS.ORDER_ATOMIC];
};

Blockly.PROS['math_arithmetic'] = function(block) {
	// Basic arithmetic operators, and power.
	var OPERATORS = {
		ADD: [' + ', Blockly.PROS.ORDER_ADDITION],
		MINUS: [' - ', Blockly.PROS.ORDER_SUBTRACTION],
		MULTIPLY: [' * ', Blockly.PROS.ORDER_MULTIPLICATION],
		DIVIDE: [' / ', Blockly.PROS.ORDER_DIVISION],
		POWER: [null, Blockly.PROS.ORDER_COMMA]  // Handle power separately.
	};
	var tuple = OPERATORS[block.getFieldValue('OP')];
	var operator = tuple[0];
	var order = tuple[1];
	var argument0 = Blockly.PROS.valueToCode(block, 'A', order) || '0';
	var argument1 = Blockly.PROS.valueToCode(block, 'B', order) || '0';
	var code;
	// Power requires a special case since it has no operator. The ZR libraries use all single-precision floats. 
	if (!operator) {
		code = 'powf(' + argument0 + ', ' + argument1 + ')';
		return [code, Blockly.PROS.ORDER_FUNCTION_CALL];
	}
	code = argument0 + operator + argument1;
	return [code, order];
};

Blockly.PROS['math_single'] = function(block) {
	// Math operators with single operand.
	var operator = block.getFieldValue('OP');
	var code;
	var arg;
	if (operator == '-') {
		// Negation is a special case given its different operator precedence.
		arg = Blockly.PROS.valueToCode(block, 'NUM',
				Blockly.PROS.ORDER_UNARY_NEGATION) || '0';
		if (arg[0] == '-') {
			// --3 is not legal
			arg = ' ' + arg;
		}
		code = '-' + arg;
		return [code, Blockly.PROS.ORDER_UNARY_NEGATION];
	}
	arg = Blockly.PROS.valueToCode(block, 'NUM',
			Blockly.PROS.ORDER_NONE) || '0';
	// All ZR trig functions are single-precision and handled in radians, which makes most of the JS version of this unnecessary
	code = operator + '(' + arg + ')';
	return [code, Blockly.PROS.ORDER_FUNCTION_CALL];
};

Blockly.PROS['math_constant'] = function(block) {
	return [block.getFieldValue('CONSTANT'), Blockly.PROS.ORDER_ATOMIC];
};

Blockly.PROS['math_change'] = function(block) {
	// Add to a variable in place.
	var argument0 = Blockly.PROS.valueToCode(block, 'DELTA',
			Blockly.PROS.ORDER_ADDITION) || '0';
	var varName = Blockly.PROS.valueToCode(block, 'VAR',
			Blockly.PROS.ORDER_ADDITION) || '0';
	return varName + ' += ' + argument0 + ';\n';
};

// Rounding functions have a single operand.
Blockly.PROS['math_round'] = Blockly.PROS['math_single'];
// Trigonometry functions have a single operand.
Blockly.PROS['math_trig'] = Blockly.PROS['math_single'];


Blockly.PROS['math_modulo'] = function(block) {
	// Remainder computation.
	var argument0 = Blockly.PROS.valueToCode(block, 'DIVIDEND',
			Blockly.PROS.ORDER_MODULUS) || '0';
	var argument1 = Blockly.PROS.valueToCode(block, 'DIVISOR',
			Blockly.PROS.ORDER_MODULUS) || '0';
	var code = argument0 + ' % ' + argument1;
	return [code, Blockly.PROS.ORDER_MODULUS];
};