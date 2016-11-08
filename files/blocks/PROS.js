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