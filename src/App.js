import React, { Component} from 'react';
import './App.css';

class App extends Component {
    foo = () => 'Bari';
    render() {
        const name = 'John Doe';
        const loading = false;
        if (loading) {
            return <h4>Loading</h4>;
        }
        return (
            <div className="App">
                <h1>Hello {name} {this.foo()}</h1>
            </div>
        );
    }
}

export default App;
