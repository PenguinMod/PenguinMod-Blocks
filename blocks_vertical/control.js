/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
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

goog.provide('Blockly.Blocks.control');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['control_forever'] = {
  /**
   * Block for repeat n times (external number).
   * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5eke39
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_forever",
      "message0": Blockly.Msg.CONTROL_FOREVER,
      "message1": "%1", // Statement
      "message2": "%1", // Icon
      "lastDummyAlign2": "RIGHT",
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_end"]
    });
  }
};

Blockly.Blocks['control_repeat'] = {
  /**
   * Block for repeat n times (external number).
   * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#so57n9
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_repeat",
      "message0": Blockly.Msg.CONTROL_REPEAT,
      "message1": "%1", // Statement
      "message2": "%1", // Icon
      "lastDummyAlign2": "RIGHT",
      "args0": [
        {
          "type": "input_value",
          "name": "TIMES"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_repeatForSeconds'] = {
  /**
   * pm: Block to repeat for n seconds (external number).
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_repeat",
      "message0": "repeat for %1 seconds",
      "message1": "%1", // Statement
      "message2": "%1", // Icon
      "lastDummyAlign2": "RIGHT",
      "args0": [
        {
          "type": "input_value",
          "name": "TIMES"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_if'] = {
  /**
   * Block for if-then.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "type": "control_if",
      "message0": Blockly.Msg.CONTROL_IF,
      "message1": "%1", // Statement
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION",
          "check": "Boolean"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_if_else'] = {
  /**
   * Block for if-else.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "type": "control_if_else",
      "message0": Blockly.Msg.CONTROL_IF,
      "message1": "%1",
      "message2": Blockly.Msg.CONTROL_ELSE,
      "message3": "%1",
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION",
          "check": "Boolean"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "args3": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK2"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_stop'] = {
  /**
   * Block for stop all scripts.
   * @this Blockly.Block
   */
  init: function() {
    var ALL_SCRIPTS = 'all';
    var THIS_SCRIPT = 'this script';
    var OTHER_SCRIPTS = 'other scripts in sprite';
    var stopDropdown = new Blockly.FieldDropdown(function() {
      if (this.sourceBlock_ &&
          this.sourceBlock_.nextConnection &&
          this.sourceBlock_.nextConnection.isConnected()) {
        return [
          [Blockly.Msg.CONTROL_STOP_OTHER, OTHER_SCRIPTS]
        ];
      }
      return [[Blockly.Msg.CONTROL_STOP_ALL, ALL_SCRIPTS],
        [Blockly.Msg.CONTROL_STOP_THIS, THIS_SCRIPT],
        [Blockly.Msg.CONTROL_STOP_OTHER, OTHER_SCRIPTS]
      ];
    }, function(option) {
      // Create an event group to keep field value and mutator in sync
      // Return null at the end because setValue is called here already.
      Blockly.Events.setGroup(true);
      var oldMutation = Blockly.Xml.domToText(this.sourceBlock_.mutationToDom());
      this.sourceBlock_.setNextStatement(option == OTHER_SCRIPTS);
      var newMutation = Blockly.Xml.domToText(this.sourceBlock_.mutationToDom());
      Blockly.Events.fire(new Blockly.Events.BlockChange(this.sourceBlock_,
          'mutation', null, oldMutation, newMutation));
      this.setValue(option);
      Blockly.Events.setGroup(false);
      return null;
    });
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROL_STOP)
        .appendField(stopDropdown, 'STOP_OPTION');
    this.setCategory(Blockly.Categories.control);
    this.setColour(Blockly.Colours.control.primary,
        Blockly.Colours.control.secondary,
        Blockly.Colours.control.tertiary
    );
    this.setPreviousStatement(true);
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('hasnext', this.nextConnection != null);
    return container;
  },
  domToMutation: function(xmlElement) {
    var hasNext = (xmlElement.getAttribute('hasnext') == 'true');
    this.setNextStatement(hasNext);
  }
};

Blockly.Blocks['control_wait'] = {
  /**
   * Block to wait (pause) stack.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_wait",
      "message0": Blockly.Msg.CONTROL_WAIT,
      "args0": [
        {
          "type": "input_value",
          "name": "DURATION"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_waitsecondsoruntil'] = {
  /**
   * pm: Block to wait (pause) stack for a specified amount of seconds, or until a condition is met.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_waitsecondsoruntil",
      "message0": "wait %1 seconds or until %2",
      "args0": [
        {
          "type": "input_value",
          "name": "DURATION"
        },
        {
          "type": "input_value",
          "name": "CONDITION",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_waittick'] = {
  /**
   * pm: Block to wait (pause) stack until the next runtime tick.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_waittick",
      "message0": "wait until next tick",
      "args0": [],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_wait_until'] = {
  /**
   * Block to wait until a condition becomes true.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_WAITUNTIL,
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION",
          "check": "Boolean"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_repeat_until'] = {
  /**
   * Block to repeat until a condition becomes true.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_REPEATUNTIL,
      "message1": "%1",
      "message2": "%1",
      "lastDummyAlign2": "RIGHT",
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION",
          "check": "Boolean"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_while'] = {
  /**
   * pm: Block to repeat until a condition becomes false.
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_WHILE,
      "message1": "%1",
      "message2": "%1",
      "lastDummyAlign2": "RIGHT",
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION",
          "check": "Boolean"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_for_each'] = {
  /**
   * pm: Block for for-each loops.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "type": "control_for_each",
      "message0": Blockly.Msg.CONTROL_FOREACH,
      "message1": "%1",
      "args0": [
        {
          "type": "field_variable",
          "name": "VARIABLE"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_start_as_clone'] = {
  /**
   * Block for "when I start as a clone" hat.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_start_as_clone",
      "message0": Blockly.Msg.CONTROL_STARTASCLONE,
      "args0": [
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_hat"]
    });
  }
};

Blockly.Blocks['control_create_clone_of_menu'] = {
  /**
   * Create-clone drop-down menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "CLONE_OPTION",
          "options": [
            [Blockly.Msg.CONTROL_CREATECLONEOF_MYSELF, '_myself_']
          ]
        }
      ],
      "extensions": ["colours_control", "output_string"]
    });
  }
};

Blockly.Blocks['control_create_clone_of'] = {
  /**
   * Block for "create clone of..."
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_start_as_clone",
      "message0": Blockly.Msg.CONTROL_CREATECLONEOF,
      "args0": [
        {
          "type": "input_value",
          "name": "CLONE_OPTION"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_delete_clones_of'] = {
  /**
   * pm: Block for "delete clones of..."
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_delete_clones_of",
      "message0": "delete clones of %1",
      "args0": [
        {
          "type": "input_value",
          "name": "CLONE_OPTION"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_delete_this_clone'] = {
  /**
   * Block for "delete this clone."
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_DELETETHISCLONE,
      "args0": [
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_end"]
    });
  }
};

Blockly.Blocks['control_is_clone?'] = {
  /**
   * Block for "delete this clone."
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_ISCLONE?,
      "args0": [
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "output_number"]
    });
  }
};

Blockly.Blocks['control_stop_sprite_menu'] = {
  /**
   * pm: Stop-sprite drop-down menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "STOP_OPTION",
          "options": [
            ["stage", '_stage_']
          ]
        }
      ],
      "extensions": ["colours_control", "output_string"]
    });
  }
};

Blockly.Blocks['control_stop_sprite'] = {
  /**
   * pm: Block for "stop (...)"
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_stop_sprite",
      "message0": "stop %1",
      "args0": [
        {
          "type": "input_value",
          "name": "STOP_OPTION"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_run_as_sprite_menu'] = {
  /**
   * pm: Run-as-sprite drop-down menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "RUN_AS_OPTION",
          "options": [
            ["Stage", '_stage_']
          ]
        }
      ],
      "extensions": ["colours_control", "output_string"]
    });
  }
};

Blockly.Blocks['control_run_as_sprite'] = {
  init: function() {
    this.jsonInit({
      "message0": 'as %1',
      "message1": "%1",
      "args0": [
        {
          "type": "input_value",
          "name": "RUN_AS_OPTION"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_inline_stack_output'] = {
  /**
   * pm: Block to run a stack and output a return from it.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": 'inline block',
      "message1": "%1",
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.control,
      "output": null,
      "outputShape": Blockly.OUTPUT_SHAPE_SQUARE,
      "extensions": ["colours_control"]
    });
  }
};

Blockly.Blocks['control_get_counter'] = {
  /**
   * pm: Block to get the counter value.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_COUNTER,
      "category": Blockly.Categories.control,
      "checkboxInFlyout": true,
      "extensions": ["colours_control", "output_number"]
    });
  }
};

Blockly.Blocks['control_incr_counter'] = {
  /**
   * pm: Block to add one to the counter value.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_INCRCOUNTER,
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_decr_counter'] = {
  /**
   * pm: Block to subtract one from the counter value.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "decrement counter",
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_set_counter'] = {
  /**
   * pm: Block to set the counter value.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "set counter to %1",
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_clear_counter'] = {
  /**
   * pm: Block to clear the counter value.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_CLEARCOUNTER,
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_all_at_once'] = {
  /**
   * Block to run the contained script. This is an obsolete block that is
   * implemented for compatibility with Scratch 2.0 projects. Note that
   * this was originally designed to run all of the contained blocks
   * (sequentially, like normal) within a single frame, but this feature
   * was removed in place of custom blocks marked "run without screen
   * refresh". The "all at once" block was changed to run the contained
   * blocks ordinarily, functioning the same way as an "if" block with a
   * reporter that is always true (e.g. "if 1 = 1"). Also note that the
   * Scratch 2.0 spec for this block is "warpSpeed", but the label shows
   * "all at once".
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROL_ALLATONCE,
      "message1": "%1", // Statement
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_new_script'] = {
  init: function () {
    this.jsonInit({
      "message0": "new script",
      "message1": "%1", // Statement
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks["control_backToGreenFlag"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "run %1",
      "args0": [
        {
          "type": "field_image",
          "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACJ0lEQVRIid2Uy09TQRSHv2kv1VR5hhQQqwlYGtqCmtbHokhDTNQtEVz4B/gfmBCDXoyGmLj3kbBwY2LY6MpHWJDUoBukKsTKQ6I2paWGBipCo73jBii30BpI78ZfMpkzMznznTOPAwZLbFgt/ZWY011k9gzysSdZLICStdJXkPRjSns41hcH2Y7EjmAVmESKFyjyCaPqr50AzBtWbeAsEKDE0oy7w4rnfAXNbWU0nlY40CQwmX0kY73UBr4QGw5vu5vndg31Zy6wv3OGhecZfQbrajk3Rp2zXRdCqe0Irg5o8k8w+uwWR9VLmE13eaeNgarRqtoQ4jKKdpUy+wLy+3Hg2vaAQlIsbk51ZUjNJ/n8egBv5CBan2Bf5TL1nlkafGkWYz8YeVy94bIjwHpOpTY/vs7Nc1WAHQCNr5sXTLsA/EOaNBagabph8QEyYzAA3QkZkYGeUOAVyTlWUt/I/M5gLa/GpDjYXFryuumPaCsgMWsl+ilEfLoOSQTBClBBuW2GExcXsVi9hQFSF8RWQGT8MNCLwzXAYHc2nNabbQzdu4/TH6ThpBMhbDmef1iKhRgf8iHFo/wAeEpIfUgoZ/bD9SAB1Us42MPUiJOaxhBVh5YwKYKfib3MhZtYXS5B0sl79VUhQH4Nq6vADbzqHaJTbUQn3QjKECKOlG8Iqblh7apUsFayX661gjLgH/zPgPm1PlFMQPaSHa4HTIcnSFW8LSbAcP0F3uGqEimnx6MAAAAASUVORK5CYII=",
          "width": 24,
          "height": 24,
          "flip_rtl": false
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks["control_if_return_else_return"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "if %1 is true %2 is false %3",
      "args0": [
        {
          "type": "input_value",
          "name": "boolean",
          "check": "Boolean"
        },
        {
          "type": "input_value",
          "name": "TEXT1"
        },
        {
          "type": "input_value",
          "name": "TEXT2"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "output_string"]
    });
  }
};

Blockly.Blocks['control_switch'] = {
  init: function() {
    this.jsonInit({
      "message0": 'switch %1',
      "message1": "%1",
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK",
          "check": 'switchCase'
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_switch_default'] = {
  init: function() {
    this.jsonInit({
      "message0": 'switch %1',
      "message1": "%1",
      "message2": "default",
      "message3": "%1",
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK1",
          "check": 'switchCase'
        }
      ],
      "args3": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK2"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};

Blockly.Blocks['control_case'] = {
  init: function() {
    this.jsonInit({
      "message0": 'case %1',
      "message1": "%1",
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "check": 'normal',
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_case"]
    });
  }
};

Blockly.Blocks['control_case_next'] = {
  init: function() {
    this.jsonInit({
      "message0": 'run next case when %1',
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION"
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_case"]
    });
  }
};

Blockly.Blocks['control_exitCase'] = {
  init: function () {
    this.jsonInit({
      "message0": 'exit case %1',
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "arrow-down.svg",
          "width": 24,
          "height": 24,
          "alt": "↓",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_end"]
    });
  }
};

Blockly.Blocks['control_exitLoop'] = {
  init: function() {
    this.jsonInit({
      "message0": 'escape loop %1',
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "arrow-down.svg",
          "width": 24,
          "height": 24,
          "alt": "↓",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_end"]
    });
  }
};

Blockly.Blocks['control_javascript_command'] = {
  /**
   * pm: Block to run javascript code.
   * @this Blockly.Block
   */
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
