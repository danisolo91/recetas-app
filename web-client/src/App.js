import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
