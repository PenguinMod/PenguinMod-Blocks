'use strict';

goog.provide('Blockly.Blocks.liveTests');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sensing_set_of'] = {
  /**
   * Block to report properties of sprites.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": 'set %1 of %2 to %3',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "PROPERTY",
          "options": [
            [Blockly.Msg.SENSING_OF_XPOSITION, 'x position'],
            [Blockly.Msg.SENSING_OF_YPOSITION, 'y position'],
            [Blockly.Msg.SENSING_OF_DIRECTION, 'direction'],
            [Blockly.Msg.SENSING_OF_COSTUMENUMBER, 'costume #'],
            [Blockly.Msg.SENSING_OF_COSTUMENAME, 'costume name'],
            [Blockly.Msg.SENSING_OF_SIZE, 'size'],
            [Blockly.Msg.SENSING_OF_VOLUME, 'volume'],
            [Blockly.Msg.SENSING_OF_BACKDROPNUMBER, 'backdrop #'],
            [Blockly.Msg.SENSING_OF_BACKDROPNAME, 'backdrop name']
          ]
        },
        {
          "type": "input_value",
          "name": "OBJECT"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_setVertTransform'] = {
  /**
   * Block to report properties of sprites.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": 'skew sprite vertically %1 %',
      "args0": [
        {
          "type": "input_value",
          "name": "PERCENT"
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_setHorizTransform'] = {
  /**
   * Block to report properties of sprites.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": 'skew sprite horizontally %1 %',
      "args0": [
        {
          "type": "input_value",
          "name": "PERCENT"
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['field_textdropdown_test'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_textdropdown",
          "name": "TEXT",
          "options": [
            ['item1', 'item1'],
            ['item2', 'item2'],
            ['item3', 'item3']
          ]
        }
      ],
      "output": "String",
      "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
      "colour": Blockly.Colours.textField,
      "colourSecondary": Blockly.Colours.textField,
      "colourTertiary": Blockly.Colours.textField
    })
  }
}

Blockly.Blocks['motion_mutatorCheckboxTest_checkboxMutatorMenu'] = {
  init: function () {
    this.setInputsInline(false);
    this.setColour("#c1c1c1");
  }
};
Blockly.Blocks['motion_mutatorCheckboxTest'] = {
  /**
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": 'checkbox mutator',
      "args0": [],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
    this.setMutator(new Blockly.Mutator([]));

    this.BORDER_FIELDS = ["ABC", "DEF"];
    this.FIELD_NAMES = ["first", "second"];

    this.inputs_ = [false, false];
  },

  mutationToDom: function () {
    // console.log('mutationToDom', this.inputs_);
    if (!this.inputs_) {
      return null;
    }
    const container = document.createElement("mutation");
    for (let i = 0; i < this.inputs_.length; i++) {
      if (this.inputs_[i]) {
        container.setAttribute(this.BORDER_FIELDS[i], this.inputs_[i]);
      }
    }
    return container;
  },

  domToMutation: function (xmlElement) {
    for (let i = 0; i < this.inputs_.length; i++) {
      this.inputs_[i] = xmlElement.getAttribute(this.BORDER_FIELDS[i].toLowerCase()) == "true";
    }
    // console.log('domToMutation', this.inputs_);
    this.updateShape_();
  },

  decompose: function (workspace) {
    // console.log('decompose');
    const containerBlock = workspace.newBlock('motion_mutatorCheckboxTest_checkboxMutatorMenu');
    for (let i = 0; i < this.inputs_.length; i++) {
      // BaseBlockly.Msg[this.BORDER_FIELDS[i]] = this.FIELD_NAMES[i];
      containerBlock.appendDummyInput()
        // .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(this.FIELD_NAMES[i])
        .appendField(new Blockly.FieldCheckboxOriginal(this.inputs_[i] ? "TRUE" : "FALSE"), this.BORDER_FIELDS[i].toUpperCase());
    }
    containerBlock.initSvg();
    containerBlock.moveBy(4, 22);
    return containerBlock;
  },

  compose: function (containerBlock) {
    // console.log('compose');
    // Set states
    for (let i = 0; i < this.inputs_.length; i++) {
      const field = this.BORDER_FIELDS[i].toUpperCase();
      const value = containerBlock.getFieldValue(field);
      // console.log(value);
      this.inputs_[i] = value == "TRUE";
    }
    this.updateShape_();
  },

  updateShape_: function () {
    // console.log('updateShape_');
    for (let i = 0; i < this.inputs_.length; i++) {
      if ((!this.inputs_[i]) && (this.getInput(this.BORDER_FIELDS[i].toUpperCase()))) {
        this.removeInput(this.BORDER_FIELDS[i].toUpperCase());
      }
    }
    for (let i = 0; i < this.inputs_.length; i++) {
      if ((this.inputs_[i]) && (!(this.getInput(this.BORDER_FIELDS[i].toUpperCase())))) {
        // BaseBlockly.Msg[this.BORDER_FIELDS[i]] = this.FIELD_NAMES[i];
        this.appendValueInput(this.BORDER_FIELDS[i].toUpperCase())
          // .setAlign(Blockly.ALIGN_RIGHT)
          // todo: insert string/number input?
          .appendField(this.FIELD_NAMES[i]);
      }
    }
  }
};

/* custom button field */
Blockly.FieldCustom.registerInput(
  'TEST_BUTTON',
  (() => {
    const div = document.createElement("div");
    div.setAttribute("style", `width: 32px; height: 32px; padding: 6px 10px; border-radius: 4px; border: solid 1.5px #00000030;`);
    return div;
  })(),
  (field, input) => {
    /* on init */
    const srcBlock = field.sourceBlock_;

    input.textContent = "alert";
    input.style.width = "max-content";
    input.style.color = srcBlock.textColor ? srcBlock.textColor : "#fff";

    const properWidth = goog.style.getSize(input).width;
    input.style.width = properWidth + "px";
    input.parentNode.setAttribute("width", properWidth);
    field.size_.width = properWidth;
    srcBlock.render(false);
  },
  () => {
    /* on click */
    alert("wow");
  },
  () => { /* not needed */ }
);
Blockly.Blocks['control_fieldbutton'] = {
  /**
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": 'button %1',
      "args0": [
        {
          "type": "field_customInput",
          "name": "TEST_BUTTON",
          "opcode": "alert"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  },
};

Blockly.Blocks['control_fieldcheckboxoriginal'] = {
  /**
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": 'mm checkbox %1 gagag %2',
      "args0": [
        {
          "type": "field_checkbox_original",
          "name": "BUTTON"
        },
        {
          "type": "field_checkbox_original",
          "name": "BUTT2ON"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_testcolorfieldoriginal'] = {
  /**
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": 'color %1',
      "args0": [
        {
          "type": "field_colour",
          "colour": "#ff0000",
          "name": "COLOR"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_blockduplicatesondrag'] = {
  /**
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": 'duplicate',
      "category": Blockly.Categories.control,
      "canDragDuplicate": true,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_dualblock'] = {
  /**
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": 'dual block',
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement", "output_string"]
    });
  }
};

Blockly.Blocks['operators_expandablejoininputs'] = {
  /**
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": 'join %1 %2',
      "args0": [
        {
          "type": "field_expandable_remove",
          "name": "REMOVE"
        },
        {
          "type": "field_expandable_add",
          "name": "ADD"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });

    this.inputs_ = 0;
    // this.lastMutation_ = null;
  },

  mutationToDom: function () {
    // on save
    // console.log('mutationToDom');
    const container = document.createElement("mutation");
    let number = Number(this.inputs_);
    if (isNaN(number)) number = 0;
    container.setAttribute("INPUTCOUNT", String(number));
    // console.log(this.inputs_);
    return container;
  },

  domToMutation: function (xmlElement) {
    // on load
    // console.log('domToMutation');
    // console.log(xmlElement.getAttribute("INPUTCOUNT"));
    const inputCount = Number(xmlElement.getAttribute("INPUTCOUNT"));
    // console.log(inputCount);
    this.inputs_ = isNaN(inputCount) ? 0 : inputCount;
    // console.log(this.inputs_);
    for (let i = 0; i < this.inputs_; i++) {
      this.appendValueInput(`INPUT${i + 1}`);
    }
  },

  saveExtraState: function() {
    let number = Number(this.inputs_);
    if (isNaN(number)) number = 0;
    return {inputs: number}
  },

  loadExtraState: function(state) {
    this.inputs_ = isNaN(state.inputs) ? 0 : state.inputs;
    for (let i = 0; i < this.inputs_; i++) {
      this.appendValueInput(`INPUT${i + 1}`);
    }
  },

  // updateShape_: function () {
  //   this.lastMutation_ = this.mutationToDom();
  //   console.log('updateShape_');
  //   console.log(this.inputs_);
  //   for (let i = 0; i < this.inputs_; i++) {
  //     this.appendValueInput(`INPUT${i + 1}`);
  //   }
  //   this.updateIfNeeded_();
  // },
  // updateIfNeeded_: function () {
  //   this.initSvg();
  //   if (this.rendered) {
  //     this.render();
  //   }
  //   // manually update because idk why
  //   Blockly.Events.setGroup(true);
  //   var oldMutation = Blockly.Xml.domToText(this.lastMutation_);
  //   var newMutation = Blockly.Xml.domToText(this.mutationToDom());
  //   Blockly.Events.fire(new Blockly.Events.BlockChange(this,
  //     'mutation', null, oldMutation, newMutation));
  //   Blockly.Events.setGroup(false);
  // },

  onExpandableButtonClicked_: function (isAdding) {
    // Create an event group to keep field value and mutator in sync
    // Return null at the end because setValue is called here already.
    Blockly.Events.setGroup(true);
    var oldMutation = Blockly.Xml.domToText(this.mutationToDom());
    if (!isAdding) {
      const number = this.inputs_;
      this.removeInput(`INPUT${number}`);
      this.inputs_--;
      if (this.inputs_ < 0) {
        this.inputs_ = 0;
      }
      // console.log(this.inputs_);
      // this.updateIfNeeded_();
    } else {
      this.inputs_++;
      const number = this.inputs_;
      this.appendValueInput(`INPUT${number}`);
      // console.log(this.inputs_);
      // this.updateIfNeeded_();
    }
    this.initSvg();
    if (this.rendered) {
      this.render();
    }
    var newMutation = Blockly.Xml.domToText(this.mutationToDom());
    Blockly.Events.fire(new Blockly.Events.BlockChange(this,
      'mutation', null, oldMutation, newMutation));
    Blockly.Events.setGroup(false);
  }
};
