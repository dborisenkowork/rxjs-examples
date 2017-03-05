import {makeInjections} from "../functions/makeInjections";

import {ANGULARIZED_DEBUG_ENABLED} from "../debug";

export interface PipeFactoryDefinition
{
    name: string;
    injects?: any[],
}

export interface PipeFactoryInterface
{
    factory(...any): angular.Injectable<Function>;
}

export class PipeFactoryDefinitions
{
    public static $instance: PipeFactoryDefinitions;

    register(module: angular.IModule, target: any, definition: PipeFactoryDefinition) {
        definition = this.factoryDefinition(target, definition);

        if(ANGULARIZED_DEBUG_ENABLED) {
            console.log(`Angularized: register pipe ${definition.name}`)
        }

        let factory = (new target()).factory();

        factory['$inject'] = makeInjections(definition.injects);

        module.filter(definition.name, factory);
    }

    private factoryDefinition(target: any, definition: PipeFactoryDefinition): PipeFactoryDefinition {
        //noinspection UnnecessaryLocalVariableJS
        let newDefinition: PipeFactoryDefinition = {
            name: definition.name,
            injects: definition.injects || []
        };

        return newDefinition;
    }
}

PipeFactoryDefinitions.$instance = new PipeFactoryDefinitions();