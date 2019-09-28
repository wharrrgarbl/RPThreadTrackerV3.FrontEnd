// @ts-check
// #region imports
import React from 'react';
import { Route } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import LoadingIndicator from '../loading/LoadingIndicator';
import Style from './_styles';
import { useThreadContext } from '~/display/containers/ThreadContext';
// #endregion imports

const BreadcrumbWrapper = () => {
	const { threadsLoading } = useThreadContext();
	return (
		<Style className="breadcrumb-wrapper">
			{threadsLoading && (
				<div data-spec="header-loading-indicator" className="float-right">
					<LoadingIndicator className="invert" />
				</div>
			)}
			<Route path="/:path" component={Breadcrumbs} />
		</Style>
	);
};

export default BreadcrumbWrapper;
