import {app} from "../../../index";

import {ServiceDefinition, ServiceDefinitions} from "../../../angularized/decorators/Service";

export function Service(definition: ServiceDefinition = {}) {
    return function(target: Function) {
        ServiceDefinitions.$instance.register(app, target, definition);
    };
}