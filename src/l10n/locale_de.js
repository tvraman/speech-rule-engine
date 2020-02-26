// Copyright 2020 Volker Sorge
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

// This work was sponsored by ETH Zurich

/**
 * @fileoverview German message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Locale.de');

goog.require('sre.Locale');
goog.require('sre.Numbers.de');


/**
 * @type {sre.Locale.Messages}
 */
sre.Locale.de = {

  MS: {
    START: 'Beginn',
    FRAC_V: 'Bruch',
    FRAC_B: 'Bruch',
    FRAC_S: 'Bruch',
    END: 'Ende',
    FRAC_OVER: 'Over',
    TWICE: 'Twice',
    NEST_FRAC: 'geschachtelt',
    ENDFRAC: 'Bruchende',
    SUPER: 'Hoch',
    SUB: 'Index',
    SUP: 'Hoch',
    SUPERSCRIPT: 'hochgestellt',
    SUBSCRIPT: 'Index',
    BASELINE: 'Grundlinie',
    BASE: 'Grund',
    NESTED: 'geschachtelt',
    NEST_ROOT: 'geschachtelt',
    STARTROOT: 'Beginn Wurzel',
    ENDROOT: 'Wurzelende',
    ROOTINDEX: 'Wurzelexponent',
    ROOT: 'Wurzel',
    INDEX: 'Exponent',
    UNDER: 'Unter',
    UNDERSCRIPT: 'Unterschrift',
    OVER: 'Über',
    OVERSCRIPT: 'Überschrift'
  },

  MS_FUNC: {
    FRAC_NEST_DEPTH: sre.Locale.vulgarNestingDepth,
    RADICAL_NEST_DEPTH: sre.Locale.nestingToString,
    COMBINE_ROOT_INDEX: function(postfix, index) {return postfix;},
    COMBINE_NESTED_FRACTION: function(a, b, c) {return a + b + c;},
    COMBINE_NESTED_RADICAL: function(a, b, c) {return a + b + c;},
    FONT_REGEXP: function(font) {
      return new RegExp('^' + font.split(/ |-/).join('( |-)') + '( |-)');
    }
  },


  MS_ROOT_INDEX: { },

  FONT: {
    'bold': 'fett',
    'bold-fraktur': 'Fraktur fett',
    'bold-italic': 'fettkursiv',
    'bold-script': 'Schreibschrift fett',
    'caligraphic': 'kalligrafisch',
    'caligraphic-bold': 'kalligrafisch fett',
    'double-struck': ['mit Doppelstrich', sre.Locale.postfixCombiner],
    'double-struck-italic': ['kursiv mit Doppelstrich', sre.Locale.postfixCombiner],
    'fraktur': 'Fraktur',
    'fullwidth': 'vollbreit',
    'italic': 'kursiv',
    'monospace': 'festbreit',
    'normal': 'normal',
    'oldstyle': 'antiquiert',
    'oldstyle-bold': 'antiquiert fett',
    'script': 'Schreibschrift',
    'sans-serif': 'serifenlos',
    'sans-serif-italic': 'serifenlos kursiv',
    'sans-serif-bold': 'serifenlos fett',
    'sans-serif-bold-italic': 'serifenlos fettkursiv',
    'unknown': 'unbekannt'
  },

  EMBELLISH: {
    // Embellishments
    // TODO: Here we need specialist combiners!
    'super': 'hoch',
    'sub': 'subskript',
    'circled': 'eingekreist',
    'parenthesized': ['in Klammern', sre.Locale.postfixCombiner],
    'period': ['Punkt', sre.Locale.postfixCombiner],
    'negative-circled': 'schwarz eingekreist',
    'double-circled': 'doppelt eingekreist',
    'circled-sans-serif': 'eingekreist serifenlos',
    'negative-circled-sans-serif': 'schwarz eingekreist serifenlos',
    'comma': ['Komma', sre.Locale.postfixCombiner],
    'squared': ['in Quadrat', sre.Locale.postfixCombiner],
    'negative-squared': ['in schwarzen Quadrat', sre.Locale.postfixCombiner]
  },

  ROLE: {
    // Infixoperators
    'addition': 'Addition',
    'multiplication': 'Multiplikation',
    'subtraction': 'Subtraktion',
    'division': 'Division',
    // Relations.
    'equality': 'Gleichung',
    'inequality': 'Ungleichung',
    'element': 'Element',
    'arrow': 'Pfeil',
    // Roles of matrices or vectors.
    'determinant': 'Determinante',
    'rowvector': 'Zeilenvektor',
    'binomial': 'binomial',
    'squarematrix': 'Quadratmatrize',
    // Roles of rows, lines, cells.
    'multiline': 'mehrzeilig',
    'matrix': 'Matrize',
    'vector': 'Vektor',
    'cases': 'Fallunterscheidung',
    'table': 'Tabelle',
    // Unknown
    'unknown': 'unbekannt'
  },


  ENCLOSE: {
    'longdiv': 'langer Bruchstrich',
    'actuarial': 'Bilanzsumme',
    'radical': 'Quadratwurzel',
    'box': 'rechteckige Umrandung',
    'roundedbox': 'abgerundete rechteckige Umrandung',
    'circle': 'kreisähnliche Umrandung',
    'left': 'senkrechte Linie links',
    'right': 'senkrechte Linie rechts',
    'top': 'waagerechte Linie oberhalb',
    'bottom': 'waagerechte Linie unterhalb',
    'updiagonalstrike': 'durchgestrichen',
    'downdiagonalstrike': 'durchgestrichen',
    'verticalstrike': 'senkrecht durchgestrichen',
    'horizontalstrike': 'durchgestrichen',
    'madruwb': 'arabisches Fakultätssymbol',
    'updiagonalarrow': 'Pfeil von links unten nach rechts oben',
    'phasorangle': 'phasor angle',
    // Unknown
    'unknown': 'langer Bruchstrich'
  },

  NAVIGATE: {
    COLLAPSIBLE: 'kollabierbar',
    EXPANDABLE: 'ausfaltbar',
    LEVEL: 'Niveau'
  },

  REGEXP: {
    TEXT: 'a-zA-Z',
    NUMBER: '((\\d{1,3})(?=(.| ))((.| )\\d{3})*(\\,\\d+)?)|^\\d*\\,\\d+|^\\d+',
    DECIMAL_MARK: '\\,',
    DIGIT_GROUP: '.',
    JOINER_SUBSUPER: ' ',
    JOINER_FRAC: ''
  },

  PLURAL_UNIT: {
    'foot': 'Fuß',
    'inch': 'Zoll'
  },

  NUMBERS: sre.Numbers.de.NUMBERS,

  ALPHABETS: {
    latinSmall: [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ],
    latinCap: [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ],
    greekSmall: [
      'nabla',  // This is here as it is small.
      'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta',
      'iota', 'kappa', 'lambda', 'my', 'ny', 'xi', 'omikron', 'pi', 'rho',
      'abschließendes sigma', 'sigma', 'tau', 'ypsilon', 'phi', 'chi', 'psi',
      'omega',
      // Symbols below
      'partielle Ableitung', 'epsilon', 'theta', 'kappa', 'phi', 'rho', 'pi'
    ],
    greekCap: [
      'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
      'Iota', 'Kappa', 'Lambda', 'My', 'Ny', 'Xi', 'Omikron', 'Pi', 'Rho',
      'Theta', // Theta symbol
      'Sigma', 'Tau', 'Ypsilon', 'Phi', 'Chi', 'Psi', 'Omega'
    ]
  },

  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function(n) {
          return n === 0 ? 'Null' : sre.Numbers.de.numberToWords(n);},
      mathspeak: function(n) {return n.toString();},
      clearspeak: function(n) {return n.toString();}},
    letter: {
      default: function(n) {return n;}
    }
  },

  ALPHABET_PREFIXES: {
    capPrefix: {default: 'groß'},
    smallPrefix: {default: ''},
    digitPrefix: {default: ''}
  },

  ALPHABET_COMBINER: sre.Locale.prefixCombiner

};
