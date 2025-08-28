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
 * @fileoverview Expandable Add field.
 * @author SharkPool & JeremyGamer13
 */
'use strict';

goog.provide('Blockly.FieldExpandableAdd');

goog.require('Blockly.Field');

/**
 * Icon used by button
 */
const plusIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj48ZyBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTEuOTAzIDguNDRDLjg1MSA4LjQ0IDAgNy41MzYgMCA2LjQxOXYtLjgzN2MwLTEuMTE2Ljg1Mi0yLjAyMSAxLjkwMy0yLjAyMWgxLjY1NlYxLjkwM0MzLjU1OS44NTEgNC40NjUgMCA1LjU4MSAwaC44MzdjMS4xMTYgMCAyLjAyMS44NTIgMi4wMjEgMS45MDN2MS42NTZoMS42NTdjMS4wNTIgMCAxLjkwMy45MDYgMS45MDMgMi4wMjJ2LjgzN2MwIDEuMTE2LS44NTIgMi4wMjEtMS45MDMgMi4wMjFIOC40NDF2MS42NTdjMCAxLjA1Mi0uOTA2IDEuOTAzLTIuMDIyIDEuOTAzaC0uODM3Yy0xLjExNiAwLTIuMDIxLS44NTItMi4wMjEtMS45MDNWOC40NDF6IiBmaWxsLW9wYWNpdHk9Ii4xMDIiIGZpbGw9IiMyNDIwMjEiLz48cGF0aCBkPSJNMi4yMjggNy41OThBMS40MjcgMS40MjcgMCAwIDEgLjgwMSA2LjE3MVY1LjgzYTEuNDI3IDEuNDI3IDAgMCAxIDEuNDI3LTEuNDI3aDIuMTc0VjIuMjI4QTEuNDI3IDEuNDI3IDAgMCAxIDUuODI5LjgwMWguMzQxYTEuNDI3IDEuNDI3IDAgMCAxIDEuNDI3IDEuNDI3djIuMTc0aDIuMTc0YTEuNDI3IDEuNDI3IDAgMCAxIDEuNDI3IDEuNDI3di4zNDFhMS40MjcgMS40MjcgMCAwIDEtMS40MjcgMS40MjdINy41OTh2Mi4xNzRhMS40MjcgMS40MjcgMCAwIDEtMS40MjcgMS40MjdINS44M2ExLjQyNyAxLjQyNyAwIDAgMS0xLjQyNy0xLjQyN1Y3LjU5OHoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+";

/**
 * Class for a button field.
 * @param {object} state Unused.
 * @param {Function=} opt_validator A function that is executed.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldExpandableAdd = function(_, opt_validator) {
  Blockly.FieldExpandableAdd.superClass_.constructor.call(this, '', opt_validator);
  this.addArgType('button');
};
goog.inherits(Blockly.FieldExpandableAdd, Blockly.Field);

/**
 * Construct a FieldExpandableAdd from a JSON arg object.
 * @param {!Object} options A JSON object with options.
 * @returns {!Blockly.FieldExpandableAdd} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldExpandableAdd.fromJson = function(options) {
  return new Blockly.FieldExpandableAdd(options);
};

/**
 * Mouse cursor style when over the button.
 */
Blockly.FieldExpandableAdd.prototype.CURSOR = 'pointer';

/**
 * Install this button on a block.
 */
Blockly.FieldExpandableAdd.prototype.init = function() {
  if (this.fieldGroup_) {
    // Button has already been initialized once.
    return;
  }
  Blockly.FieldExpandableAdd.superClass_.init.call(this);

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
      'xlink:href': plusIcon,
      'href': plusIcon,
    },
    this.boxGroup_
  );
  this.fieldGroup_.insertBefore(this.boxGroup_, this.textElement_);
};

/**
 * Returns an empty string.
 * @return {string}
 */
Blockly.FieldExpandableAdd.prototype.getValue = function() {
  return '';
};

/**
 * Triggers when the button is clicked.
 * @private
 */
Blockly.FieldExpandableAdd.prototype.showEditor_ = function() {
  // true is add
  // false is remove
  this.sourceBlock_.onExpandableButtonClicked_(true);
};

Blockly.Field.register('field_expandable_add', Blockly.FieldExpandableAdd);
