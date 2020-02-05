import React from 'react';
import { Link } from 'react-router-dom';

const RosterTableActions = ({ handleFilterChange, handleSortByOverall, handleSearchTextChange }) => {
    return (
        <div className="roster-actions mb-2">
            <div className="row">
                <div className="col col-sm-2">
                    <Link type="button" className="btn btn-outline-primary" to="/roster/create-player">Add New Player</Link>
                </div>
                <div className="col col-sm-4">
                    <div className="form-group">
                        <select className="form-control" id="filterByPosition" onChange={e => handleFilterChange(e)}>
                            <option value="">Filter By Position or League</option>
                            <option value="SP">SP</option>
                            <option value="RP">RP</option>
                            <option value="CP">CP</option>
                            <option value="C">C</option>
                            <option value="1B">1B</option>
                            <option value="2B">2B</option>
                            <option value="3B">3B</option>
                            <option value="SS">SS</option>
                            <option value="LF">LF</option>
                            <option value="CF">CF</option>
                            <option value="RF">RF</option>
                            <option value="MLB">MLB</option>
                            <option value="AAA">AAA</option>
                            <option value="AA">AA</option>
                            <option value="A">A</option>
                        </select>
                    </div>
                </div>
                <div className="col col-sm-3">
                    <div className="form-group">
                        <select className="form-control" id="sortByOverall" onChange={e => handleSortByOverall(e)}>
                            <option value="">Sort By Overall</option>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                    </div>
                </div>
                <div className="col col-sm-3">
                    <div className="form-group">
                        <input 
                            id="searchText"
                            name="searchText"
                            onChange={e => handleSearchTextChange(e)}
                            type="text"
                            className="form-control" 
                            placeholder="Search Table By Name"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RosterTableActions;
