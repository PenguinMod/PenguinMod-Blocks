/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Blocks.operators');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['operator_add'] = {
  /**
   * Block for adding two numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_ADD,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_subtract'] = {
  /**
   * Block for subtracting two numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_SUBTRACT,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_multiply'] = {
  /**
   * Block for multiplying two numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_MULTIPLY,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_divide'] = {
  /**
   * Block for dividing two numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_DIVIDE,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_expandableMath'] = {
  /**
   * pm: Block for performing multiple math operations (determined by user)
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
      "extensions": ["colours_operators", "output_number"]
    });

    this.inputs_ = 0;
    this.expandable_ = true;
  },

  fillInBlock: Blockly.scratchBlocksUtils.generateMutatorShadow,
  menuGenerator: function () {
    const dropdown = new Blockly.FieldDropdown(function () {
      return [
        ["+", "+"], ["-", "-"],
        ["*", "*"], ["/", "/"],
        ["^", "^"],
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
      if (repeatPreventer && this.getInput(`NUM${i + 1}`)) continue;

      const input = this.appendValueInput(`NUM${i + 1}`);
      if (i > 0) {
        const menu = input.appendField(this.menuGenerator());
        menu.fieldRow[0].setValue(menuValues[i - 1] ? menuValues[i - 1] : "+", true);
      }
      // vm will automatically replace empty inputs with saved shadows
    }
  },

  onExpandableButtonClicked_: function (isAdding) {
    // Create an event group to keep field value and mutator in sync
    // Return null at the end because setValue is called here already.
    Blockly.Events.expandableClick = true;
    Blockly.Events.setGroup(true);
    var oldMutation = Blockly.Xml.domToText(this.mutationToDom());
    if (isAdding) {
      this.inputs_++;
      const number = this.inputs_;
      const newInput = this.appendValueInput(`NUM${number}`);
      newInput.appendField(this.menuGenerator());
      this.fillInBlock(newInput.connection, "math_number");
    } else if (this.inputs_ > 1) {
      const number = this.inputs_;
      this.removeInput(`NUM${number}`);
      this.inputs_--;
    }
    this.initSvg();
    if (this.rendered) this.render();

    const newMutation = Blockly.Xml.domToText(this.mutationToDom());
    Blockly.Events.fire(new Blockly.Events.BlockChange(
      this, 'mutation', null, oldMutation, newMutation
    ));
    Blockly.Events.setGroup(false);
    Blockly.Events.expandableClick = false;
  }
};

Blockly.Blocks['operator_random'] = {
  /**
   * Block for picking a random number.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_RANDOM,
      "args0": [
        {
          "type": "input_value",
          "name": "FROM"
        },
        {
          "type": "input_value",
          "name": "TO"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_lt'] = {
  /**
   * Block for less than comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_LT,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1"
        },
        {
          "type": "input_value",
          "name": "OPERAND2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_equals'] = {
  /**
   * Block for equals comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_EQUALS,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1"
        },
        {
          "type": "input_value",
          "name": "OPERAND2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_gt'] = {
  /**
   * Block for greater than comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_GT,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1"
        },
        {
          "type": "input_value",
          "name": "OPERAND2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_gtorequal'] = {
  /**
   * pm: Block for greater than or equal comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 ≥ %2",
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1"
        },
        {
          "type": "input_value",
          "name": "OPERAND2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_ltorequal'] = {
  /**
   * pm: Block for less than or equal comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 ≤ %2",
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1"
        },
        {
          "type": "input_value",
          "name": "OPERAND2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_notequal'] = {
  /**
   * pm: Block for not equal comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 ≠ %2",
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1"
        },
        {
          "type": "input_value",
          "name": "OPERAND2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_and'] = {
  /**
   * Block for "and" boolean comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_AND,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1",
          "check": "Boolean"
        },
        {
          "type": "input_value",
          "name": "OPERAND2",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_nand'] = {
  /**
   * pm: Block for "nand" boolean comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 nand %2",
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1",
          "check": "Boolean"
        },
        {
          "type": "input_value",
          "name": "OPERAND2",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};
Blockly.Blocks['operator_nor'] = {
  /**
   * pm: Block for "nor" boolean comparator.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1 nor %2",
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1",
          "check": "Boolean"
        },
        {
          "type": "input_value",
          "name": "OPERAND2",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};
Blockly.Blocks['operator_xor'] = {
  /**
   * pm: Block for "xor" boolean comparator.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1 xor %2",
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1",
          "check": "Boolean"
        },
        {
          "type": "input_value",
          "name": "OPERAND2",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};
Blockly.Blocks['operator_xnor'] = {
  /**
   * pm: Block for "nor" boolean comparator.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1 xnor %2",
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1",
          "check": "Boolean"
        },
        {
          "type": "input_value",
          "name": "OPERAND2",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_or'] = {
  /**
   * Block for "or" boolean comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_OR,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND1",
          "check": "Boolean"
        },
        {
          "type": "input_value",
          "name": "OPERAND2",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_not'] = {
  /**
   * Block for "not" unary boolean operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_NOT,
      "args0": [
        {
          "type": "input_value",
          "name": "OPERAND",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};


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
    this.expandable_ = true;
  },

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
    Blockly.Events.expandableClick = true;
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
    Blockly.Events.expandableClick = false;
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
    this.expandable_ = true;
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
      // vm will automatically replace empty inputs with saved shadows
    }
  },

  onExpandableButtonClicked_: function (isAdding) {
    // Create an event group to keep field value and mutator in sync
    // Return null at the end because setValue is called here already.
    Blockly.Events.setGroup(true);
    Blockly.Events.expandableClick = true;
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
    Blockly.Events.expandableClick = false;
  }
};

Blockly.Blocks['operator_join'] = {
  /**
   * Block for string join operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_JOIN,
      "args0": [
        {
          "type": "input_value",
          "name": "STRING1"
        },
        {
          "type": "input_value",
          "name": "STRING2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks['operator_join3'] = {
  /**
   * pm: Block for joining 3 strings together.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_JOIN3,
      "args0": [
        {
          "type": "input_value",
          "name": "STRING1"
        },
        {
          "type": "input_value",
          "name": "STRING2"
        },
        {
          "type": "input_value",
          "name": "STRING3"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks['operator_expandablejoininputs'] = {
  /**
   * pm: Block for joining n number of strings together
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

    this.messageList = ["apple", "banana", "pear", "orange", "mango", "strawberry", "pineapple", "grape", "kiwi"];
    this.inputs_ = 0;
    this.expandable_ = true;
  },

  fillInBlock: Blockly.scratchBlocksUtils.generateMutatorShadow,

  mutationToDom: function () {
    // on save
    const container = document.createElement("mutation");
    container.setAttribute("inputcount", String(this.inputs_));
    return container;
  },
  domToMutation: function (xmlElement) {
    // on load
    const inputCount = Number(xmlElement.getAttribute("inputcount"));
    if (this.inputList.length > 1) {
      // this was a control z action

      if (this.inputs_ > inputCount) {
        const lastInput = this.inputList[this.inputList.length - 1];
        const innerBlock = lastInput.connection.targetBlock();
        if (innerBlock.isShadow()) innerBlock.dispose();
        this.removeInput(lastInput.name);
      }
    }

    this.inputs_ = isNaN(inputCount) ? 0 : inputCount;
    for (let i = 0; i < this.inputs_; i++) {
      // vm will automatically replace empty inputs with saved shadows
      if (!this.getInput(`INPUT${i + 1}`)) this.appendValueInput(`INPUT${i + 1}`);
    }
  },

  onExpandableButtonClicked_: function (isAdding) {
    // Create an event group to keep field value and mutator in sync
    // Return null at the end because setValue is called here already.
    Blockly.Events.setGroup(true);
    Blockly.Events.expandableClick = true;
    var oldMutation = Blockly.Xml.domToText(this.mutationToDom());
    if (isAdding) {
      this.inputs_++;
      const number = this.inputs_;
      const newInput = this.appendValueInput(`INPUT${number}`);
      const text = this.messageList[number - 1];
      this.fillInBlock(newInput.connection, "text",  text ? text : "...", "TEXT");
    } else if (this.inputs_ > 1) {
      this.removeInput(`INPUT${this.inputs_}`);
      this.inputs_--;
    }
    this.initSvg();
    if (this.rendered) this.render();

    var newMutation = Blockly.Xml.domToText(this.mutationToDom());
    Blockly.Events.fire(new Blockly.Events.BlockChange(
      this, 'mutation', null, oldMutation, newMutation
    ));
    Blockly.Events.setGroup(false);
    Blockly.Events.expandableClick = false;
  }
};

Blockly.Blocks['operator_letter_of'] = {
  /**
   * Block for "letter _ of _" operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_LETTEROF,
      "args0": [
        {
          "type": "input_value",
          "name": "LETTER"
        },
        {
          "type": "input_value",
          "name": "STRING"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks['operator_length'] = {
  /**
   * Block for string length operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_LENGTH,
      "args0": [
        {
          "type": "input_value",
          "name": "STRING"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks['operator_contains'] = {
  /**
   * Block for _ contains _ operator
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_CONTAINS,
      "args0": [
        {
          "type": "input_value",
          "name": "STRING1"
        },
        {
          "type": "input_value",
          "name": "STRING2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks['operator_mod'] = {
  /**
   * Block for mod two numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_MOD,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_round'] = {
  /**
   * Block for rounding a numbers.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_ROUND,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operator_mathop'] = {
  /**
   * Block for "advanced" math ops on a number.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_MATHOP,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OPERATOR",
          "options": [
            [Blockly.Msg.OPERATORS_MATHOP_ABS, 'abs'],
            [Blockly.Msg.OPERATORS_MATHOP_FLOOR, 'floor'],
            [Blockly.Msg.OPERATORS_MATHOP_CEILING, 'ceiling'],
            ['sign', 'sign'],
            [Blockly.Msg.OPERATORS_MATHOP_SQRT, 'sqrt'],
            [Blockly.Msg.OPERATORS_MATHOP_SIN, 'sin'],
            [Blockly.Msg.OPERATORS_MATHOP_COS, 'cos'],
            [Blockly.Msg.OPERATORS_MATHOP_TAN, 'tan'],
            [Blockly.Msg.OPERATORS_MATHOP_ASIN, 'asin'],
            [Blockly.Msg.OPERATORS_MATHOP_ACOS, 'acos'],
            [Blockly.Msg.OPERATORS_MATHOP_ATAN, 'atan'],
            [Blockly.Msg.OPERATORS_MATHOP_LN, 'ln'],
            [Blockly.Msg.OPERATORS_MATHOP_LOG, 'log'],
            ['log2', 'log2'],
            [Blockly.Msg.OPERATORS_MATHOP_EEXP, 'e ^'],
            [Blockly.Msg.OPERATORS_MATHOP_10EXP, '10 ^']
          ]
        },
        {
          "type": "input_value",
          "name": "NUM"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};
Blockly.Blocks['operator_advlog'] = {
  /**
   * Block for better use of logarithm
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_ADVLOG,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1",
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks["operator_regexmatch"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "match %1 with regex %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "text"
        },
        {
          "type": "input_value",
          "name": "reg"
        },
        {
          "type": "input_value",
          "name": "regrule"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks["operator_replaceAll"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "in %1 replace all %2 with %3",
      "args0": [
        {
          "type": "input_value",
          "name": "text"
        },
        {
          "type": "input_value",
          "name": "term"
        },
        {
          "type": "input_value",
          "name": "res"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks["operator_replaceFirst"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "in %1 replace first %2 with %3",
      "args0": [
        {
          "type": "input_value",
          "name": "text"
        },
        {
          "type": "input_value",
          "name": "term"
        },
        {
          "type": "input_value",
          "name": "res"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks["operator_getLettersFromIndexToIndexInText"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "letters from %1 up to before %2 in %3",
      "args0": [
        {
          "type": "input_value",
          "name": "INDEX1"
        },
        {
          "type": "input_value",
          "name": "INDEX2"
        },
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};


Blockly.Blocks["operator_getLettersFromIndexToIndexInTextFixed"] = {
  /**
   * pm: Duplicate of operator_getLettersFromIndexToIndexInText to prevent breaking old projects.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": Blockly.Msg.OPERATORS_LETTERSFROMTOIN,
      "args0": [
        {
          "type": "input_value",
          "name": "INDEX1"
        },
        {
          "type": "input_value",
          "name": "INDEX2"
        },
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks["operator_readLineInMultilineText"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "read line %1 in %2",
      "args0": [
        {
          "type": "input_value",
          "name": "LINE"
        },
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks["operator_newLine"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "new line",
      "args0": [],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks["operator_tabCharacter"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "tab character",
      "args0": [],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks["operator_stringify"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "%1",
      "args0": [
        {
          "type": "input_value",
          "name": "ONE"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks["operator_boolify"] = {
  init: function () {
    this.jsonInit({
      "inputsInline": true,
      "message0": "%1",
      "args0": [
        {
          "type": "input_value",
          "name": "ONE"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks["operator_character_to_code"] = {
  init: function () {
    this.jsonInit({
      "inputsInline": true,
      "message0": "character %1 to id",
      "args0": [
        {
          "type": "input_value",
          "name": "ONE"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks["operator_code_to_character"] = {
  init: function () {
    this.jsonInit({
      "inputsInline": true,
      "message0": "id %1 to character",
      "args0": [
        {
          "type": "input_value",
          "name": "ONE"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks["operator_lerpFunc"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "interpolate %1 to %2 by %3",
      "args0": [
        {
          "type": "input_value",
          "name": "ONE"
        },
        {
          "type": "input_value",
          "name": "TWO"
        },
        {
          "type": "input_value",
          "name": "AMOUNT"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks["operator_advMath"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "ONE"
        },
        {
          "type": "field_dropdown",
          "name": "OPTION",
          "options": [
            ["^", "^"],
            ["root", "root"],
            ["log", "log"]
          ]
        },
        {
          "type": "input_value",
          "name": "TWO"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks["operator_advMathExpanded"] = {
  /**
   * pm: Duplicate of operator_advMath to prevent breaking old projects.
   * Updated to split power and root + log, while also allowing extra params for them
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "%1 * %2 %3 %4",
      "args0": [
        {
          "type": "input_value",
          "name": "ONE"
        },
        {
          "type": "input_value",
          "name": "TWO"
        },
        {
          "type": "field_dropdown",
          "name": "OPTION",
          "options": [
            ["root", "root"],
            ["log", "log"]
          ]
        },
        {
          "type": "input_value",
          "name": "THREE"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};
Blockly.Blocks['operator_power'] = {
  /**
   * pm: Block for getting a ^ b.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 ^ %2",
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks["operator_constrainnumber"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "constrain %1 min %2 max %3",
      "args0": [
        {
          "type": "input_value",
          "name": "inp"
        },
        {
          "type": "input_value",
          "name": "min"
        },
        {
          "type": "input_value",
          "name": "max"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks["operator_trueBoolean"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "true",
      "args0": [],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks["operator_falseBoolean"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "false",
      "args0": [],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks["operator_randomBoolean"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "random",
      "args0": [],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks["operator_indexOfTextInText"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "index of %1 in %2",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT1"
        },
        {
          "type": "input_value",
          "name": "TEXT2"
        }
      ],
      "category": Blockly.Categories.operator,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks["operator_lastIndexOfTextInText"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "last index of %1 in %2",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT1"
        },
        {
          "type": "input_value",
          "name": "TEXT2"
        }
      ],
      "category": Blockly.Categories.operator,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks["operator_countAppearTimes"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "amount of times %1 appears in %2",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT1"
        },
        {
          "type": "input_value",
          "name": "TEXT2"
        }
      ],
      "category": Blockly.Categories.operator,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks["operator_textIncludesLetterFrom"] = {
  init: function () {
    this.jsonInit({
      "inputsInline": true,
      "message0": "%1 includes a letter from %2?",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT1"
        },
        {
          "type": "input_value",
          "name": "TEXT2"
        }
      ],
      "category": Blockly.Categories.operator,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks["operator_textStartsOrEndsWith"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "%1 %2 with %3?",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT1"
        },
        {
          "type": "field_dropdown",
          "name": "OPTION",
          "options": [
            ["starts", "starts"],
            ["ends", "ends"]
          ]
        },
        {
          "type": "input_value",
          "name": "TEXT2"
        }
      ],
      "category": Blockly.Categories.operator,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};

Blockly.Blocks["operator_toUpperLowerCase"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "%1 to %2",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT"
        },
        {
          "type": "field_dropdown",
          "name": "OPTION",
          "options": [
            ["uppercase", "upper"],
            ["lowercase", "lower"]
          ]
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  }
};

Blockly.Blocks['operator_checkboxBoolean'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_checkbox_original",
          "name": "CHECKBOX"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  }
};
