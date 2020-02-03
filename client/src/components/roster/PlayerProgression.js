import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PlayerProgression = () => {
    return (
        <Fragment>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col col-sm-10">
                                    <h3>Aaron Judge</h3>
                                </div>
                                <div className="col col-sm-2">
                                    <Link className="btn btn-primary ml-auto" to="/roster">Go Back</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row m-auto">
                                <div className="col col-sm-6">
                                    <p className="card-text"><strong>Position: RF</strong></p>
                                </div>
                                <div className="col col-sm-6">
                                    <p className="card-text"><strong>Secondary Position: OF</strong></p>
                                </div>
                            </div>
                            <div className="row m-auto">
                                <div className="col col-sm-6">
                                    <p className="card-text"><strong>Potential: A</strong></p>
                                </div>
                                <div className="col col-sm-6">
                                    <p className="card-text"><strong>Overall: 98</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col col-sm-6">
                    <h5 className="text-center">Player Progression</h5>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Year</th>
                                <th>Class</th>
                                <th>Potential</th>
                                <th>Overall</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2019</td>
                                <td>MLB</td>
                                <td>A</td>
                                <td>97</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col col-sm-6">
                    <h5 className="text-center">Roster - RF</h5>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Class</th>
                                <th>Potential</th>
                                <th>Overall</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Aaron</td>
                                <td>Hicks</td>
                                <td>MLB</td>
                                <td>B</td>
                                <td>87</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default PlayerProgression;
