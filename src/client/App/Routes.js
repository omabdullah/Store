

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import StorePage from './Pages/StorePage/StorePage';
import AboutPage from './Pages/AboutPage/AboutPage';
import PortalPage from './Pages/PortalPage/PortalPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage';
import ProductListPage from './Pages/PortalPage/ProductsPage/ProductsPage';

const Routes = ( props ) => {
    /* The <Switch> is for grouping multiple routes. If a route matches one of the paths listed
    below, the component that is being returned in that route will be chosen  */
    const { viewer } = props;
    return (
        <Switch>
            <Route exact path='/' render={ ( ) => {
                return (
                    <StorePage
                        { ...props } />
                )
            }} />
            <Route path='/checkout' render={ ( ) => {
                return (
                    <CheckoutPage
                        { ...props } />
                )
            }} />
            <Route path='/portal' render={ () => {
                const { viewer } = props;
                return viewer && viewer.role ? (
                    <PortalPage
                        { ...props } />
                ) : <Redirect to={ '/' } />
            }} />
            <Route path='/about' render={ () => {
                return (
                    <AboutPage
                        { ...props } />
                )
            }} />
            <Route exact path='/login' render={ () => {
                const { viewer } = props;
                return !viewer ? (
                    <LoginPage
                        { ...props } />
                ) : <Redirect to={ '/' } />
            }} />
            <Route exact path='/sign-up' render={ () => {
                const { viewer } = props;
                return !viewer ? (
                    <SignUpPage
                        { ...props } />
                ) : <Redirect to={ '/' } />
            }} />
            <Route exact path='/sign-out' render={ () => {
                localStorage.removeItem( 'ACTIVE_USER' );
                return (
                    <Redirect to="/" />
                )
            }} />
        </Switch>
    )
};

export default Routes;