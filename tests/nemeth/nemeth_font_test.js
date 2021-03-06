// Copyright 2014 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Tests for fonts.
 *
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.NemethFontTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.NemethFontTest = function() {
  sre.NemethFontTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Nemeth Font tests.';

  /**
   * @override
   */
  this.domain = 'default';

  /**
   * @override
   */
  this.locale = 'nemeth';

  /**
   * @override
   */
  this.modality = 'braille';

  this.setActive('NemethFont');
};
goog.inherits(sre.NemethFontTest, sre.AbstractRuleTest);


/**
 *
 * Font tests serve primarily to check for correct replacement of font names.
 *
 * We check:
 * 1. Fonts for unicode characters (with mathfonts on plane 1).
 * 2. Fonts for mathvariant inclusion (including TeX specific fonts).
 * 3. Correct replacements in case both unicode and mathvariants are given.
 *
 */


/**
 *  Part 1: Unicode Characters
 */


/**
 * Test for Unicode Latin mathfonts upper letters.
 */
sre.NemethFontTest.prototype.testLatinMathfontsUpper = function() {
  this.executeRuleTest('<mi>&#x0041;</mi>', '⠠⠁', 'default');
  this.executeRuleTest('<mi>&#xFF21;</mi>', '⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D400;</mi>', '⠸⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D434;</mi>', '⠨⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D468;</mi>', '⠸⠨⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D49C;</mi>', '⠈⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D4D0;</mi>', '⠸⠈⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D504;</mi>', '⠸⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D538;</mi>', '⠸⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D56C;</mi>', '⠸⠀⠸⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D5A0;</mi>', '⠠⠨⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D5D4;</mi>', '⠠⠨⠸⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D608;</mi>', '⠠⠨⠨⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D63C;</mi>', '⠠⠨⠸⠨⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D670;</mi>', '⠠⠁', 'default');
};


/**
 * Test for Unicode Greek mathfonts upper letters.
 */
sre.NemethFontTest.prototype.testGreekMathfontsUpper = function() {
  this.executeRuleTest('<mi>&#x0391;</mi>', '⠨⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D6A8;</mi>', '⠸⠨⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D6E2;</mi>', '⠨⠨⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D71C;</mi>', '⠸⠨⠨⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D756;</mi>', '⠠⠨⠸⠨⠠⠁', 'default');
  this.executeRuleTest('<mi>&#x1D790;</mi>', '⠠⠨⠸⠨⠨⠠⠁', 'default');
};


/**
 * Test for Unicode Latin mathfonts small letters.
 */
sre.NemethFontTest.prototype.testLatinMathfontsSmall = function() {
  this.executeRuleTest('<mi>&#x0061;</mi>', '⠁', 'default');
  this.executeRuleTest('<mi>&#xFF41;</mi>', '⠁', 'default');
  this.executeRuleTest('<mi>&#x1D41A;</mi>', '⠸⠁', 'default');
  this.executeRuleTest('<mi>&#x1D44E;</mi>', '⠨⠁', 'default');
  this.executeRuleTest('<mi>&#x1D482;</mi>', '⠸⠨⠁', 'default');
  this.executeRuleTest('<mi>&#x1D4B6;</mi>', '⠈⠁', 'default');
  this.executeRuleTest('<mi>&#x1D4EA;</mi>', '⠸⠈⠁', 'default');
  this.executeRuleTest('<mi>&#x1D51E;</mi>', '⠸⠁', 'default');
  this.executeRuleTest('<mi>&#x1D552;</mi>', '⠸⠁', 'default');
  this.executeRuleTest('<mi>&#x1D586;</mi>', '⠸⠀⠸⠁', 'default');
  this.executeRuleTest('<mi>&#x1D5BA;</mi>', '⠠⠨⠁', 'default');
  this.executeRuleTest('<mi>&#x1D5EE;</mi>', '⠠⠨⠸⠁', 'default');
  this.executeRuleTest('<mi>&#x1D622;</mi>', '⠠⠨⠨⠁', 'default');
  this.executeRuleTest('<mi>&#x1D656;</mi>', '⠠⠨⠸⠨⠁', 'default');
  this.executeRuleTest('<mi>&#x1D68A;</mi>', '⠁', 'default');
};


/**
 * Test for Unicode Greek mathfonts small letters.
 */
sre.NemethFontTest.prototype.testGreekMathfontsSmall = function() {
  this.executeRuleTest('<mi>&#x03B1;</mi>', '⠨⠁', 'default');
  this.executeRuleTest('<mi>&#x1D6C2;</mi>', '⠸⠨⠁', 'default');
  this.executeRuleTest('<mi>&#x1D6FC;</mi>', '⠨⠨⠁', 'default');
  this.executeRuleTest('<mi>&#x1D736;</mi>', '⠸⠨⠨⠁', 'default');
  this.executeRuleTest('<mi>&#x1D770;</mi>', '⠠⠨⠸⠨⠁', 'default');
  this.executeRuleTest('<mi>&#x1D7AA;</mi>', '⠠⠨⠸⠨⠨⠁', 'default');
};


/**
 *  Part 2: Mathvariants
 */


/**
 * Test for Latin with mathvariant upper letters.
 */
sre.NemethFontTest.prototype.testLatinMathvariantUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">A</mi>', '⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold">A</mi>', '⠸⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="italic">A</mi>', '⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">A</mi>', '⠸⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="script">A</mi>', '⠈⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">A</mi>', '⠸⠈⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">A</mi>', '⠸⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">A</mi>', '⠸⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">A</mi>', '⠸⠀⠸⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">A</mi>', '⠠⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">A</mi>', '⠠⠨⠸⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">A</mi>', '⠠⠨⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">A</mi>', '⠠⠨⠸⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">A</mi>', '⠠⠁', 'default');
};


/**
 * Test for Latin with special MathJax mathvariants.
 */
sre.NemethFontTest.prototype.testLatinMathvariantMathJax = function() {
  this.executeRuleTest('<mi mathvariant="-tex-caligraphic">A</mi>', '⠈⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-caligraphic-bold">A</mi>', '⠈⠸⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-calligraphic">A</mi>', '⠈⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-calligraphic-bold">A</mi>', '⠈⠸⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-mathit">A</mi>', '⠠⠁', 'default');
};


/**
 * Test for Greek with mathvariant upper letters.
 */
sre.NemethFontTest.prototype.testGreekMathvariantUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0391;</mi>', '⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x0391;</mi>', '⠸⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x0391;</mi>', '⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x0391;</mi>', '⠸⠨⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x0391;</mi>', '⠠⠨⠸⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x0391;</mi>', '⠠⠨⠸⠨⠨⠠⠁', 'default');
};


/**
 * Test for Latin with mathvariant small letters.
 */
sre.NemethFontTest.prototype.testLatinMathvariantSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">a</mi>', '⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold">a</mi>', '⠸⠁', 'default');
  this.executeRuleTest('<mi mathvariant="italic">a</mi>', '⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">a</mi>', '⠸⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="script">a</mi>', '⠈⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">a</mi>', '⠸⠈⠁', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">a</mi>', '⠸⠁', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">a</mi>', '⠸⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">a</mi>', '⠸⠀⠸⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">a</mi>', '⠠⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">a</mi>', '⠠⠨⠸⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">a</mi>', '⠠⠨⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">a</mi>', '⠠⠨⠸⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">a</mi>', '⠁', 'default');
};


/**
 * Test for Greek with mathvariant small letters.
 */
sre.NemethFontTest.prototype.testGreekMathvariantSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x03B1;</mi>', '⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x03B1;</mi>', '⠸⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x03B1;</mi>', '⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x03B1;</mi>', '⠸⠨⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x03B1;</mi>', '⠠⠨⠸⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x03B1;</mi>', '⠠⠨⠸⠨⠨⠁', 'default');
};


/**
 *  Part 3: Mathvariants and Unicode Characters
 */


/**
 * Test for Unicode Latin mathfonts with mathvariant upper letters.
 */
sre.NemethFontTest.prototype.testLatinFontVariantsUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0041;</mi>', '⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="normal">&#xFF21;</mi>', '⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D400;</mi>', '⠸⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D434;</mi>', '⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D468;</mi>', '⠸⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="script">&#x1D49C;</mi>', '⠈⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">&#x1D4D0;</mi>', '⠸⠈⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">&#x1D504;</mi>', '⠸⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">&#x1D538;</mi>', '⠸⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">&#x1D56C;</mi>', '⠸⠀⠸⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">&#x1D5A0;</mi>', '⠠⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D5D4;</mi>', '⠠⠨⠸⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">&#x1D608;</mi>', '⠠⠨⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D63C;</mi>', '⠠⠨⠸⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">&#x1D670;</mi>', '⠠⠁', 'default');
};


/**
 * Test for Unicode Greek mathfonts with mathvariant upper letters.
 */
sre.NemethFontTest.prototype.testGreekFontVariantsUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0391;</mi>', '⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D6A8;</mi>', '⠸⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D6E2;</mi>', '⠨⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D71C;</mi>', '⠸⠨⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D756;</mi>', '⠠⠨⠸⠨⠠⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D790;</mi>', '⠠⠨⠸⠨⠨⠠⠁', 'default');
};


/**
 * Test for Unicode Latin mathfonts with mathvariant small letters.
 */
sre.NemethFontTest.prototype.testLatinFontVariantsSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0061;</mi>', '⠁', 'default');
  this.executeRuleTest('<mi mathvariant="normal">&#xFF41;</mi>', '⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D41A;</mi>', '⠸⠁', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D44E;</mi>', '⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D482;</mi>', '⠸⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="script">&#x1D4B6;</mi>', '⠈⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">&#x1D4EA;</mi>', '⠸⠈⠁', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">&#x1D51E;</mi>', '⠸⠁', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">&#x1D552;</mi>', '⠸⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">&#x1D586;</mi>', '⠸⠀⠸⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">&#x1D5BA;</mi>', '⠠⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D5EE;</mi>', '⠠⠨⠸⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">&#x1D622;</mi>', '⠠⠨⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D656;</mi>', '⠠⠨⠸⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">&#x1D68A;</mi>', '⠁', 'default');
};


/**
 * Test for Unicode Greek mathfonts with mathvariant small letters.
 */
sre.NemethFontTest.prototype.testGreekFontVariantsSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x03B1;</mi>', '⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D6C2;</mi>', '⠸⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D6FC;</mi>', '⠨⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D736;</mi>', '⠸⠨⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D770;</mi>', '⠠⠨⠸⠨⠁', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D7AA;</mi>', '⠠⠨⠸⠨⠨⠁', 'default');
};
