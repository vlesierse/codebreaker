using System;
using System.Collections.Generic;
using CodeBreaker.Core;

namespace CodeBreaker.WebApp.Contracts
{
    public class EnterCodeResult
    {
        private readonly Game _game;
        private readonly CodeResult _codeResult;

        public EnterCodeResult()
        { }

        public EnterCodeResult(CodeResult codeResult, Game game)
        {
            _game = game;
            _codeResult = codeResult;
        }

        public int[] Code => _codeResult.Code;
        public int Match => _codeResult.Match;
        public int Exists => _codeResult.Exists;
        public bool Correct => _codeResult.Correct;
        public GameResult Game => new GameResult(_game);
    }
}