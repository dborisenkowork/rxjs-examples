import {app} from "../../../index";

import {FactoryDefinition, FactoryDefinitions, FactoryInterface} from "../../../angularized/decorators/Factory";

export function Factory(definition: FactoryDefinition) {
    return function(target: Function) {
        FactoryDefinitions.$instance.register(app, <any>target, definition);
    };
}
