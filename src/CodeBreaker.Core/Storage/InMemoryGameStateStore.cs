using System;
using System.Collections.Generic;

namespace CodeBreaker.Core.Storage
{
    public class InMemoryGameStateStore : IGameStateStore
    {
        private IDictionary<Guid, Game> _games;
        
        public InMemoryGameStateStore()
        {
            _games = new Dictionary<Guid, Game>();
        }

        public Game GetGameById(Guid id)
        {
            return _games.TryGetValue(id, out var game) ? game : null;
        }

        public Game AddGame(Game game)
        {
            if (!_games.ContainsKey(game.Id))
            {
                _games.Add(game.Id, game);
            }
            return game;
        }
    }
}