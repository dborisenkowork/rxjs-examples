import {ANGULARIZED_DEBUG_ENABLED} from "../debug";

export function makeInjections(definitions: any[]): string[] {
    return definitions.map(definition => {
        if(typeof definition === "function") {
            if(ANGULARIZED_DEBUG_ENABLED) {
                console.log(`  + + Angularized: RESOLVE: ${definition.name}`)
            }

            if(definition.hasOwnProperty('$name')) {
                return definition['$name'];
            }else{
                console.log('Inject failed', definition);

                throw new Error(`No provider available for ${definition}`)
            }
        }else if(typeof definition === "string") {
            if(ANGULARIZED_DEBUG_ENABLED) {
                console.log(`  + + Angularized: RESOLVE: ${definition}`)
            }

            return definition;
        }else{
            console.log('Inject failed', definitions, definition);

            throw new Error('Invalid injection');
        }
    });
}