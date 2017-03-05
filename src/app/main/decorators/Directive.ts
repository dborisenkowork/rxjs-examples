import {app} from "../../../index";

import {DirectiveDefinition, DirectiveDefinitions} from "../../../angularized/decorators/Directive";

export function Directive(definition: DirectiveDefinition) {
    return function(target: Function) {
        DirectiveDefinitions.$instance.register(app, <any>target, definition);
    };
}
