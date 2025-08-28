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

/**
 * @fileoverview Expandable Remove field.
 * @author SharkPool & JeremyGamer13
 */
'use strict';

goog.provide('Blockly.FieldExpandableRemove');

goog.require('Blockly.Field');

/**
 * Icon used by Button
 */
const removeIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI0Ljg4IiB2aWV3Qm94PSIwIDAgMTIgNC44OCI+PGcgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0xLjkwMyA0Ljg4Qy44NTEgNC44OCAwIDMuOTc2IDAgMi44NTl2LS44MzdDMCAuOTA1Ljg1MiAwIDEuOTAzIDBoOC4xOTNjMS4wNTIgMCAxLjkwMy45MDQgMS45MDMgMi4wMjF2LjgzN2MwIDEuMTE2LS44NTIgMi4wMjEtMS45MDMgMi4wMjF6IiBmaWxsLW9wYWNpdHk9Ii4xMDIiIGZpbGw9IiMyNDIwMjEiLz48cGF0aCBkPSJNMi4yMjggNC4wMzhBMS40MjcgMS40MjcgMCAwIDEgLjgwMSAyLjYxMVYyLjI3QTEuNDI3IDEuNDI3IDAgMCAxIDIuMjI4Ljg0M2g3LjU0NGExLjQyNyAxLjQyNyAwIDAgMSAxLjQyNyAxLjQyN3YuMzQxYTEuNDI3IDEuNDI3IDAgMCAxLTEuNDI3IDEuNDI3eiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=';

/**
 * Class for a button field.
 * @param {object} state Unused.
 * @param {Function=} opt_validator A function that is executed.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldExpandableRemove = function(_, opt_validator) {
  Blockly.FieldExpandableRemove.superClass_.constructor.call(this, '', opt_validator);
  this.addArgType('button');
};
goog.inherits(Blockly.FieldExpandableRemove, Blockly.Field);

/**
 * Construct a FieldExpandableRemove from a JSON arg object.
 * @param {!Object} options A JSON object with options.
 * @returns {!Blockly.FieldExpandableRemove} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldExpandableRemove.fromJson = function(options) {
  return new Blockly.FieldExpandableRemove(options);
};

/**
 * Mouse cursor style when over the button.
 */
Blockly.FieldExpandableRemove.prototype.CURSOR = 'pointer';

/**
 * Install this button on a block.
 */
Blockly.FieldExpandableRemove.prototype.init = function() {
  if (this.fieldGroup_) {
    // Button has already been initialized once.
    return;
  }
  Blockly.FieldExpandableRemove.superClass_.init.call(this);

  this.size_.width = 32;
  this.overrideSep = 1;
  this.boxGroup_ = Blockly.utils.createSvgElement('g', {}, null);
  this.box_ = Blockly.utils.createSvgElement('rect',
    {
      'x': 0,
      'y': 0,
      'rx': 4,
      'ry': 4,
      'width': this.size_.width,
      'height': this.size_.height,
      'fill': "#00000000",
      'stroke': "#00000035",
      'cursor': this.CURSOR
    },
    this.boxGroup_
  );
  this.icon_ = Blockly.utils.createSvgElement('image',
    {
      'x': 5,
      'y': 5,
      'width': this.size_.width / 1.5,
      'height': this.size_.height / 1.5,
      'xlink:href': removeIcon,
      'href': removeIcon,
    },
    this.boxGroup_
  );
  this.fieldGroup_.insertBefore(this.boxGroup_, this.textElement_);
};

/**
 * Returns an empty string.
 * @return {string}
 */
Blockly.FieldExpandableRemove.prototype.getValue = function() {
  return '';
};

/**
 * Triggers when the button is clicked.
 * @private
 */
Blockly.FieldExpandableRemove.prototype.showEditor_ = function() {
  // true is add
  // false is remove
  this.sourceBlock_.onExpandableButtonClicked_(false);
};

Blockly.Field.register('field_expandable_remove', Blockly.FieldExpandableRemove);
