import { LoadingSpinner } from '@sourcegraph/react-loading-spinner'
import { PieChart, Pie, Tooltip, ResponsiveContainer, PieLabelRenderProps, Cell } from 'recharts'
import ChartLineIcon from 'mdi-react/ChartLineIcon'
import React, { useCallback, useState, useMemo } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { isErrorLike, ErrorLike } from '../../../../../shared/src/util/errors'
import { numberWithCommas } from '../../../../../shared/src/util/strings'
import { buildSearchURLQuery } from '../../../../../shared/src/util/url'
import { Form } from '../../../components/Form'
import { useSearchResultsStats } from './useSearchResultsStats'
import { SearchHelpDropdownButton } from '../../../search/input/SearchHelpDropdownButton'

interface Props extends RouteComponentProps<{}> {}

const LOADING = 'loading' as const

const COLORS = ['#278389', '#f16321', '#753fff', '#0091ea', '#00c853', '#ffab00', '#ff3d00', '#ff7700']

const labelRenderer = (props: PieLabelRenderProps): string => props.name

/**
 * Shows statistics about the results for a search query.
 */
export const SearchStatsPage: React.FunctionComponent<Props> = ({ location, history }) => {
    const query = new URLSearchParams(location.search).get('q') || ''
    const [uncommittedQuery, setUncommittedQuery] = useState(query)
    const onUncommittedQueryChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(e => {
        setUncommittedQuery(e.currentTarget.value)
    }, [])
    const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
        e => {
            e.preventDefault()
            history.push({ ...location, search: new URLSearchParams({ q: uncommittedQuery }).toString() })
        },
        [history, location, uncommittedQuery]
    )

    const stats = useSearchResultsStats(query + ' count:99999999')
    const data:
        | typeof LOADING
        | ErrorLike
        | {
              name: string
          }[] = useMemo(() => {
        if (stats === LOADING || isErrorLike(stats)) {
            return stats
        }
        return stats.languages.slice(0, COLORS.length).map(({ name, totalBytes }, i) => ({
            name,
            value: totalBytes,
            color: COLORS[i % COLORS.length],
        }))
    }, [stats])

    const urlToSearchWithExtraQuery = useCallback(
        (extraQuery: string) => `/search?${buildSearchURLQuery(`${query} ${extraQuery}`)}`,
        [query]
    )

    return (
        <div className="search-stats-page container mt-4">
            <header className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="d-flex align-items-center mb-0">
                    <ChartLineIcon className="icon-inline mr-2" /> Code statistics
                </h2>
            </header>
            <Form onSubmit={onSubmit} className="form">
                <div className="form-group d-flex align-items-stretch">
                    <input
                        id="stats-page__query"
                        className="form-control mr-2 flex-1"
                        type="search"
                        placeholder="Enter a Sourcegraph search query"
                        value={uncommittedQuery}
                        onChange={onUncommittedQueryChange}
                        autoCapitalize="off"
                        spellCheck={false}
                        autoCorrect="off"
                        autoComplete="off"
                    />
                    {uncommittedQuery !== query && (
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    )}
                    <SearchHelpDropdownButton />
                </div>
            </Form>
            <hr className="my-3" />
            {data === LOADING ? (
                <LoadingSpinner className="icon-inline" />
            ) : isErrorLike(data) ? (
                <div className="alert alert-danger">{data.message}</div>
            ) : (
                <div className="card">
                    <h4 className="card-header">Languages</h4>
                    {data.length > 0 ? (
                        <div className="d-flex">
                            <div className="flex-0 border-right">
                                <table className="search-stats-page__table table mb-0 border-top-0">
                                    <thead>
                                        <tr className="small">
                                            <th>
                                                <span className="sr-only">Language</span>
                                            </th>
                                            <th>CLOC</th>
                                            <th>
                                                <span className="sr-only">Percent</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(({ name, value, percent }, i) => (
                                            <tr key={name || i}>
                                                <td>
                                                    <Link to={urlToSearchWithExtraQuery(`lang:${name.toLowerCase()}`)}>
                                                        {name}
                                                    </Link>
                                                </td>
                                                <td>{numberWithCommas(value)}</td>
                                                <td>{(value % 1000) / 10}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <ResponsiveContainer className="flex-1" minHeight={600}>
                                <PieChart>
                                    <Pie dataKey="value" isAnimationActive={false} data={data} label={labelRenderer}>
                                        {data.map((entry, i) => (
                                            <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip animationDuration={0} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="card-body text-muted">No language statistics available.</div>
                    )}
                </div>
            )}
        </div>
    )
}
