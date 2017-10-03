import { fetch, addTask } from 'domain-task';

export const actionTypes = {
    LOAD_GAME: 'LOAD_GAME',
    START_GAME: 'START_GAME',
    LOADED_GAME: 'LOADED_GAME',
    FINISHED_GAME: 'FINISHED_GAME',
    ENTERED_CODE: 'ENTERED_CODE',
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
        dispatch({ type: actionTypes.START_GAME});
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
    isWaiting: false
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADED_GAME:
            return { ... state, id: action.game.id, attempts: action.game.attempts, score: action.game.score }
        case actionTypes.ENTERED_CODE:
            return { ... state, isWaiting: true };
        case actionTypes.RECEIVED_CODERESULT:
            return { ... state, isWaiting: false, attempts: action.attempt.game.attempts, score: action.attempt.game.score };
    }
    return state;
};
