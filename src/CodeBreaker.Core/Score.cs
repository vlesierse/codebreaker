using System;

namespace CodeBreaker.Core
{
    public class Score
    {
        public Score(Guid gameId, int attempts, int duration)
        {
            GameId = gameId;
            Attempts = attempts;
            Duration = duration;
        }
        public Guid GameId { get; set; }
        public int Attempts { get; set; }
        public int Duration { get; set; }
    }
}