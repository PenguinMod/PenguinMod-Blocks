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


Blockly.Blocks['operators_expandablejoininputs'] = {
  /**
   * pm: Block for joining strings together (determined by user)
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
    this.inputs_ = 2;
    if (this.isInFlyout) {
      for (let i = 0; i < this.inputs_; i++) {
        const input = this.appendValueInput(`INPUT${i + 1}`);
        this.fillInBlock(input.connection, i);
      }
    }
  },

  fillInBlock: function (connection, index) {
    if (connection.sourceBlock_.isInsertionMarker_) return;
    const block = this.workspace.newBlock('text');
    const text = this.messageList[index];
    block.setFieldValue(text ? text : "...", "TEXT");
    block.setShadow(true);
    block.initSvg();
    block.render(true);
    block.outputConnection.connect(connection);
  },

  mutationToDom: function () {
    // on save
    const container = document.createElement("mutation");
    let number = Number(this.inputs_);
    if (isNaN(number)) number = 1;
    container.setAttribute("inputcount", String(number));
    return container;
  },

  domToMutation: function (xmlElement) {
    // on load
    const inputCount = Number(xmlElement.getAttribute("inputcount"));
    this.inputs_ = isNaN(inputCount) ? 0 : inputCount;
    for (let i = 0; i < this.inputs_; i++) {
      const input = this.appendValueInput(`INPUT${i + 1}`);
      this.fillInBlock(input.connection, i);
    }
    queueMicrotask(() => {
      const connections = this.getConnections_();
      for (let i = 1; i < connections.length; i++) {
        const block = connections[i].targetBlock();
        if (!block) continue;
        if (!block.category_ && !block.isShadow()) block.dispose();
      }
    });
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
      this.fillInBlock(newInput.connection, number - 1);
    } else if (this.inputs_ > 1) {
      const number = this.inputs_;
      this.removeInput(`INPUT${number}`);
      this.inputs_--;
    }
    this.initSvg();
    if (this.rendered) this.render();

    var newMutation = Blockly.Xml.domToText(this.mutationToDom());
    Blockly.Events.fire(new Blockly.Events.BlockChange(this,
      'mutation', null, oldMutation, newMutation));
    Blockly.Events.setGroup(false);
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
