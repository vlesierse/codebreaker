namespace CodeBreaker.Core
{
    public class CodeResult
    {
        public CodeResult(Code code, int match, int exists)
        {
            Code = code.Digits;
            Match = match;
            Exists = exists;
        }
        public int[] Code { get; set; }
        public int Match { get; set; }
        public int Exists { get; set; }
        public bool Correct => Match == Code.Length;
    }
}