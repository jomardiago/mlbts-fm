import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import Spinner from '../spinner/Spinner';

import { loadRosterAction } from '../../redux/roster/rosterActions';

const Dashboard = ({ loadRoster, roster }) => {
    const { loading, players } = roster;

    useEffect(() => {
        loadRoster();
    }, [loadRoster]);

    return loading ? <Spinner /> : (
        <Fragment>
            <div className="jumbotron">
                <p><strong>Total number of players: {players.length}</strong></p>
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