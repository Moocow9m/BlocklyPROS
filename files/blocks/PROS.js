Blockly.Blocks['setmotorspeed'] = {
  init: function() {
	  this.jsonInit(
	  {
  "type": "setmotorspeed",
  "message0": "Set Motor Speed: Port: %1 Speed: %2",
  "args0": [
    {
      "type": "field_number",
      "name": "Port",
      "value": 0,
      "min": -127,
      "max": 127
    },
    {
      "type": "field_number",
      "name": "Speed",
      "value": 0,
      "min": -127,
      "max": 127
    }
  ],
  "previousStatement": [
    "Auto",
    "Driver"
  ],
  "nextStatement": [
    "Auto",
    "Driver"
  ],
  "colour": 230,
  "tooltip": "",
  "helpUrl": "http://www.example.com/"
}
	  );
  }
};

Blockly.Blocks['initcode'] = {
  init: function() {
	  this.jsonInit({
		  "type": "initcode",
  "message0": "InitIO %1 %2 Init %3 %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "InitIOVars",
      "check": "InitIO"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "InitVars",
      "check": "Init"
    }
  ],
  "colour": 270,
  "tooltip": "",
  "helpUrl": "http://www.example.com/"
	  });
  }
};

Blockly.Blocks['main_h'] = {
  init: function() {
	  this.jsonInit({
		  "type": "main_h",
  "message0": "Global variable initialization %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "MainVars",
      "check": "Main"
    }
  ],
  "colour": 65,
  "tooltip": "",
  "helpUrl": "http://www.example.com/"
	  });
  }
};

Blockly.Blocks['autonomous'] = {
  init: function() {
	  this.jsonInit({
		 "type": "autonomous",
  "message0": "Autonomous %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "AutonVars",
      "check": "Auto"
    }
  ],
  "colour": 160,
  "tooltip": "",
  "helpUrl": "http://www.example.com/"
  });
  }
};

Blockly.Blocks['opcontrol'] = {
  init: function() {
	  this.jsonInit({
		   "type": "opcontrol",
  "message0": "Operator Control %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "NAME",
      "check": "Driver"
    }
  ],
  "colour": 260,
  "tooltip": "",
  "helpUrl": "http://www.example.com/"
  });
  }
};

Blockly.Blocks['while_loop'] = {
  init: function() {
	  this.jsonInit({
		  "type": "while_loop",
  "message0": "While %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "Statement",
      "check": "Boolean"
    },
    {
      "type": "input_statement",
      "name": "loopVars"
    }
  ],
  "colour": 120,
  "tooltip": "",
  "helpUrl": "http://www.example.com/"
	  });
  }
};
