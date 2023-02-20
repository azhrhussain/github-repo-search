import React from 'react';
import { Route, Routes } from 'react-router-dom';

const Search = React.lazy(() => import('./../app/pages/SearchRepository'));
const NotFound = React.lazy(() => import('./../app/pages/NotFound'));

function AppRoutes() {
    return (

        <Routes>
            <Route path='/' element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Search />
                </React.Suspense>
            }></Route>
            <Route path="*" element={<NotFound />} />
        </Routes>

    );
}

export default AppRoutes;
