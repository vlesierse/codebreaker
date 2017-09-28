using System;
using Xunit;

namespace CodeBreaker.Core
{
    public class CodeTest
    {
        [Fact]
        public void Generate_ReturnsValidCode()
        {
            var code = Code.Generate(10, 0, 1);
            Assert.NotEqual(Code.Empty, code);
            Assert.Equal(10, code.Digits.Length);
            foreach(var digit in code.Digits)
            {
                Assert.InRange(digit, 0, 1);
            }
        }

        [Fact]
        public void Match_EmptyThrowsArgumentNullException()
        {
            var code = new Code(new [] {1, 2});
            Assert.Throws<ArgumentNullException>(() => code.Match(Code.Empty));
        }

        [Fact]
        public void Match_ResultsCorrect()
        {
            var code = new Code(new [] {1, 2});
            var result = code.Match(new Code(new [] { 1, 2 }));
            Assert.NotNull(result);
            Assert.Equal(result.Match, 2);
            Assert.Equal(result.Exists, 0);
            Assert.True(result.Correct);
        }

        [Fact]
        public void Match_ResultsExists()
        {
            var code = new Code(new [] {1, 2});
            var result = code.Match(new Code(new [] { 2, 1 }));
            Assert.NotNull(result);
            Assert.Equal(result.Match, 0);
            Assert.Equal(result.Exists, 2);
            Assert.False(result.Correct);
        }

        [Fact]
        public void Match_ResultsExistsAndMatch()
        {
            var code = new Code(new [] {1, 2, 3});
            var result = code.Match(new Code(new [] { 2, 1, 3 }));
            Assert.NotNull(result);
            Assert.Equal(result.Match, 1);
            Assert.Equal(result.Exists, 2);
            Assert.False(result.Correct);
        }

        [Fact]
        public void Equals_TrueWithBothEmpty()
        {
            var code = Code.Empty;
            Assert.Equal(Code.Empty, code);
        }

        [Fact]
        public void GetHashCode_IgnorsOrder()
        {
            var codeA = new Code(new [] { 1, 2, 3 });
            var codeB = new Code(new [] { 2, 1, 3 });
            Assert.NotEqual(codeA.GetHashCode(), codeB.GetHashCode());
        }

        [Fact]
        public void GetHashCode_EmptyIsZero()
        {
            var code = Code.Empty;
            Assert.Equal(0, code.GetHashCode());
        }
    }
}
