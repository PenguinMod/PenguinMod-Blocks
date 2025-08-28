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

goog.provide('Blockly.Blocks.sensing');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['sensing_touchingobject'] = {
  /**
   * Block to Report if its touching a Object.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_TOUCHINGOBJECT,
      "args0": [
        {
          "type": "input_value",
          "name": "TOUCHINGOBJECTMENU"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_objecttouchingclonesprite'] = {
  /**
   * pm: Block to Report if an Object is touching a clone of another sprite.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1 touching clone of %2?",
      "args0": [
        {
          "type": "input_value",
          "name": "FULLTOUCHINGOBJECTMENU"
        },
        {
          "type": "input_value",
          "name": "SPRITETOUCHINGOBJECTMENU"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_objecttouchingobject'] = {
  /**
   * pm" Block to Report if an Object is touching another Object.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1 touching %2?",
      "args0": [
        {
          "type": "input_value",
          "name": "FULLTOUCHINGOBJECTMENU"
        },
        {
          "type": "input_value",
          "name": "SPRITETOUCHINGOBJECTMENU"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_touchingobjectmenu'] = {
  /**
   * "Touching [Object]" Block Menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TOUCHINGOBJECTMENU",
          "options": [
            [Blockly.Msg.SENSING_TOUCHINGOBJECT_POINTER, '_mouse_'],
            [Blockly.Msg.SENSING_TOUCHINGOBJECT_EDGE, '_edge_']
          ]
        }
      ],
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_fulltouchingobjectmenu'] = {
  /**
   * pm: "Touching [Object]" Block Menu with more options.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "FULLTOUCHINGOBJECTMENU",
          "options": [
            ["mouse-pointer", '_mouse_'],
            ["edge", '_edge_'],
            ["this sprite", '_myself_']
          ]
        }
      ],
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_touchingobjectmenusprites'] = {
  /**
   * pm: "Touching [Object]" Block Menu with sprite options.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "SPRITETOUCHINGOBJECTMENU",
          "options": [
            ["this sprite", '_myself_']
          ]
        }
      ],
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_touchingcolor'] = {
  /**
   * Block to Report if its touching a certain Color.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_TOUCHINGCOLOR,
      "args0": [
        {
          "type": "input_value",
          "name": "COLOR"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_coloristouchingcolor'] = {
  /**
   * Block to Report if a color is touching a certain Color.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_COLORISTOUCHINGCOLOR,
      "args0": [
        {
          "type": "input_value",
          "name": "COLOR"
        },
        {
          "type": "input_value",
          "name": "COLOR2"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_distanceto'] = {
  /**
   * Block to Report distance to another Object.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_DISTANCETO,
      "args0": [
        {
          "type": "input_value",
          "name": "DISTANCETOMENU"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_distancetomenu'] = {
  /**
   * "Distance to [Object]" Block Menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DISTANCETOMENU",
          "options": [
            [Blockly.Msg.SENSING_DISTANCETO_POINTER, '_mouse_']
          ]
        }
      ],
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_askandwait'] = {
  /**
   * Block to ask a question and wait
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_ASKANDWAIT,
      "args0": [
        {
          "type": "input_value",
          "name": "QUESTION"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "shape_statement"]
    });
  }
};

Blockly.Blocks['sensing_answer'] = {
  /**
   * Block to report answer
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_ANSWER,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_keypressed'] = {
  /**
   * Block to Report if a key is pressed.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_KEYPRESSED,
      "args0": [
        {
          "type": "input_value",
          "name": "KEY_OPTION"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_keyhit'] = {
  /**
   * pm: Block to Report if a key is hit on the same tick.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "key %1 hit?",
      "args0": [
        {
          "type": "input_value",
          "name": "KEY_OPTION"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_mousescrolling'] = {
  /**
   * pm: Block to report if the mouse is scrolling in a direction.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "is mouse scrolling %1?",
      "args0": [
        {
          "type": "input_value",
          "name": "SCROLL_OPTION"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_scrolldirections'] = {
  /**
   * pm: Options for scroll direction
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "SCROLL_OPTION",
          "options": [
            ['up', 'up'],
            ['down', 'down']
          ]
        }
      ],
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_keyoptions'] = {
  /**
   * Options for Keys
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "KEY_OPTION",
          "options": [
            [Blockly.Msg.EVENT_WHENKEYPRESSED_SPACE, 'space'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_UP, 'up arrow'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_DOWN, 'down arrow'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_RIGHT, 'right arrow'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_LEFT, 'left arrow'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_ANY, 'any'],
            ['a', 'a'],
            ['b', 'b'],
            ['c', 'c'],
            ['d', 'd'],
            ['e', 'e'],
            ['f', 'f'],
            ['g', 'g'],
            ['h', 'h'],
            ['i', 'i'],
            ['j', 'j'],
            ['k', 'k'],
            ['l', 'l'],
            ['m', 'm'],
            ['n', 'n'],
            ['o', 'o'],
            ['p', 'p'],
            ['q', 'q'],
            ['r', 'r'],
            ['s', 's'],
            ['t', 't'],
            ['u', 'u'],
            ['v', 'v'],
            ['w', 'w'],
            ['x', 'x'],
            ['y', 'y'],
            ['z', 'z'],
            ['0', '0'],
            ['1', '1'],
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
            ['5', '5'],
            ['6', '6'],
            ['7', '7'],
            ['8', '8'],
            ['9', '9']
          ]
        }
      ],
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_fingeroptions'] = {
  /**
   * pm: Options for Fingers
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "FINGER_OPTION",
          "options": [
            ['1', '1'],
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
            ['5', '5']
          ]
        }
      ],
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_mousedown'] = {
  /**
   * Block to Report if the mouse is down.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_MOUSEDOWN,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_mouseclicked'] = {
  /**
   * pm: Block to Report if the mouse is clicked on the same tick.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "mouse clicked?",
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_fingerdown'] = {
  /**
   * pm: Block to Report if the specified finger is down.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "finger %1 down?",
      "args0": [
        {
          "type": "input_value",
          "name": "FINGER_OPTION"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_fingertapped'] = {
  /**
   * pm: Block to Report if the specified finger has tapped on this frame.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "finger %1 tapped?",
      "args0": [
        {
          "type": "input_value",
          "name": "FINGER_OPTION"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_mousex'] = {
  /**
   * Block to report mouse's x position
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_MOUSEX,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_mousey'] = {
  /**
   * Block to report mouse's y position
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_MOUSEY,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_fingerx'] = {
  /**
   * pm: Block to report finger #<options>'s x position
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "finger %1 x",
      "args0": [
        {
          "type": "input_value",
          "name": "FINGER_OPTION"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_fingery'] = {
  /**
   * pm: Block to report finger #<options>'s y position
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "finger %1 y",
      "args0": [
        {
          "type": "input_value",
          "name": "FINGER_OPTION"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_setclipboard'] = {
  /**
   * pm: Block to add an item to the Clipboard
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_ADDTOCLIPBOARD,
      "args0": [
        {
          "type": "input_value",
          "name": "ITEM"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "shape_statement"]
    });
  }
};

Blockly.Blocks['sensing_getclipboard'] = {
  /**
   * pm: Block to report the current item in the Clipboard
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_CLIPBOARDITEM,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_setdragmode'] = {
  /**
   * Block to set drag mode.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_SETDRAGMODE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DRAG_MODE",
          "options": [
            [Blockly.Msg.SENSING_SETDRAGMODE_DRAGGABLE, 'draggable'],
            [Blockly.Msg.SENSING_SETDRAGMODE_NOTDRAGGABLE, 'not draggable']
          ]
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "shape_statement"]
    });
  }
};

Blockly.Blocks['sensing_getdragmode'] = {
  /**
   * pm: Block to report drag mode.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "draggable?",
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_loudness'] = {
  /**
   * Block to report loudness
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_LOUDNESS,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_loud'] = {
  /**
   * Block to report if the loudness is "loud" (greater than 10). This is an
   * obsolete block that is implemented for compatibility with Scratch 2.0 and
   * 1.4 projects.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_LOUD,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_timer'] = {
  /**
   * Block to report timer
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_TIMER,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_resettimer'] = {
  /**
   * Block to reset timer
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_RESETTIMER,
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "shape_statement"]
    });
  }
};

Blockly.Blocks['sensing_of_object_menu'] = {
  /**
   * "* of _" object menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OBJECT",
          "options": [
            ['Sprite1', 'Sprite1'],
            ['Stage', '_stage_']
          ]
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};


Blockly.Blocks['sensing_of'] = {
  /**
   * Block to report properties of sprites.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_OF,
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
        }
      ],
      "output": true,
      "category": Blockly.Categories.sensing,
      "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
      "extensions": ["colours_sensing"]
    });
  }
};

Blockly.Blocks['sensing_set_of'] = {
  /**
   * Block to set properties of sprites.
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

Blockly.Blocks['sensing_current'] = {
  /**
   * Block to Report the current option.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_CURRENT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "CURRENTMENU",
          "options": [
            [Blockly.Msg.SENSING_CURRENT_YEAR, 'YEAR'],
            [Blockly.Msg.SENSING_CURRENT_MONTH, 'MONTH'],
            [Blockly.Msg.SENSING_CURRENT_DATE, 'DATE'],
            [Blockly.Msg.SENSING_CURRENT_DAYOFWEEK, 'DAYOFWEEK'],
            [Blockly.Msg.SENSING_CURRENT_HOUR, 'HOUR'],
            [Blockly.Msg.SENSING_CURRENT_MINUTE, 'MINUTE'],
            [Blockly.Msg.SENSING_CURRENT_SECOND, 'SECOND'],
            ['js timestamp', 'TIMESTAMP']
          ]
        }
      ],
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_dayssince2000'] = {
  /**
   * Block to report days since 2000
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_DAYSSINCE2000,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_username'] = {
  /**
   * Block to report user's username
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_USERNAME,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_loggedin'] = {
  /**
   * pm: Block to report if a user is logged in.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": 'logged in?',
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_userid'] = {
  /**
   * Block to report user's ID. Does not actually do anything. This is an
   * obsolete block that is implemented for compatibility with Scratch 2.0
   * projects.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_USERID,
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks["sensing_regextest"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "test regex %2 %3 with text %1",
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
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks["sensing_thing_is_number"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "%1 is number?",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT1"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks["sensing_thing_has_text"] = {
  init: function () {
    this.jsonInit({
      "inputsInline": true,
      "message0": "%1 has text?",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT1"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks["sensing_thing_has_number"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "%1 has number?",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT1"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks["sensing_mobile"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "mobile?",
      "args0": [],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks["sensing_thing_is_text"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "%1 is text?",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT1"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};



Blockly.Blocks["sensing_getspritewithattrib"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "get sprite with %1 set to %2",
      "args0": [
        {
          "type": "input_value",
          "name": "var"
        },
        {
          "type": "input_value",
          "name": "val"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_distanceTo'] = {
  init: function() {
    this.jsonInit({
      "message0": 'distance from %1 %2 to %3 %4',
      "args0": [
        {
          "type": "input_value",
          "name": "x1"
        },
        {
          "type": "input_value",
          "name": "y1"
        },
        {
          "type": "input_value",
          "name": "x2"
        },
        {
          "type": "input_value",
          "name": "y2"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_directionTo'] = {
  init: function() {
    this.jsonInit({
      "message0": 'direction to %1 %2 from %3 %4',
      "args0": [
        {
          "type": "input_value",
          "name": "x2"
        },
        {
          "type": "input_value",
          "name": "y2"
        },
        {
          "type": "input_value",
          "name": "x1"
        },
        {
          "type": "input_value",
          "name": "y1"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_isUpperCase'] = {
  init: function() {
    this.jsonInit({
      "message0": 'is character %1 uppercase?',
      "args0": [
        {
          "type": "input_value",
          "name": "text"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_getoperatingsystem'] = {
  /**
   * pm: Block to report the users Operating System
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "operating system",
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_getbrowser'] = {
  /**
   * pm: Block to report the users Operating System
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "browser",
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_geturl'] = {
  /**
   * pm: Block to report the users Operating System
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "url",
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_getxyoftouchingsprite'] = {
  /**
   * Block to set drag mode.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 of touching %2 point",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "XY",
          "options": [
            ['x', 'x'],
            ['y', 'y']
          ]
        },
        {
          "type": "input_value",
          "name": "SPRITE"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};
