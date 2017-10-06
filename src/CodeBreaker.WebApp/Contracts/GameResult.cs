using System;
using System.Collections.Generic;
using CodeBreaker.Core;

namespace CodeBreaker.WebApp.Contracts
{
    public class GameResult
    {
        private readonly Game _game;

        public GameResult()
        { }

        public GameResult(Game game)
        {
            _game = game;
        }

        public Guid Id => _game.Id;
        public DateTimeOffset CreatedAt => _game.CreatedAt;
        public DateTimeOffset? FinishedAt => _game.FinishedAt;
        public Score Score => _game.Score;
        public GameOptions Options => _game.Options;
        public IEnumerable<CodeResult> Attempts => _game.Attempts;
    }
}