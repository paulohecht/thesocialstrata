import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// route components
import App from '../../ui/App.jsx';
import Index from '../../ui/Index.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageSignUp from '../../ui/pages/AuthPageSignUp.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

import GetABuilding from '../../ui/onboarding/GetABuilding.jsx';
import ImALandlord from '../../ui/onboarding/ImALandlord.jsx';
import ImATenant from '../../ui/onboarding/ImATenant.jsx';
import FindMyBuilding from '../../ui/onboarding/FindMyBuilding.jsx';

import Neighbors from '../../ui/chat/Neighbors.jsx';
import Chat from '../../ui/chat/Chat.jsx';

import LostAndFoundList from '../../ui/lostandfound/LostAndFoundList.jsx';
import ReportLostAndFound from '../../ui/lostandfound/ReportLostAndFound.jsx';

import MaintenanceRequestList from '../../ui/maintenance/MaintenanceRequestList.jsx';
import RequestMaintenance from '../../ui/maintenance/RequestMaintenance.jsx';

import CommonAreasList from '../../ui/commonareas/CommonAreasList.jsx';
import CreateCommonArea from '../../ui/commonareas/CreateCommonArea.jsx';
import CommonAreaDetails from '../../ui/commonareas/CommonAreaDetails.jsx';

browserHistory.listen(function (location) {
    //window.ga('send', 'pageview', location.pathname);
    console.log("Page: " + location.pathname);
});

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Index} />
      <Route path="signin" component={AuthPageSignIn}/>
      <Route path="signup" component={AuthPageSignUp}/>

      <Route path="getabuilding" component={GetABuilding}/>
      <Route path="imalandlord" component={ImALandlord}/>
      <Route path="imatenant" component={ImATenant}/>
      <Route path="findmybuilding/:zip" component={FindMyBuilding}/>

      <Route path="neighbors" component={Neighbors}/>
      <Route path="chat/:userId" component={Chat}/>

      <Route path="lostandfound" component={LostAndFoundList}/>
      <Route path="reportlostandfound" component={ReportLostAndFound}/>

      <Route path="maintenance" component={MaintenanceRequestList}/>
      <Route path="requestmaintenance" component={RequestMaintenance}/>

      <Route path="commonarea" component={CommonAreasList}/>
      <Route path="createcommonarea" component={CreateCommonArea}/>
      <Route path="commonareadetails/:commonareaId" component={CommonAreaDetails}/>

    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Router>
);
