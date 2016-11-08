/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
var toolbox = document.getElementById("toolbox");

var options = { 
	toolbox : toolbox, 
	collapse : true, 
	comments : true, 
	css : true, 
	disable : true, 
	maxBlocks : Infinity, 
	media : 'https://blockly-demo.appspot.com/static/media/', 
	readOnly : false, 
	rtl : false, 
	scrollbars : true, 
	sounds : true, 
	trashcan : true
};

/* Inject your workspace */ 
var workspace = Blockly.inject(/* TODO: Add ID of div to inject Blockly into */, options);

/* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */

/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
var workspaceBlocks = document.getElementById("workspaceBlocks"); 

/* Load blocks to workspace. */
Blockly.Xml.domToWorkspace(workspace, workspaceBlocks);