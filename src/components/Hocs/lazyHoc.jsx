import React from 'react';
import Loading from '../Loading/loading';

const LazyHoc = (Component) => {
    return (
        <React.Suspense fallback={<Loading/>}>
            <Component/>
        </React.Suspense>
    )
}

export default LazyHoc;