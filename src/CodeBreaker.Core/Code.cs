using System;
using System.Linq;

namespace CodeBreaker.Core
{
    public struct Code : IEquatable<Code>
    {
        public static Code Empty = new Code();
        
        public Code(int[] digits)
        {
            Digits = digits;
        }

        public int[] Digits { get; }

        public CodeResult Match(Code code)
        {
            if (code.Equals(Code.Empty))
            {
                throw new ArgumentNullException(nameof(code));
            }

            if (code.Digits.Length != Digits.Length)
            {
                return new CodeResult(code, 0, 0);
            }

            int match = 0;
            for(int i = 0; i < Digits.Length; i++)
            {
                if (Digits[i] == code.Digits[i])
                {
                    match++;
                }
            }
            int exists = Digits.Intersect(code.Digits).Count() - match;
            if (exists < 0)
            {
                exists = 0;
            }
            return new CodeResult(code, match, exists);
        }

        public bool Equals(Code other)
        {
            return Equals((object)other);
        }

        public override bool Equals(object obj)
        {
            if (obj is Code)
            {
                var code = (Code)obj;
                if (Digits == null || code.Digits == null)
                {
                    return Digits == code.Digits;
                }
                return Enumerable.SequenceEqual(Digits, code.Digits);
            }
            return false;
        }

        public override int GetHashCode()
        {
            if (Digits == null)
            {
                return 0;
            }

            int result = 0;
            int shift = 0;
            for (int i = 0; i < Digits.Length; i++)
            {
                shift = (shift + 11) % 21;
                result ^= (Digits[i]+1024) << shift;
            }
            return result;
        }

        public static Code Generate(int positions, int minValue, int maxValue)
        {
            var code = new int[positions];
            var random = new Random();
            for(int i = 0; i < positions; i++)
            {
                code[i] = random.Next(minValue, maxValue);
            }
            return new Code(code);
        }
    }
}
