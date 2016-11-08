Blockly.Blocks['setmotorspeed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set Motor Speed:")
        .appendField("Port:")
        .appendField(new Blockly.FieldNumber(1, 1, 10), "Port")
        .appendField("Speed:")
        .appendField(new Blockly.FieldNumber(0, -127, 127), "Speed");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['initcode'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("InitIO");
    this.appendStatementInput("InitIOVars")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("Init");
    this.appendStatementInput("InitVars")
        .setCheck(null);
    this.setColour(270);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['main_h'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Global variable initialization");
    this.appendStatementInput("MainVars")
        .setCheck(null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['autonomous'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Autonomous");
    this.appendStatementInput("AutonVars")
        .setCheck(null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['opcontrol'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Operator Control");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};