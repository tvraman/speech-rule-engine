#
# Makefile for Speech Rule Engine
# Copyright 2014-2016, Volker Sorge <Volker.Sorge@gmail.com>
#

MODULE_NAME = node_modules
ifneq ($(wildcard ./$(MODULE_NAME)/.*),)
PREFIX = $(abspath .)
else
PREFIX =$(HOME)
endif

# Nodejs location.
NODEJS = node
NODE_MODULES = $(PREFIX)/$(MODULE_NAME)

# Ideally, no changes necessary beyond this point!
SRC_DIR = $(abspath ./src)
BIN_DIR = $(abspath ./bin)
LIB_DIR = $(abspath ./lib)
SRC = $(SRC_DIR)/*/*.js
TARGET = $(LIB_DIR)/sre.js
DEPS = $(SRC_DIR)/deps.js
BROWSER = $(LIB_DIR)/sre_browser.js
MATHJAX = $(LIB_DIR)/mathjax-sre.js
SEMANTIC = $(LIB_DIR)/semantic.js
SEMANTIC_NODE = $(LIB_DIR)/semantic-node.js
ENRICH = $(LIB_DIR)/enrich.js

START = $(BIN_DIR)/sre
INTERACTIVE = $(LIB_DIR)/sre4node.js
JSON_DIR = $(SRC_DIR)/mathmaps
MAPS = functions symbols units
IEMAPS_FILE = $(JSON_DIR)/mathmaps_ie.js

TEST_DIR = $(abspath ./tests)
TEST_TARGET = $(LIB_DIR)/test.js
TEST_DEPS = $(TEST_DIR)/deps.js
TEST = $(BIN_DIR)/test_sre
TEST_SRC = $(TEST_DIR)/*.js

##################################################################
# Error flags.
# Compiling as rigidly as possible.
# (Currently we use automatically all)
##################################################################
CLOSURE_ERRORS = accessControls ambiguousFunctionDecl checkEventfulObjectDisposal checkRegExp checkTypes checkVars conformanceViolations const constantProperty deprecated deprecatedAnnotations duplicateMessage es3 es5Strict externsValidation fileoverviewTags globalThis internetExplorerChecks invalidCasts misplacedTypeAnnotation missingGetCssName missingProperties missingProvide missingRequire missingReturn msgDescriptions newCheckTypes nonStandardJsDocs suspiciousCode strictModuleDepCheck typeInvalidation undefinedNames undefinedVars unknownDefines unusedLocalVariables unusedPrivateMembers uselessCode useOfGoogBase underscore visibility # * reportUnknownTypes
MAKE_ERROR_FLAG = --jscomp_error=$(error)
ERROR_FLAGS = $(foreach error, $(CLOSURE_ERRORS), $(MAKE_ERROR_FLAG))

##################################################################
# Extern files.
# (Currently not used as they seem to be included automatically now.)
##################################################################
EXTERN_FILES = $(shell find $(SRC_DIR) -type f -name 'externs.js')
MAKE_EXTERN_FLAG = --externs=$(extern)
EXTERN_FLAGS = $(foreach extern, $(EXTERN_FILES), $(MAKE_EXTERN_FLAG))

COMPILER_FLAGS = $(EXTERN_FLAGS) $(ERROR_FLAGS)


## Node JS modules
# Closure compiler in nodejs.
# Linter in nodejs. 
CLOSURE_LIB_NAME = google-closure-library
CLOSURE_LIB = $(NODE_MODULES)/$(CLOSURE_LIB_NAME)
CLOSURE_ROOT = $(CLOSURE_LIB)/closure/bin/build
COMPILER_JAR = $(NODE_MODULES)/google-closure-compiler/compiler.jar
CLOSURE_COMPILER = java -jar $(COMPILER_JAR) --dependency_mode=STRICT $(CLOSURE_LIB)/closure/goog/base.js $(ERROR_FLAGS) $(EXTERN_FLAGS) '!**externs.js'
DEPSWRITER = python $(CLOSURE_ROOT)/depswriter.py

LINT_EXCLUDE_FILES = deps.js,$(IEMAPS_FILE)

LINT_ROOT = $(NODE_MODULES)/closure-linter-wrapper/tools/
GJSLINT = python $(LINT_ROOT)/gjslint.py --unix_mode --strict --jsdoc -x '$(LINT_EXCLUDE_FILES)' -r
FIXJSSTYLE = python $(LINT_ROOT)/fixjsstyle.py --strict --jsdoc -x '$(LINT_EXCLUDE_FILES)' -r

#######################################################################3

all: directories deps compile start_files

directories: $(BIN_DIR)

$(BIN_DIR):
	mkdir -p $(BIN_DIR)

lint:
	$(GJSLINT) $(SRC_DIR)
	$(GJSLINT) $(TEST_DIR)


fixjsstyle:
	$(FIXJSSTYLE) $(SRC_DIR)
	$(FIXJSSTYLE) $(TEST_DIR)


compile: $(TARGET)

$(TARGET): $(SRC)
	@echo Compiling Speech Rule Engine
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Cli --js_output_file=$(TARGET) $^

deps: $(DEPS)

$(DEPS):
	@echo Building Javascript dependencies $(DEPS)
	@$(DEPSWRITER) --root_with_prefix="$(SRC_DIR) $(SRC_DIR)" > $(DEPS)


start_files: directories $(START) $(INTERACTIVE)

start: $(START)

$(START): 
	@echo "Making startup script."
	@echo "#!/bin/bash" > $@
	@echo "## This script is automatically generated. Do not edit!" >> $@
	@echo "\nexport SRE_JSON_PATH=$(JSON_DIR)\n" >> $@
	@echo $(NODEJS) $(TARGET) "\$$@" >> $@
	@chmod 755 $@


interactive: directories $(INTERACTIVE) deps

$(INTERACTIVE): 
	@echo "Making interactive script."
	@echo "// This file is automatically generated. Do not edit!\n" > $@
	@echo "require('google-closure-library');" >> $@ 
	@echo "// Rewrite google closure script for our purposes." >> $@
	@echo "global.CLOSURE_IMPORT_SCRIPT = function(src, opt_sourceText) {" >> $@
	@echo "  if (opt_sourceText === undefined) {" >> $@
	@echo "    require((src[0] === '/' ? '' : './../') + src);" >> $@
	@echo "  } else {" >> $@
	@echo "    eval(opt_sourceText);" >> $@
	@echo "  }" >> $@
	@echo "  return true;" >> $@
	@echo "};" >> $@
	@echo "process.env.SRE_JSON_PATH = '$(JSON_DIR)';" >> $@
	@echo "require('$(DEPS)');" >> $@ 
	@echo "goog.require('sre.System');" >> $@
	@echo "sre.System.getInstance().setupEngine({'mode': sre.Engine.Mode.ASYNC});" >> $@

clean: clean_test clean_semantic clean_browser clean_enrich clean_mathjax
	rm -f $(TARGET)
	rm -f $(DEPS)
	rm -f $(START)
	rm -f $(INTERACTIVE)
	$(foreach map, $(MAPS), rm -rf $(LIB_DIR)/$(map))


##################################################################
# Test environment.
##################################################################
# Extern files.
##################################################################
TEST_EXTERN_FILES = $(shell find $(TEST_DIR) -type f -name 'externs.js')
TEST_FLAGS = $(foreach extern, $(TEST_EXTERN_FILES), $(MAKE_EXTERN_FLAG))

test_deps: $(TEST_DEPS)

$(TEST_DEPS):
	@echo Building Javascript dependencies in test directory $(TEST_DEPS)
	@$(DEPSWRITER) --root_with_prefix="$(TEST_DIR) $(TEST_DIR)" > $(TEST_DEPS)

test: directories test_deps deps test_compile test_script run_test

test_compile: $(TEST_TARGET)

$(TEST_TARGET): $(TEST_SRC) $(SRC)
	@echo Compiling test version of Speech Rule Engine
	@$(CLOSURE_COMPILER) $(TEST_FLAGS) --entry_point=goog:sre.Tests --js_output_file=$(TEST_TARGET) $^

test_script: $(TEST)

$(TEST): 
	@echo "Making test script."
	@echo "#!/bin/bash" > $@
	@echo "## This script is automatically generated. Do not edit!" >> $@
	@echo "\nexport SRE_JSON_PATH=$(JSON_DIR)\n" >> $@
	@echo $(NODEJS) $(TEST_TARGET) "\$$@" >> $@
	@chmod 755 $@

run_test:
	@$(TEST)

clean_test:
	rm -f $(TEST_TARGET)
	rm -f $(TEST_DEPS)
	rm -f $(TEST)


##################################################################
# Publish the API via npm.
##################################################################

publish: api maps

maps: $(MAPS)

$(MAPS): 
	cp -R $(JSON_DIR)/$@ $(LIB_DIR)/$@

iemaps:
	@echo 'sre.BrowserUtil.mapsForIE = {' > $(IEMAPS_FILE)
	@for dir in $(MAPS); do\
		for i in $(JSON_DIR)/$$dir/*.json; do\
			echo '"'`basename $$i`'": '  >> $(IEMAPS_FILE); \
			cat $$i >> $(IEMAPS_FILE); \
			echo ','  >> $(IEMAPS_FILE); \
		done; \
	done
	@head -n -1 $(IEMAPS_FILE) > $(IEMAPS_FILE).tmp
	@mv $(IEMAPS_FILE).tmp $(IEMAPS_FILE)
	@echo '}\n' >> $(IEMAPS_FILE)

api: $(SRC)
	@echo Compiling Speech Rule Engine API
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Api --js_output_file=$(TARGET) $^


##################################################################
# Other useful targets.
##################################################################

browser: $(SRC)
	@echo Compiling browser ready Speech Rule Engine
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Browser --js_output_file=$(BROWSER) $^

clean_browser:
	rm -f $(BROWSER)

mathjax: $(SRC)
	@echo Compiling MathJax ready Speech Rule Engine
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Mathjax --js_output_file=$(MATHJAX) $^

clean_mathjax:
	rm -f $(MATHJAX)

semantic: $(SRC)
	@echo Compiling browser ready Semantic Tree API
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Semantic --js_output_file=$(SEMANTIC) $^

clean_semantic:
	rm -f $(SEMANTIC)

semantic_node: $(SRC)
	@echo Compiling Semantic Tree API for Node
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.SemanticApi --js_output_file=$(SEMANTIC_NODE) $^

clean_semantic_node:
	rm -f $(SEMANTIC_NODE)

enrich: $(SRC)
	@echo Compiling browser ready MathML Enrichment API
	@$(CLOSURE_COMPILER) --entry_point=goog:sre.Enrich --js_output_file=$(ENRICH) $^

clean_enrich:
	rm -f $(ENRICH)

emacs: publish
	@cp $(TARGET) ../emacs-math-speak/
