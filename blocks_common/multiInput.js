/**
 * @fileoverview Creates an extendable input that can contain other inputs.
 * @author @lego7set
 */
 
/* This file is really just copy-paste edited version of polygon.js */
 
// https://github.com/lego7set/PenguinMod-Blocks/blob/multiinputblocks/blocks_common/polygon.js
// https://github.com/PenguinMod/PenguinMod-Blocks/blob/2964bbd4ee76f93995b0cc4b06cfe001697ff0d3/core/colours.js#L23
// https://github.com/lego7set/PenguinMod-Blocks/blob/multiinputblocks/blocks_common/text.js
// https://github.com/lego7set/PenguinMod-Blocks/blob/multiinputblocks/core/field_checkbox.js // Make sure to create two new icons similar to this called AddInput and DeleteInput
// https://github.com/lego7set/PenguinMod-Blocks/blob/multiinputblocks/core/field_expandable_add.js
// https://groups.google.com/g/blockly/c/hnhObVXLJw4
// https://github.com/google/blockly/issues/3078
 
goog.provide('Blockly.Blocks.multiInput');
goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
// i actually dont know what else to require

ScratchBlocks.Blocks['multiInput'] = { // i took this from live tests and modified it a little
  /**
   * @this Blockly.Block
   */
  init: function () {
    /*this.jsonInit({
      "message0": '%1 %2',
      "args0": [
        {
          "type": "field_expandable_remove",
          "name": "REMOVE"
        },
        {
          "type": "field_expandable_add",
          "name": "ADD'
        }
      ],
    });*/
    //console.log('multiInput init')
    this.expanded = false;
    this.extendable = true;
    this.inputs_ = 0; // It's a multi input, right?
    this.minimumInputs = 1; // okay yeah idk how to initialize inputs so we're just going to leave this at one
    this.color = ScratchBlocks.Colours.operators.primary;
    this.setColour(this.color, this.color, this.color);
    this.setOutput(true, 'multiInput')
    this.setOutputShape(ScratchBlocks.OUTPUT_SHAPE_SQUARE);
    this.blocks = [];
    
    this.addInputColor = '#00FF00'; // idk how to do this
    this.delInputColor = '#FF0000';
    
    this.isMutated = false;
    this.defaultValue = '';
    
    const remove = new ScratchBlocks.FieldExpandableRemove();
    const add = new ScratchBlocks.FieldExpandableAdd();
    this.appendDummyInput('REMOVE')
      .appendField(remove, 'remove');
    this.appendDummyInput('ADD')
      .appendField(add, 'add')
    const thisBlock = this;
    const button = new ScratchBlocks.FieldCheckbox(
      this.expanded, 
      newState => {
        thisBlock.setExpanded(newState)
        return newState
      }
    )
    const updateWidth = button.updateWidth.bind(button);
    button.updateWidth = function() {
      updateWidth();
      if (this.size_.width === -10) this.size_.width = 15;
    }
    this.appendDummyInput('buttonContainer').appendField(button, 'button');
    // this.lastMutation_ = null;
    // im dumb idk how to create initial inputs.
    //this.initInputs();
  },
  isDefault: function() {
    // Used by mutation to dom cuz im dumb
    return this.isMutated === false
  },
  initInputs: function() {
    const inputs = this.inputs_;
    //this.inputs_ = 0;
    for (let i = 0; i < inputs; i++) {
      const input = this.appendValueInput(`INPUT${i}`);
      const connection = input.connection;
      const defaultBlock = this.workspace.newBlock('text');
      defaultBlock.setFieldValue(this.defaultValue, 'TEXT');
      defaultBlock.setShadow(true);
      if (this.expanded) {
        defaultBlock.initSvg();
        defaultBlock.render(false);
      }
      defaultBlock.outputConnection.connect(connection);
      input.setVisible(this.expanded);
      /*console.log(this.inputs_, i, this.getInput(`INPUT${i}`))
      const input = this.getInput(`INPUT${i}`) || this.appendValueInput(`INPUT${i}`);
      console.log(input, i)
      const connection = input.connection;
      const defaultBlock = this.workspace.newBlock('text');
      //debugger;
      defaultBlock.setFieldValue('test', 'TEXT');
      defaultBlock.setShadow(true);
      defaultBlock.outputConnection.connect(connection);
      defaultBlock.initSvg();
      defaultBlock.render(false);
      
      input.setVisible(this.expanded);
      if (this.blocks[i] && !this.blocks[i].outputConnection.targetConnection) {
        // Get rid of random blocks that were spawned by this block.
        this.blocks[i].dispose()
        delete this.blocks[i]
      }
      if (this.blocks.indexOf(defaultBlock) === -1) {
        this.blocks[i] = defaultBlock;
      }
      // console.log(this.inputs_);
      // this.updateIfNeeded_();*/
    }
    this.rerenderChildBlocks();
  },
  setExpanded: function(bool) {
    this.expanded = bool;
    for (let i = 0; i < this.inputs_; i++) {
      const input = this.getInput(`INPUT${i}`);
      //console.log(input, i, this.inputs_);
      if (!input) continue;
      input.setVisible(bool);
    }
    this.initSvg();
    this.rerenderChildBlocks();
    this.render(true);
  },
  rerenderChildBlocks: function() {
    const renderInputs = (block) => {
      const children = block.childBlocks_
      // once we hit a bottom block, rerender the whole tree
      if (children.length) block.render(true)
      for (var i = 0, child; child = children[i]; i++) {
        child.render(false)
        renderInputs(child)
      }
    }
    renderInputs(this)
  },
  mutationToDom: function () {
    // on save
    //console.log('mutationToDom');
    const container = document.createElement('mutation');
    //if (this.isDefault()) return container; // not using this anymore cuz idk if i need it
    let number = Number(this.inputs_);
    if (isNaN(number)) number = 0;
    container.setAttribute('inputcount', String(number));
    container.setAttribute('expanded', JSON.stringify(this.expanded));
    container.setAttribute('extendable', JSON.stringify(this.extendable));
    container.setAttribute('minimuminputs', JSON.stringify(this.minimumInputs));
    container.setAttribute('color', JSON.stringify(this.color));
    container.setAttribute('addcolor', JSON.stringify(this.addInputColor));
    container.setAttribute('delcolor', JSON.stringify(this.delInputColor));
    container.setAttribute('defaultValue', JSON.stringify(this.defaultValue));
    // console.log(this.inputs_);
    return container;
  },

  domToMutation: function (xmlElement) {
    // on load
    // console.log('domToMutation');
    // console.log(xmlElement)
    this.isMutated = true;
    const inputCount = Number(xmlElement.getAttribute('inputcount'));
    // console.log(inputCount);
    this.inputs_ = isNaN(inputCount) ? 0 : inputCount;
    for (let i = 0; i < this.inputs_; i++) {
      if (!this.getInput(`INPUT${i}`)) {
        this.appendValueInput(`INPUT${i}`) // so that blocks dont get removed when duplicating.
      }
    }
    const newExpanded = JSON.parse(xmlElement.getAttribute('expanded') || 'false');
    this.setExpanded(newExpanded)
    this.setFieldValue(newExpanded, 'button')
    
    const color = JSON.parse(xmlElement.getAttribute('color') || `"${ScratchBlocks.Colours.operators.primary}"`);
    if (typeof color === 'string' && color.length === 7) {
      //console.log(xmlElement.getAttribute('color'), this.color)
      if (typeof this.color === 'string') {
       //console.log('change colour', this.color)
       this.setColour(this.color, this.color, this.color); 
      }
    }
    const defaultValue = JSON.parse(xmlElement.getAttribute('defaultValue') || '""')
    if (typeof defaultValue === "string") {
      this.defaultValue = defaultValue;
    }
    
    // console.log(this.inputs_);
    //this.initInputs();
  },

  onExpandableButtonClicked_: function (isAdding) {
    if (!this.extendable) return;
    // Create an event group to keep field value and mutator in sync
    // Return null at the end because setValue is called here already.
    ScratchBlocks.Events.setGroup(true);
    var oldMutation = ScratchBlocks.Xml.domToText(this.mutationToDom());
    if (!isAdding) {
      if (!(this.inputs_ < this.minimumInputs)) {
        const number = this.inputs_;
      this.removeInput(`INPUT${number}`);
      this.inputs_--;
      if (this.inputs_ < 0) {
        this.inputs_ = 0;
      } // imagine setting minimum inputs to -1
      // console.log(this.inputs_);
      // this.updateIfNeeded_();
      }
    } else {
      const number = this.inputs_++;
      const input = this.appendValueInput(`INPUT${number}`);
      const connection = input.connection;
      const defaultBlock = this.workspace.newBlock("text");
      defaultBlock.setFieldValue(this.defaultValue, "TEXT");
      defaultBlock.setShadow(true);
      defaultBlock.outputConnection.connect(connection);
      
      defaultBlock.initSvg();
      defaultBlock.render(false);
      input.setVisible(this.expanded);
      // console.log(this.inputs_);
      // this.updateIfNeeded_();
    }
    this.initSvg();
    if (this.rendered) {
      this.render();
    }
    //this.initInputs();
    var newMutation = ScratchBlocks.Xml.domToText(this.mutationToDom());
    ScratchBlocks.Events.fire(new ScratchBlocks.Events.BlockChange(this,
      'mutation', null, oldMutation, newMutation));
    ScratchBlocks.Events.setGroup(false);
  }
};
