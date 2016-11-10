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
  var code = '//replace contents of init.c with this\n#include \"main.h\"\n\nvoid initializeIO() {\n' + statements_initiovars + '}\n\nvoid initialize() {\n' + statements_initvars + '}\n';
  return code;
};

Blockly.PROS['main_h'] = function(block) {
  var statements_mainvars = Blockly.PROS.statementToCode(block, 'MainVars');
  // TODO: Assemble PROS into code variable.
  var code = '//add to Main.h after #ifdef __cplusplus \n //extern "C" {\n//#endif\n\n\n' + statements_mainvars + '\n';
  return code;
};

Blockly.PROS['autonomous'] = function(block) {
  var statements_autonvars = Blockly.PROS.statementToCode(block, 'AutonVars');
  // TODO: Assemble PROS into code variable.
  var code = '//replace contents of auto.c with this\n#include \"main.h\"\n\nvoid autonomous() {\n' + statements_autonvars + '}\n';
  return code;
};

Blockly.PROS['opcontrol'] = function(block) {
  var statements_name = Blockly.PROS.statementToCode(block, 'NAME');
  // TODO: Assemble PROS into code variable.
  var code = '//replace contents of opcontrol.c with this\n#include \"main.h\"\n\nvoid operatorControl() {\n' + statements_name + '\n}\n';
  return code;
};

Blockly.PROS['while_loop'] = function(block) {
  var value_statement = Blockly.PROS.valueToCode(block, 'Statement', Blockly.PROS.ORDER_ATOMIC);
  var statements_loopvars = Blockly.PROS.statementToCode(block, 'loopVars');
  // TODO: Assemble PROS into code variable.
  var code = 'while (' + value_statement + ') { \n' + statements_loopvars + '	delay(20);\n}\n';
  return code;
};
