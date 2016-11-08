'use strict';

goog.provide('Blockly.PROS.text');

goog.require('Blockly.PROS');


Blockly.PROS['debug_string'] = function(block) {
	// Text value.
	var code = Blockly.PROS.quote_(block.getFieldValue('TEXT'));
	return [code, Blockly.PROS.ORDER_ATOMIC];
};

Blockly.PROS['text'] = function(block) {
  // Text value.
	var code = Blockly.PROS.quote_(block.getFieldValue('TEXT'));
	return [code, Blockly.PROS.ORDER_ATOMIC];
};

Blockly.PROS['debug'] = function(block) {
	// Print statement.
	var argument0 = Blockly.PROS.valueToCode(block, 'TEXT',
			Blockly.PROS.ORDER_NONE) || '""';
	return 'DEBUG(( ' + argument0 + ' ));\n';
};


Blockly.PROS['text_print'] = function(block) {
  // Print statement.
var argument0 = Blockly.PROS.valueToCode(block, 'TEXT',
			Blockly.PROS.ORDER_NONE) || '""';
	return 'DEBUG(( ' + argument0 + ' ));\n';
};