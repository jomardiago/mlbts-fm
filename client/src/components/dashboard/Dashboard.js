import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import Spinner from '../spinner/Spinner';

import { loadRosterAction } from '../../redux/roster/rosterActions';

const Dashboard = ({ loadRoster, roster }) => {
    const { loading } = roster;

    useEffect(() => {
        loadRoster();
    }, [loadRoster]);

    return loading ? <Spinner /> : (
        <Fragment>
            <div className="jumbotron">
                Dashboard page under construction...
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    roster: state.roster
});

const mapDispatchToProps = dispatch => ({
    loadRoster: () => dispatch(loadRosterAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);