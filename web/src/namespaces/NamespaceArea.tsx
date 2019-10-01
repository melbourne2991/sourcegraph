import { ExtensionsControllerProps } from '../../../shared/src/extensions/controller'
import * as GQL from '../../../shared/src/graphql/schema'
import { ThemeProps } from '../theme'
import { RouteDescriptor } from '../util/contributions'
import { patternTypes } from '../search/results/SearchResults'

/**
 * Properties passed to all page components in the namespace area.
 */
export interface NamespaceAreaContext extends ExtensionsControllerProps, ThemeProps {
    namespace: Pick<GQL.Namespace, '__typename' | 'id' | 'url'>

    authenticatedUser: GQL.IUser | null
    patternType: patternTypes
}

export interface NamespaceAreaRoute extends RouteDescriptor<NamespaceAreaContext> {}
