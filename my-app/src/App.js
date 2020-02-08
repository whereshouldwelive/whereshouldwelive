import React from 'react';
import logo from './logo.svg';
import { Input} from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loc1: "SW7",
      loc2: "N16",
      loc3: "W2 1UF",
      page1: false,
      page2: false
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt) {
      const value = evt.target.value;
      this.setState({
        ...this.state,
        [evt.target.name]: value
      });
    }
  handleSubmit(e){
    e.preventDefault();
    fetch("http://whereshouldwelive.herokuapp.com/find", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
    })
      .then(response => {return response.json();})
      .then(response => {
        console.log(response.postcodes[0])
        this.setState({
          ...this.state,
          resp: response.postcodes[0].code,
          page1: false
        });
        console.log(response)
      })
  }
  render() {
    return (
      <div className="App">
        {this.state.page1 && (
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <form className="form"  onSubmit={this.handleSubmit}>
              <Input name="loc1" placeholder="Placeholder" inputProps={{ 'aria-label': 'description' }} value={this.state.loc1} onChange={this.handleChange}/>
              <Input name="loc2" placeholder="Post code" inputProps={{ 'aria-label': 'description' }} value={this.state.loc2} onChange={this.handleChange}/>
              <Input name="loc3" placeholder="Post code" inputProps={{ 'aria-label': 'description' }} value={this.state.loc3} onChange={this.handleChange}/>
              <Button type="submit" variant="contained" color="secondary">
                Find flats!!
              </Button>
            </form>
            <p>
            This is {this.state.resp}
            </p>
        </header>)}
        {!this.state.page1 && this.state.page2 && (
          <div>
            <div className="header-wrapper">
              This is the header
            </div>
            <div className="wrapper">
              <div className="map">
                Sup
              </div>
              <div className="sidebar">
                <Card border="dark" style={{ width: '31rem' }} className={"bg-light text-dark"}>
                  <Card.Header>
                    Information for flats at SW7
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Average price: £530
                    </Card.Text>
                    <Card.Text>
                    Distance from A: 35min
                  </Card.Text>
                    <Card.Text>
                      Distance from B: 25min
                    </Card.Text>
                    <Card.Text>
                      Distance from C: 40min
                    </Card.Text>
                    <Button variant="primary">Flats</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        )}
        {!this.state.page1 && !this.state.page2 && (
            <div>
              <div className="header-wrapper">
                This is the header
              </div>
              <div className="wrapper">
                <div className="map">
                  Sup
                </div>
                <div className="sidebar2">
                  <CardDeck>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Card border="dark" style={{ width: '25rem' }} className={"bg-light text-dark"}>
                          <Card.Body>
                            <Card.Title>
                              Hyde Park, London W2
                            </Card.Title>
                            <Card.Text>
                              £225,000,000
                            </Card.Text>
                            <Card.Img variant="top" src="https://lid.zoocdn.com/645/430/0d4f63d83077588bf82306da9c853e793d24152d.jpg" />
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Card border="dark" style={{ width: '25rem' }} className={"bg-light text-dark"}>
                          <Card.Body>
                            <Card.Title>
                              Wilton Crescent, London SW1X
                            </Card.Title>
                            <Card.Text>
                              £82,500,000
                            </Card.Text>
                            <Card.Img variant="top" src="https://lid.zoocdn.com/645/430/fd49855d55ea0eef657721d7ba17055a75f93f69.jpg" />
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Card border="dark" style={{ width: '25rem' }} className={"bg-light text-dark"}>
                          <Card.Body>
                            <Card.Title>
                              Wilton Crescent, London SW1X
                            </Card.Title>
                            <Card.Text>
                              £82,500,000
                            </Card.Text>
                            <Card.Img variant="top" src="https://lid.zoocdn.com/645/430/fd49855d55ea0eef657721d7ba17055a75f93f69.jpg" />
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Card border="dark" style={{ width: '25rem' }} className={"bg-light text-dark"}>
                          <Card.Body>
                            <Card.Title>
                              Wilton Crescent, London SW1X
                            </Card.Title>
                            <Card.Text>
                              £82,500,000
                            </Card.Text>
                            <Card.Img variant="top" src="https://lid.zoocdn.com/645/430/fd49855d55ea0eef657721d7ba17055a75f93f69.jpg" />
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                    </ListGroup>
                  </CardDeck>
                </div>
              </div>
            </div>
        )}
      </div>
    );
  }
}

export default App;
