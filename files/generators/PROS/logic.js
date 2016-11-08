'use strict';

goog.provide('Blockly.PROS.logic');

goog.require('Blockly.PROS');


Blockly.PROS['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.PROS.valueToCode(block, 'IF' + n,
      Blockly.PROS.ORDER_NONE) || 'false';
  var branch = Blockly.PROS.statementToCode(block, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.PROS.valueToCode(block, 'IF' + n,
        Blockly.PROS.ORDER_NONE) || 'false';
    branch = Blockly.PROS.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.PROS.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '\n}';
  }
  return code + '\n';
};

Blockly.PROS['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    EQ: '==',
    NEQ: '!=',
    LT: '<',
    LTE: '<=',
    GT: '>',
    GTE: '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.PROS.ORDER_EQUALITY : Blockly.PROS.ORDER_RELATIONAL;
  var argument0 = Blockly.PROS.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.PROS.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.PROS['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.PROS.ORDER_LOGICAL_AND :
      Blockly.PROS.ORDER_LOGICAL_OR;
  var argument0 = Blockly.PROS.valueToCode(block, 'A', order);
  var argument1 = Blockly.PROS.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.PROS['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.PROS.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.PROS.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.PROS['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.PROS.ORDER_ATOMIC];
};

Blockly.PROS['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.PROS.valueToCode(block, 'IF',
      Blockly.PROS.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.PROS.valueToCode(block, 'THEN',
      Blockly.PROS.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.PROS.valueToCode(block, 'ELSE',
      Blockly.PROS.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else
  return [code, Blockly.PROS.ORDER_CONDITIONAL];
};