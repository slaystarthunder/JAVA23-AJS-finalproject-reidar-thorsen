const ErrorMessage = ({ error }) => {
  if (!error) return null;
  let errorMessage = typeof error === 'string' ? error : error.toString();
  return <div className="error-message">{errorMessage}</div>;
};

export default ErrorMessage;
