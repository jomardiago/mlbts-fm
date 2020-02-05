import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';

import { loadRosterAction } from '../../redux/roster/rosterActions';

const Dashboard = ({ loadRoster, roster }) => {
    const { loading, players } = roster;

    useEffect(() => {
        loadRoster();
    }, [loadRoster]);

    return loading ? <Spinner /> : (
        <Fragment>
            <Link className="btn btn-primary" to="/roster">
                View Current Roster <span className="badge badge-light">{ players.length }</span>
            </Link>
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