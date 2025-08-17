namespace backend.Infrastructure.Exceptions;

public class TmsBaseException : Exception
{
    public TmsBaseException() : base()
    {}

    public TmsBaseException(string message) : base(message)
    {}

    public TmsBaseException(string message, Exception inner) : base(message, inner)
    {}
}