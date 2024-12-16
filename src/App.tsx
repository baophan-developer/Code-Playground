import './App.css';
import Pane from './components/Pane';
import Playground from './components/Playground';
import Container from './Layout/Container';

function App() {
    return (
        <Container>
            <Pane />
            <Playground />
        </Container>
    );
}

export default App;
