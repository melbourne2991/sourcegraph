import { escapeRegExp } from 'lodash'
import { patternTypes } from './results/SearchResults'

/**
 * Parses the query out of the URL search params (the 'q' parameter). If the 'q' parameter is not present, it
 * returns undefined.
 */
export function parseSearchURLQuery(query: string): string | undefined {
    const searchParams = new URLSearchParams(query)
    return searchParams.get('q') || undefined
}

export function parseSearchURLPatternType(query: string): patternTypes | undefined {
    const searchParams = new URLSearchParams(query)
    return (searchParams.get('patternType') as patternTypes) || undefined
}

export function searchQueryForRepoRev(repoName: string, rev?: string): string {
    return `repo:${quoteIfNeeded(`^${escapeRegExp(repoName)}$${rev ? `@${abbreviateOID(rev)}` : ''}`)} `
}

function abbreviateOID(oid: string): string {
    if (oid.length === 40) {
        return oid.slice(0, 7)
    }
    return oid
}

export function quoteIfNeeded(s: string): string {
    if (/["' ]/.test(s)) {
        return JSON.stringify(s)
    }
    return s
}
