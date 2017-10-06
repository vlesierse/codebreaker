using System;

namespace CodeBreaker.Core
{
    public class Score
    {
        public Score() { }
        public Score(Guid gameId, short attempts, int duration)
        {
            GameId = gameId;
            Attempts = attempts;
            Duration = duration;
            CreatedAt = DateTime.UtcNow;
        }
        public Guid GameId { get; set; }
        public string Name { get; set; }
        public short Attempts { get; set; }
        public int Duration { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}