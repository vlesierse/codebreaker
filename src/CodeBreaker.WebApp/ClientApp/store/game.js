import { fetch, addTask } from 'domain-task';

export const actionTypes = {
    LOAD_GAME: 'LOAD_GAME',
    LOAD_SCORES: 'LOAD_SCORES',
    START_GAME: 'START_GAME',
    LOADED_GAME: 'LOADED_GAME',
    LOADED_SCORES: 'LOADED_SCORES',
    FINISHED_GAME: 'FINISHED_GAME',
    ENTERED_CODE: 'ENTERED_CODE',
    REGISTERED_NAME: 'REGISTERED_NAME',
    RECEIVED_CODERESULT: 'RECEIVED_CODERESULT'
}

export const actionCreators = {
    startGame: (options) => (dispatch) => {
        let fetchTask = fetch(`/api/game`, { method: 'POST' })
            .then(response => response.json())
            .then(data => { dispatch({ type: actionTypes.LOADED_GAME, game: data }); });
        addTask(fetchTask);
        dispatch({ type: actionTypes.START_GAME});
    },
    loadGame: (id) => (dispatch) => {
        let fetchTask = fetch(`/api/game/${id}`)
            .then(response => response.json())
            .then(data => { dispatch({ type: actionTypes.LOADED_GAME, game: data }); });
        addTask(fetchTask);
        dispatch({ type: actionTypes.LOAD_GAME});
    },
    loadScores: () => (dispatch) => {
        let fetchTask = fetch(`/api/scores`)
            .then(response => response.json())
            .then(data => { dispatch({ type: actionTypes.LOADED_SCORES, scores: data }); });
        addTask(fetchTask);
        dispatch({ type: actionTypes.LOAD_SCORES});
    },
    enterCode: (code) => (dispatch, getState) => {
        let game = getState().game;
        if (game.id) {
            let fetchTask = fetch(`/api/game/${game.id}/code`, { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(code)})
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: actionTypes.RECEIVED_CODERESULT, attempt: data });
                });
            addTask(fetchTask);
            dispatch({ type: actionTypes.ENTERED_CODE});
        }
    },
    registerScore: name => (dispatch, getState) => {
        let game = getState().game;
        if (game.id) {
            let fetchTask = fetch(`/api/scores/${game.id}`, { headers: { 'Content-Type': 'application/json' }, method: "PUT", body: JSON.stringify(name)});
            addTask(fetchTask);
            dispatch({ type: actionTypes.REGISTERED_NAME});
        }
    }
};

const initialState = {
    id: null,
    options: {
        digits: 4,
        minValue: 1,
        maxValue: 5
    },
    attempts: [],
    score: null,
    isWaiting: false,
    isScoreRegistered: false,
    scores: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADED_GAME:
            return { ... state, id: action.game.id, attempts: action.game.attempts, score: action.game.score, isScoreRegistered: action.game.score && action.game.score.name != null }
        case actionTypes.ENTERED_CODE:
            return { ... state, isWaiting: true };
        case actionTypes.RECEIVED_CODERESULT:
            return { ... state, isWaiting: false, attempts: action.attempt.game.attempts, score: action.attempt.game.score };
        case actionTypes.REGISTERED_NAME:
            return { ... state, isScoreRegistered: true };
        case actionTypes.LOADED_SCORES:
            return { ... state, scores: action.scores };
    }
    return state;
};
