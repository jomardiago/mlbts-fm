import React from 'react';

const ProgressingCard = ({ players, progressing }) => {
    const playerCollection = players.filter(player => player.progression.length > 1);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const playersToDisplay = playerCollection.map(player => ({ 
        ...player, 
        averageProgress: player.progression.map((progress, index) => index === 0 ? 0 : 
                         player.progression[index - 1].overall - progress.overall)
                         .reduce(reducer) / player.progression.length
    }))
    .sort((a, b) => (progressing ? a.averageProgress < b.averageProgress : a.averageProgress > b.averageProgress) ? 1 : -1)
    .filter((p, index) => index < 3);

    return (
        <div className={`card text-white ${progressing ? 'bg-success' : 'bg-danger'} mb-3`}>
            <div className="card-header">Top { progressing ? 'Progressing' : 'Regressing' } Players</div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Average { progressing ? 'Progression' : 'Regression' } </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            playersToDisplay.map((playerToDisplay, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{playerToDisplay.firstName} {playerToDisplay.lastName}</td>
                                    <td>{playerToDisplay.averageProgress}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProgressingCard;
