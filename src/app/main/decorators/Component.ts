import {app} from "../../../index";

import {ComponentDefinitions, ComponentDefinition} from "../../../angularized/decorators/Component";

export function Component(definition: ComponentDefinition) {
    return function(target: Function) {
        ComponentDefinitions.$instance.register(app, target, definition);
    };
}
