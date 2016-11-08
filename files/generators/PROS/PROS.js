'use strict';

goog.provide('Blockly.PROS.PROS');

goog.require('Blockly.PROS');

Blockly.PROS['setmotorspeed'] = function(block) {
  var port = block.getFieldValue('Port');
  var speed = block.getFieldValue('Speed');
	return 'motorSet(' + port + ', ' + speed + ');\n';
};

Blockly.PROS['initcode'] = function(block) {
  var statements_initvars = Blockly.PROS.statementToCode(block, 'InitVars');
  var statements_initiovars = Blockly.PROS.statementToCode(block, 'InitIOVars');
  var code = '//replace contents of init.c with this\n#include \"main.h\"\n\nvoid initializeIO() {\n' + statements_initiovars + '}\n\nvoid initialize() {\n' + statements_initvars + '}';
  return code;
};

Blockly.PROS['main_h'] = function(block) {
  var statements_mainvars = Blockly.PROS.statementToCode(block, 'MainVars');
  // TODO: Assemble PROS into code variable.
  var code = '...;\n';
  return code;
};

Blockly.PROS['autonomous'] = function(block) {
  var statements_autonvars = Blockly.PROS.statementToCode(block, 'AutonVars');
  // TODO: Assemble PROS into code variable.
  var code = '...;\n';
  return code;
};

Blockly.PROS['opcontrol'] = function(block) {
  var statements_name = Blockly.PROS.statementToCode(block, 'NAME');
  // TODO: Assemble PROS into code variable.
  var code = '...;\n';
  return code;
};