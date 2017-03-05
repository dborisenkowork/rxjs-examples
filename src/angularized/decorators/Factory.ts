import {makeInjections} from "../functions/makeInjections";

import {ANGULARIZED_DEBUG_ENABLED} from "../debug";
import {randomId} from "../functions/randomId";

export interface FactoryDefinition
{
    service: Function,
    name?: string;
    injects?: string[],
}

export interface FactoryInterface
{
    factory(...any): ng.Injectable<Function>;
}

export class FactoryDefinitions
{
    public static $instance: FactoryDefinitions;

    register(module: ng.IModule, target: any, definition: FactoryDefinition) {
        definition = this.factoryDefinition(target, definition);

        if(ANGULARIZED_DEBUG_ENABLED) {
            console.log(`Angularized: register factory ${definition.name}`)
        }

        let factory = (new target()).factory();

        factory['$inject'] = makeInjections(definition.injects);
        definition.service['$name'] = definition.name;

        module.factory(definition.name, factory);
    }

    private factoryDefinition(target: any, definition: FactoryDefinition): FactoryDefinition {
        let newDefinition: FactoryDefinition = {
            service: definition.service,
            name: definition.name || target['$name'] || definition.service['$name'] || definition.service.name,
            injects: definition.injects || []
        };

        if(newDefinition.name.length <= 3) {
            newDefinition.name = randomId(32);
        }

        newDefinition.name = newDefinition + '_' + randomId(5);

        return newDefinition;
    }
}

FactoryDefinitions.$instance = new FactoryDefinitions();