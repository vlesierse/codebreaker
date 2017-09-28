using System;
using System.Collections.Generic;

namespace CodeBreaker.Core
{
    public class Game
    {
        public Game(Code code)
        {
            Id = Guid.NewGuid();
            Code = code;
            Attempts = new List<CodeResult>();
        }

        public Guid Id { get; set; }
        public Code Code { get; set; }
        public ICollection<CodeResult> Attempts { get; set; }
        public CodeResult EnterCode(Code code)
        {
            var result = Code.Match(code);
            Attempts.Add(result);
            return result;
        }
    }
}