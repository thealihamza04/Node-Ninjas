import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log the error to an error reporting service here
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-base-200 px-4'>
          <div className='card w-full max-w-md bg-base-100 shadow-xl'>
            <div className='card-body p-6 md:p-8'>
              <h2 className='text-2xl font-bold text-center mb-4 text-error'>
                Something went wrong
              </h2>
              <p className='text-center mb-4'>
                We're sorry, but something went wrong. Please try refreshing the
                page or contact support if the problem persists.
              </p>
              <button
                onClick={() => window.location.reload()}
                className='btn btn-primary w-full'
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
