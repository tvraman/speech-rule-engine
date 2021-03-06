// Copyright 2017 Volker Sorge
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
//
// Partially funded by the Diagram Project.


/**
 * @fileoverview Tests of markup output.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MarkupTest');

goog.require('sre.AbstractTest');
goog.require('sre.AuralRendering');
goog.require('sre.Engine');
goog.require('sre.System');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.MarkupTest = function() {
  sre.MarkupTest.base(this, 'constructor');

  this.information = 'Markup function test.';

};
goog.inherits(sre.MarkupTest, sre.AbstractTest);


/**
 * @override
 */
sre.MarkupTest.prototype.setUpTest = function() {
  sre.System.getInstance().setupEngine(
      {modality: 'speech', domain: 'default', style: 'default'});
};


/**
 * @override
 */
sre.MarkupTest.prototype.tearDownTest = function() {
  sre.System.getInstance().setupEngine(
      {markup: sre.Engine.Markup.NONE});
};


/**
 * The quadratic equation as a MathML string.
 * @type {string}
 */
sre.MarkupTest.QUADRATIC =
    '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' +
    '<mi>x</mi>' +
    '<mo>=</mo>' +
    '<mfrac>' +
    '<mrow>' +
    '<mo>&#x2212;<!-- − --></mo>' +
    '<mi>b</mi>' +
    '<mo>&#x00B1;<!-- ± --></mo>' +
    '<msqrt>' +
    '<msup>' +
    '<mi>b</mi>' +
    '<mn>2</mn>' +
    '</msup>' +
    '<mo>&#x2212;<!-- − --></mo>' +
    '<mn>4</mn>' +
    '<mi>a</mi>' +
    '<mi>c</mi>' +
    '</msqrt>' +
    '</mrow>' +
    '<mrow>' +
    '<mn>2</mn>' +
    '<mi>a</mi>' +
    '</mrow>' +
    '</mfrac>' +
    '</math>';


/**
 * The quadratic equation as a MathML string.
 * @type {string}
 */
sre.MarkupTest.QUADRATIC_MARKED =
    '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' +
    '<mi>x</mi>' +
    '<mo>=</mo>' +
    '<mfrac>' +
    '<mrow extid="0">' +
    '<mo>&#x2212;<!-- − --></mo>' +
    '<mi extid="1">b</mi>' +
    '<mo extid="2">&#x00B1;<!-- ± --></mo>' +
    '<msqrt>' +
    '<msup>' +
    '<mi>b</mi>' +
    '<mn>2</mn>' +
    '</msup>' +
    '<mo>&#x2212;<!-- − --></mo>' +
    '<mn>4</mn>' +
    '<mi>a</mi>' +
    '<mi>c</mi>' +
    '</msqrt>' +
    '</mrow>' +
    '<mrow>' +
    '<mn>2</mn>' +
    '<mi>a</mi>' +
    '</mrow>' +
    '</mfrac>' +
    '</math>';


/**
 * Executes single markup tests.
 * @param {string} expr The input expression.
 * @param {string} result The expected result.
 * @param {sre.Engine.Markup} markup The markup to test.
 */
sre.MarkupTest.prototype.executeTest = function(
    expr, result, markup) {
  sre.Engine.getInstance().markup = markup;
  var descrs = sre.System.getInstance().toDescription(expr);
  var output = sre.AuralRendering.getInstance().markup(descrs);
  this.assert.equal(output, result);
};


/**
 * Test for simple speech.
 */
sre.MarkupTest.prototype.testSimpleString = function() {
  this.executeTest(
      sre.MarkupTest.QUADRATIC,
      'x equals negative b plus or minus Square root of b squared minus four' +
      ' times a times c divided by two times a',
      sre.Engine.Markup.NONE);
};


/**
 * Test for ACSS markup.
 */
sre.MarkupTest.prototype.testAcss = function() {
  this.executeTest(
      sre.MarkupTest.QUADRATIC,
      '(exp "x" (pause . 200) "equals" (pause . 450) (text ((richness . 6))' +
      ' "negative b plus or minus Square root of") (text ((richness . 7)) "b")' +
      ' (text ((richness . 7) (average-pitch . 6)) "squared") (pause . 300)' +
      ' (text ((richness . 7)) "minus four times a times c") (pause . 650)' +
      ' "divided by" (text ((richness . 4)) "two times a"))',
      sre.Engine.Markup.ACSS);
};


/**
 * Test for Sable markup.
 */
sre.MarkupTest.prototype.testSable = function() {
  this.executeTest(
      sre.MarkupTest.QUADRATIC,
      'x <BREAK MSEC="200"/> equals <BREAK MSEC="450"/> <RATE SPEED="17.5%">' +
      ' negative b plus or minus Square root of </RATE> <RATE SPEED="35%"> b ' +
      '<PITCH RANGE="17.5%"> squared </PITCH> <BREAK MSEC="300"/> minus four' +
      ' times a times c </RATE> <RATE SPEED="17.5%"> <BREAK MSEC="650"/> ' +
      '</RATE> divided by <RATE SPEED="-17.5%"> two times a </RATE> <BREAK' +
      ' MSEC="400"/>',
      sre.Engine.Markup.SABLE);
};


/**
 * Test for SSML markup.
 */
sre.MarkupTest.prototype.testSsml = function() {
  this.executeTest(
      sre.MarkupTest.QUADRATIC,
      'x <break time="200ms"/> equals <break time="450ms"/> <prosody' +
      ' rate="+17%"> negative b plus or minus Square root of </prosody> ' +
      '<prosody rate="+35%"> b <prosody pitch="+17%"> squared </prosody> ' +
      '<break time="300ms"/> minus four times a times c </prosody> <prosody' +
      ' rate="+17%"> <break time="650ms"/> </prosody> divided by <prosody' +
      ' rate="-18%"> two times a </prosody> <break time="400ms"/>',
      sre.Engine.Markup.SSML);
};


/**
 * Test for VoiceXML markup.
 * (Currently that is the same as SSML.)
 */
sre.MarkupTest.prototype.testVoiceXml = function() {
  this.executeTest(
      sre.MarkupTest.QUADRATIC,
      'x <break time="200ms"/> equals <break time="450ms"/> <prosody' +
      ' rate="+17%"> negative b plus or minus Square root of </prosody> ' +
      '<prosody rate="+35%"> b <prosody pitch="+17%"> squared </prosody> ' +
      '<break time="300ms"/> minus four times a times c </prosody> <prosody' +
      ' rate="+17%"> <break time="650ms"/> </prosody> divided by <prosody' +
      ' rate="-18%"> two times a </prosody> <break time="400ms"/>',
      sre.Engine.Markup.VOICEXML);
};


/**
 * Test for SSML Step markup.
 */
sre.MarkupTest.prototype.testSsmlStep = function() {
  sre.System.getInstance().setupEngine({domain: 'clearspeak', style: 'default'});
  this.executeTest(
      sre.MarkupTest.QUADRATIC_MARKED,
      '<say-as interpret-as="character">x</say-as> equals <break' +
      ' time="250ms"/> the fraction with numerator <mark name="0"/>' +
      ' negative <mark name="1"/> <say-as interpret-as="character">b' +
      '</say-as> <mark name="2"/> plus or minus the square root of <say-as' +
      ' interpret-as="character">b</say-as> squared minus <prosody' +
      ' rate="+25%"> 4 <say-as interpret-as="character">a</say-as> <say-as' +
      ' interpret-as="character">c</say-as> </prosody> <break' +
      ' time="250ms"/> and denominator <prosody rate="+25%"> 2 <say-as' +
      ' interpret-as="character">a</say-as> </prosody> <break time="250ms"/>',
      sre.Engine.Markup.SSML_STEP);
  this.executeTest(
      sre.MarkupTest.QUADRATIC_MARKED,
      'x equals <break time="250ms"/> the fraction with numerator negative' +
      ' b plus or minus the square root of b squared minus <prosody' +
      ' rate="+25%"> 4 a c </prosody> <break time="250ms"/> and denominator ' +
      '<prosody rate="+25%"> 2 a </prosody> <break time="250ms"/>',
      sre.Engine.Markup.SSML);
  sre.System.getInstance().setupEngine({domain: 'default', style: 'default'});
};


