import './App.css';
import Content from './components/Content';
import Navigation from './components/Navigation';
import AdminState from './context/admin/AdminState'

function App() {
  return (
      <AdminState>
         <Navigation/>
         <Content/>
      </AdminState>
  );
}

export default App;
