'use strict';

goog.provide('Blockly.PROS.PROS');

goog.require('Blockly.PROS');

Blockly.PROS['setmotorspeed'] = function(block) {
  var port = block.getFieldValue('Port');
  var speed = block.getFieldValue('Speed');
	return 'motorSet(' + port + ', ' + speed + ');\n';
};
