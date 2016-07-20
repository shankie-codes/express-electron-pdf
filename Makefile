name := express-electron-pdf
image_name := properdesign/$(name)
# FLAGS = -v $(PWD)/sandbox:/source \
        --name $(name)

FLAGS = --name $(name)

DOCKER := docker
DOCKER_TASK := $(DOCKER) run --rm -ti -p 8080:8080
DOCKER_PROC := $(DOCKER) run -d -ti

build:
	@$(DOCKER) build -t $(image_name) .
.PHONY: build


push:
	@$(DOCKER) push $(image_name)
.PHONY: push

shell:
	@$(call task,--entrypoint=bash,)
.PHONY: shell

run:
	@$(call task,,browsersync)
.PHONY: run

test:
	@$(DOCKER) rm -vf $(name) ; $(DOCKER) build -t $(image_name) . ; $(call task,,)
.PHONY: test

###############################################################################
# Helpers                                                                     #
###############################################################################

define task
  $(DOCKER_TASK) $(FLAGS) \
                 $1 \
                 $(image_name) \
                 $2
endef

define proc
  $(DOCKER_PROC) $(FLAGS) \
                 $(image_name) \
                 $1
endef
