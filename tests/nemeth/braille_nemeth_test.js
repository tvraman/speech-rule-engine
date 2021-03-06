// Copyright (c) 2019 Volker Sorge
// Copyright (c) 2019 The MathJax Consortium
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


goog.provide('sre.BrailleNemethTest');

goog.require('sre.AataTest');
goog.require('sre.DefaultCharNemethTest');
goog.require('sre.Nemeth72Test');
goog.require('sre.NemethBaseTest');
goog.require('sre.NemethFontTest');


/**
 * List of Nemeth Braille generation tests to run.
 * @type {Array}
 */
sre.BrailleNemethTest.testList = [
  sre.AataTest,
  sre.DefaultCharNemethTest,
  sre.Nemeth72Test,
  sre.NemethBaseTest,
  sre.NemethFontTest
];
