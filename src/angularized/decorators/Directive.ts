import {makeInjections} from "../functions/makeInjections";
import {ANGULARIZED_DEBUG_ENABLED} from "../debug";

export interface DirectiveDefinition
{
    name: string,
    injects?: any[],
    factory?: () => ng.Injectable<ng.IDirectiveFactory>,
}

export interface DirectiveFactoryInterface
{
    factory(): ng.IDirectiveFactory;
}

export class DirectiveDefinitions
{
    public static $instance: DirectiveDefinitions;

    register(module: angular.IModule, target: any, definition: DirectiveDefinition) {
        definition = this.factoryDefinition(target, definition);

        if(ANGULARIZED_DEBUG_ENABLED) {
            console.log(`Angularized: register directive ${definition.name}`)
        }

        definition.factory['$inject'] = makeInjections(definition.injects);
        definition.factory['$name'] = definition.name;

        module.directive(definition.name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }), definition.factory);
    }

    private factoryDefinition(target: any, definition: DirectiveDefinition): DirectiveDefinition {
        let newDefinition = {
            name: definition.name,
            injects: definition.injects || [],
            factory: definition.factory
        };

        if(! newDefinition.factory) {
            newDefinition.factory = (new target()).factory();
        }

        return newDefinition;
    }
}

DirectiveDefinitions.$instance = new DirectiveDefinitions();