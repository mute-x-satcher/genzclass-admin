import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Lazy load components
const Admin = lazy(() => import('./components/Admin'));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
       
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Admin/>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;