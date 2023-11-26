import React from 'react';

export class ComponentRouter {
    // Use a generic type for the map to ensure it only contains React components
    private collection: Map<string, React.ComponentType<any>> = new Map();

    // Use a generic type for the declare method to ensure type safety
    declare<C extends React.ComponentType<any>>(name: string, component: C) {
        this.collection.set(name, component);
    }

    // Use React.ReactNode as the return type for render method
    render(name: string, ref: React.MutableRefObject<any>, props: Record<string, any>): React.ReactNode {
        const Component = this.collection.get(name);
        if (Component) {
            // Correctly spread props into the component
            return <Component {...props} ref={ref} />;
        }
        return <div ref={ref}>Undefined Component {name}</div>;
    }
}
