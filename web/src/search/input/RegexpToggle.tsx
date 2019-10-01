import React from 'react'
import RegexIcon from 'mdi-react/RegexIcon'
import { patternTypes } from '../results/SearchResults'

interface RegexpToggleProps {
    togglePatternType: (patternType: patternTypes) => void
    patternType: patternTypes
}

export default class RegexpToggle extends React.Component<RegexpToggleProps> {
    constructor(props: RegexpToggleProps) {
        super(props)
    }

    public render(): JSX.Element | null {
        return (
            <>
                <button onClick={this.toggle}>
                    <RegexIcon />
                </button>
            </>
        )
    }

    private toggle = (e: React.MouseEvent): void => {
        const newPatternType = this.props.patternType === 'literal' ? 'regexp' : 'literal'
        this.props.togglePatternType(newPatternType)
    }
}
