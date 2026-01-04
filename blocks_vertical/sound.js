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

goog.provide('Blockly.Blocks.sound');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sound_sounds_menu'] = {
  /**
   * Sound effects drop-down menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "SOUND_MENU",
          "options": [
            ['1', '0'],
            ['2', '1'],
            ['3', '2'],
            ['4', '3'],
            ['5', '4'],
            ['6', '5'],
            ['7', '6'],
            ['8', '7'],
            ['9', '8'],
            ['10', '9'],
            ['call a function', function() {
              window.alert('function called!');}
            ]
          ]
        }
      ],
      "colour": Blockly.Colours.sounds.secondary,
      "colourSecondary": Blockly.Colours.sounds.secondary,
      "colourTertiary": Blockly.Colours.sounds.tertiary,
      "extensions": ["output_string"]
    });
  }
};

Blockly.Blocks['sound_play'] = {
  /**
   * Block to play sound.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_PLAY,
      "args0": [
        {
          "type": "input_value",
          "name": "SOUND_MENU"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_playuntildone'] = {
  /**
   * Block to play sound until done.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_PLAYUNTILDONE,
      "args0": [
        {
          "type": "input_value",
          "name": "SOUND_MENU"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_stop'] = {
  /**
   * pm: Block to stop a sound.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "stop sound %1",
      "args0": [
        {
          "type": "input_value",
          "name": "SOUND_MENU"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_pause'] = {
  /**
   * pm: Block to pause a sound.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "pause sound %1",
      "args0": [
        {
          "type": "input_value",
          "name": "SOUND_MENU"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_set_stop_fadeout_to'] = {
  /**
   * pm: Block to set the fadeout time on a sound.
   * The fadeout time is used when the sound is stopped in any way.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "set fade out to %1 seconds on %2",
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE"
        },
        {
          "type": "input_value",
          "name": "SOUND_MENU"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_play_at_seconds'] = {
  /**
   * pm: Block to start a sound at a specific time position.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "start sound %1 at %2 seconds",
      "args0": [
        {
          "type": "input_value",
          "name": "SOUND_MENU"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_play_at_seconds_until_done'] = {
  /**
   * pm: Block to start a sound at a specific time position.
   * This block will wait until the sound is actually finished
   * before continuing the stack.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "play sound %1 starting at %2 seconds until done",
      "args0": [
        {
          "type": "input_value",
          "name": "SOUND_MENU"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_stopallsounds'] = {
  /**
   * Block to stop all sounds
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_STOPALLSOUNDS,
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_pauseallsounds'] = {
  /**
   * pm: Block to pause all sounds
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "pause all sounds",
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_playallsounds'] = {
  /**
   * pm: Block to play all sounds
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "play all sounds",
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_seteffectto'] = {
  /**
   * Block to set the audio effect
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_SETEFFECTO,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "EFFECT",
          "options": [
            [Blockly.Msg.SOUND_EFFECTS_PITCH, 'PITCH'],
            [Blockly.Msg.SOUND_EFFECTS_PAN, 'PAN']
          ]
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};


Blockly.Blocks['sound_changeeffectby'] = {
  /**
   * Block to change the audio effect
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_CHANGEEFFECTBY,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "EFFECT",
          "options": [
            [Blockly.Msg.SOUND_EFFECTS_PITCH, 'PITCH'],
            [Blockly.Msg.SOUND_EFFECTS_PAN, 'PAN']
          ]
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_cleareffects'] = {
  /**
   * Block to clear audio effects
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_CLEAREFFECTS,
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_getEffectValue'] = {
  /**
   * pm: Block to report sound effect values
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "message0": "%1 effect",
      "checkboxInFlyout": true,
      "category": Blockly.Categories.sound,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "EFFECT",
          "options": [
            [Blockly.Msg.SOUND_EFFECTS_PITCH, 'PITCH'],
            [Blockly.Msg.SOUND_EFFECTS_PAN, 'PAN']
          ]
        }
      ],
      "extensions": ["colours_sounds", "output_number"]
    });
  }
};

Blockly.Blocks['sound_changevolumeby'] = {
  /**
   * Block to change the sprite's volume by a certain value
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_CHANGEVOLUMEBY,
      "args0": [
        {
          "type": "input_value",
          "name": "VOLUME"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_setvolumeto'] = {
  /**
   * Block to set the sprite's volume to a certain percent
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_SETVOLUMETO,
      "args0": [
        {
          "type": "input_value",
          "name": "VOLUME"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_volume'] = {
  /**
   * Block to report volume
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SOUND_VOLUME,
      "category": Blockly.Categories.sound,
      "checkboxInFlyout": true,
      "extensions": ["colours_sounds", "output_number"]
    });
  }
};

Blockly.Blocks["sound_isSoundPlaying"] = {
  init: function() {
    this.jsonInit({
      "inputsInline": true,
      "category": Blockly.Categories.sound,
      "message0": "is %1 playing?",
      "args0": [
        {
          "type": "input_value",
          "name": "SOUND_MENU"
        }
      ],
      "extensions": [
        "output_boolean",
        "colours_sounds"
      ]
    });
  }
};

Blockly.Blocks['sound_getLength'] = {
  /**
   * pm: Block to report the length of a sound.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "length of %1",
      "args0": [
        {
          "type": "input_value",
          "name": "SOUND_MENU"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "output_number"]
    });
  }
};

Blockly.Blocks['sound_getTimePosition'] = {
  /**
   * pm: Block to report the current time position of a sound.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "current time position of %1",
      "args0": [
        {
          "type": "input_value",
          "name": "SOUND_MENU"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "output_number"]
    });
  }
};

Blockly.Blocks['sound_getSoundVolume'] = {
  /**
   * pm: Block to report the volume of a sound at the current position.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "current volume of %1",
      "args0": [
        {
          "type": "input_value",
          "name": "SOUND_MENU"
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_sounds", "output_number"]
    });
  }
};

Blockly.Blocks['sound_currentlyPlayingSounds'] = {
  /**
   * pm: Block to report the volume of a sound at the current position.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "currently playing sounds",
      "args0": [],
      "category": Blockly.Categories.sound,
      "checkboxInFlyout": true,
      "extensions": ["colours_sounds", "output_string"]
    });
  }
};
