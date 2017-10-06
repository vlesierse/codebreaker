using System;
using System.Collections.Generic;

namespace CodeBreaker.Core
{
    public class Game
    {
        public Game(GameOptions options)
        {
            Id = Guid.NewGuid();
            Code = Code.Generate(options.Digits, options.MinValue, options.MaxValue);
            Options = options;
            Attempts = new List<CodeResult>();
            CreatedAt = DateTimeOffset.UtcNow;
        }

        public Guid Id { get; set; }
        public Code Code { get; set; }
        public GameOptions Options { get; set; }
        public ICollection<CodeResult> Attempts { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? FinishedAt { get; set; }
        public Score Score { get; set; }
        public int? Duration => (int)FinishedAt?.Subtract(CreatedAt).TotalSeconds;
        public CodeResult EnterCode(Code code)
        {
            var result = Code.Match(code);
            Attempts.Add(result);
            if (result.Correct) {
                FinishedAt = DateTimeOffset.UtcNow;
                Score = new Score(Id, (short)Attempts.Count, Duration.Value);
            }
            return result;
        }
    }
}