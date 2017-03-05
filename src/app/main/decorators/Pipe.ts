import {app} from "../../../index";

import {PipeFactoryDefinition, PipeFactoryDefinitions} from "../../../angularized/decorators/Pipe";

export function Pipe(definition: PipeFactoryDefinition) {
    return function(target: Function) {
        PipeFactoryDefinitions.$instance.register(app, <any>target, definition);
    };
}
