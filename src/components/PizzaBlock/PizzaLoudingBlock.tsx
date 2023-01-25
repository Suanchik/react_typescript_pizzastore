import React from 'react'
import ContentLoader from 'react-content-loader'

function PizzaLoudingBlock() {
    return (
        <ContentLoader
            className="pizza-block"
            speed={0}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="134" cy="139" r="126" />
            <rect x="-2" y="286" rx="3" ry="3" width="280" height="23" />
            <rect x="0" y="320" rx="6" ry="6" width="280" height="84" />
            <rect x="-1" y="422" rx="3" ry="3" width="76" height="32" />
            <rect x="144" y="419" rx="20" ry="20" width="134" height="41" />
        </ContentLoader>
    )
}

export default PizzaLoudingBlock;
