'use strict';

goog.provide('Blockly.Blocks.liveTests');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['operator_expandableBool'] = {
  /**
   * pm: Block for performing multiple truth operations (determined by user)
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": '%1 %2',
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
      "extensions": ["colours_operators", "output_boolean"]
    });

    this.inputs_ = 0;
  },

  // EDIT THIS IN https://github.com/PenguinMod/penguinmod.github.io/blob/develop/src/addons/addons/editor-tweaks/userscript.js#L105
  fillInBlock: Blockly.scratchBlocksUtils.generateMutatorShadow,
  menuGenerator: function () {
    const dropdown = new Blockly.FieldDropdown(function () {
      return [
        ["and", "a"], ["or", "o"], ["xor", "x"],
        ["nand", "n"], ["nor", "N"], ["xnor", "X"]
      ];
    });
    const ogSetValue = dropdown.setValue;
    dropdown.setValue = function (value, omitMutation) {
      const srcBlock = this.sourceBlock_;
      let oldMutation;
      if (!omitMutation) oldMutation = Blockly.Xml.domToText(srcBlock.mutationToDom());

      ogSetValue.call(this, value);
      if (!omitMutation) {
        const newMutation = Blockly.Xml.domToText(srcBlock.mutationToDom());
        Blockly.Events.fire(new Blockly.Events.BlockChange(
          srcBlock, 'mutation', null, oldMutation, newMutation
        ));
      }
    }
    return dropdown;
  },

  mutationToDom: function () {
    // on save
    const container = document.createElement("mutation");
    container.setAttribute("inputcount", String(this.inputs_));
    const operations = [];
    for (var i = 1; i < this.inputList.length; i++) {
      const input = this.inputList[i];
      if (input.fieldRow[0]) operations.push(input.fieldRow[0].getValue());
    }

    container.setAttribute("menuvalues", operations.join(""));
    container.setAttribute("optimize", operations.every((o) => operations[0] === o));
    return container;
  },
  domToMutation: function (xmlElement) {
    // on load
    const inputCount = Number(xmlElement.getAttribute("inputcount"));
    const menuValues = String(xmlElement.getAttribute("menuvalues"));
    this.inputs_ = isNaN(inputCount) ? 0 : inputCount;

    let repeatPreventer = false;
    if (this.inputList.length > 1) {
      // this was a control z action

      if (this.inputList.length - 1 === menuValues.length) repeatPreventer = true;
      else {
        const lastInput = this.inputList[this.inputList.length - 1];
        const innerBlock = lastInput.connection.targetBlock();
        if (innerBlock.isShadow()) innerBlock.dispose();
        this.removeInput(lastInput.name);
        return;
      }
    }

    for (let i = 0; i < this.inputs_; i++) {
      if (repeatPreventer && this.getInput(`BOOL${i + 1}`)) continue;

      const input = this.appendValueInput(`BOOL${i + 1}`).setCheck("Boolean");
      if (i > 0) {
        const menu = input.appendField(this.menuGenerator());
        menu.fieldRow[0].setValue(menuValues[i - 1] ? menuValues[i - 1] : "a", true);
      }
      // vm will automatically replace empty inputs with saved shadows
    }
  },

  onExpandableButtonClicked_: function (isAdding) {
    // Create an event group to keep field value and mutator in sync
    // Return null at the end because setValue is called here already.
    Blockly.Events.setGroup(true);
    var oldMutation = Blockly.Xml.domToText(this.mutationToDom());
    if (isAdding) {
      this.inputs_++;
      const number = this.inputs_;
      const newInput = this.appendValueInput(`BOOL${number}`).setCheck("Boolean");
      if (!this.isInsertionMarker_) {
        newInput.init();
        newInput.initOutlinePath(this.svgGroup_);
        newInput.outlinePath.setAttribute('fill', this.getColourTertiary());
      }
      newInput.appendField(this.menuGenerator());
      this.fillInBlock(newInput.connection, "checkbox");
    } else if (this.inputs_ > 2) {
      const number = this.inputs_;
      this.removeInput(`BOOL${number}`);
      this.inputs_--;
    }
    this.initSvg();
    if (this.rendered) this.render();

    const newMutation = Blockly.Xml.domToText(this.mutationToDom());
    Blockly.Events.fire(new Blockly.Events.BlockChange(
      this, 'mutation', null, oldMutation, newMutation
    ));
    Blockly.Events.setGroup(false);
  }
};

Blockly.Blocks['operator_expandableCompare'] = {
  /**
   * pm: Block for performing multiple comparisons (determined by user)
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": '%1 %2',
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
      "extensions": ["colours_operators", "output_boolean"]
    });

    this.inputs_ = 0;
  },

  fillInBlock: Blockly.scratchBlocksUtils.generateMutatorShadow,
  menuGenerator: function () {
    const dropdown = new Blockly.FieldDropdown(function () {
      return [
        [">", "m"], ["≥", "M"], ["<", "l"], ["≤", "L"],
        ["=", "e"], ["===", "E"], ["≠", "n"]
      ];
    });
    const ogSetValue = dropdown.setValue;
    dropdown.setValue = function (value, omitMutation) {
      const srcBlock = this.sourceBlock_;
      let oldMutation;
      if (!omitMutation) oldMutation = Blockly.Xml.domToText(srcBlock.mutationToDom());

      ogSetValue.call(this, value);
      if (!omitMutation) {
        const newMutation = Blockly.Xml.domToText(srcBlock.mutationToDom());
        Blockly.Events.fire(new Blockly.Events.BlockChange(
          srcBlock, 'mutation', null, oldMutation, newMutation
        ));
      }
    }
    return dropdown;
  },

  mutationToDom: function () {
    // on save
    const container = document.createElement("mutation");
    container.setAttribute("inputcount", String(this.inputs_));
    let orderedOperations = "";
    for (var i = 1; i < this.inputList.length; i++) {
      const input = this.inputList[i];
      if (input.fieldRow[0]) orderedOperations += input.fieldRow[0].getValue();
    }
    container.setAttribute("menuvalues", orderedOperations);
    return container;
  },
  domToMutation: function (xmlElement) {
    // on load
    const inputCount = Number(xmlElement.getAttribute("inputcount"));
    const menuValues = String(xmlElement.getAttribute("menuvalues"));
    this.inputs_ = isNaN(inputCount) ? 0 : inputCount;

    let repeatPreventer = false;
    if (this.inputList.length > 1) {
      // this was a control z action

      if (this.inputList.length - 1 === menuValues.length) repeatPreventer = true;
      else {
        const lastInput = this.inputList[this.inputList.length - 1];
        const innerBlock = lastInput.connection.targetBlock();
        if (innerBlock.isShadow()) innerBlock.dispose();
        this.removeInput(lastInput.name);
        return;
      }
    }

    for (let i = 0; i < this.inputs_; i++) {
      if (repeatPreventer && this.getInput(`INPUT${i + 1}`)) continue;

      const input = this.appendValueInput(`INPUT${i + 1}`);
      if (i > 0) {
        const menu = input.appendField(this.menuGenerator());
        menu.fieldRow[0].setValue(menuValues[i - 1] ? menuValues[i - 1] : "m", true);
      }
      // vm will automatically replace2 empty inputs with saved shadows
    }
  },

  onExpandableButtonClicked_: function (isAdding) {
    // Create an event group to keep field value and mutator in sync
    // Return null at the end because setValue is called here already.
    Blockly.Events.setGroup(true);
    var oldMutation = Blockly.Xml.domToText(this.mutationToDom());
    if (isAdding) {
      this.inputs_++;
      const number = this.inputs_;
      const newInput = this.appendValueInput(`INPUT${number}`);
      newInput.appendField(this.menuGenerator());
      this.fillInBlock(newInput.connection, "text", "", "TEXT");
    } else if (this.inputs_ > 2) {
      const number = this.inputs_;
      this.removeInput(`INPUT${number}`);
      this.inputs_--;
    }
    this.initSvg();
    if (this.rendered) this.render();

    const newMutation = Blockly.Xml.domToText(this.mutationToDom());
    Blockly.Events.fire(new Blockly.Events.BlockChange(
      this, 'mutation', null, oldMutation, newMutation
    ));
    Blockly.Events.setGroup(false);
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
    div.setAttribute("style", `width: 32px; height: 32px; padding: 6px 10px; text-align: center; font-weight: 500; border-radius: 4px; border: solid 1px #00000030;`);
    return div;
  })(),
  (field, input) => {
    /* on init */
    const srcBlock = field.sourceBlock_;

    input.textContent = "alert";
    input.style.width = "max-content";
    input.style.color = srcBlock && srcBlock.textColor ? srcBlock.textColor : "#fff";

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
          "name": "BUTTON",
          "id": "TEST_BUTTON",
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

/* The following are Deprecated, either scrapped or redone */
/**
 * Hidden since this is dangerous to keep in the main
 * toolbox. Its also now in the javascript extension
 * which is built to be safer and more focused on js
 */
Blockly.Blocks['control_javascript_command'] = {
  init: function () {
    this.jsonInit({
      "message0": "javascript %1",
      "args0": [
        {
          "type": "input_value",
          "name": "JS"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};
Blockly.Blocks["operator_javascript_output"] = {
  init: function () {
    this.jsonInit({
      "inputsInline": true,
      "message0": "javascript %1",
      "args0": [
        {
          "type": "input_value",
          "name": "JS"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};
Blockly.Blocks["operator_javascript_boolean"] = {
  init: function () {
    this.jsonInit({
      "inputsInline": true,
      "message0": "javascript %1",
      "args0": [
        {
          "type": "input_value",
          "name": "JS"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};
Blockly.Blocks["event_whenjavascript"] = {
  init: function () {
    this.jsonInit({
      "inputsInline": true,
      "message0": "when javascript %1 === true",
      "args0": [
        {
          "type": "input_value",
          "name": "JS"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

/**
 * Renamed to shear, which is now an effect in looks
 */
Blockly.Blocks['looks_setVertTransform'] = {
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

/* End of Deprecation marker */
