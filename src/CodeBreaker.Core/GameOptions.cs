namespace CodeBreaker.Core
{
    public class GameOptions
    {
        public static GameOptions Default = new GameOptions();
        
        public int Digits { get; set; } = 4;
        public int MinValue { get; set; } = 1;
        public int MaxValue { get; set; } = 5;
    }
}