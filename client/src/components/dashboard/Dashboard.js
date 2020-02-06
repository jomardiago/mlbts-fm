import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ProgressingRegressingCard from './ProgressingRegressingCard';

import { loadRosterAction } from '../../redux/roster/rosterActions';

const Dashboard = ({ loadRoster, roster }) => {
    const { loading, players } = roster;

    useEffect(() => {
        loadRoster();
    }, [loadRoster]);

    return loading ? <Spinner /> : (
        <Fragment>
            <Link className="btn btn-outline-primary" to="/roster">
                View Current Roster <span className="badge badge-primary">{ players.length }</span>
            </Link>
            <div className="row mt-5">
                <div className="col col-sm-6">
                    <ProgressingRegressingCard players={players} progressing />
                </div>
                <div className="col col-sm-6">
                    <ProgressingRegressingCard players={players} />
                </div>
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