using System;
using CodeBreaker.Core.Storage;

namespace CodeBreaker.Core
{
    public class GameManager : IGameManager
    {
        private readonly IGameStateStore _store;

        public GameManager(IGameStateStore store)
        {
            _store = store;
        }

        public Game NewGame(GameOptions options)
        {
            // Generate code
            var code = Code.Generate(options.Digits, options.MinValue, options.MaxValue);
            return _store.AddGame(new Game(options));
        }

        public Game LoadGame(Guid id)
        {
            return _store.GetGameById(id);
        }

        public Game SaveGame(Game game)
        {
            return game;
        }
    }
}