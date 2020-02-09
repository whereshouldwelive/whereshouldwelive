import React from 'react';
// import logo from './logo.svg';
import { Input, CircularProgress} from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleMapReact from 'google-map-react';
import logo from './wswl-logo.png';

import './App.css';

const Marker = props => {
  return <>
    <div className="pin" onMouseEnter={() => props.click()}></div>
  </>
}

class App extends React.Component {

  // makeMarkers = (resp) => {
  //   let table = []
  //
  //   // Outer loop to create parent
  //   for (let i = 0; i < resp.length; i++) {
  //     //Inner loop to create children
  //       // <Marker lat={this.state.center.lat} lng={this.state.center.lng} />
  //     table.push(<Marker lat={resp[i].lat} lng={resp[i].long} />)
  //
  //     //Create the parent and add the children
  //   }
  //   console.log(table)
  //   return (<div>{table}</div>)
  // }

  constructor(props) {
    super(props)
    this.state = {
      loc1: "SW7",
      loc2: "N16",
      loc3: "W2 1UF",
      page1: false,
      center: {
        lat:51.5074,
        lng:-0.1278
      },
      page2: 0,
      spin: false
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.hoverMarker = this.hoverMarker.bind(this);
      this.getFlatInfo = this.getFlatInfo.bind(this);
    }
    handleChange(evt) {
      const value = evt.target.value;
      this.setState({
        ...this.state,
        [evt.target.name]: value
      });
    }
  hoverMarker(p) {
    this.setState({
      ...this.state,
      page2: 1,
      idx: p
    });
  };

  getFlatInfo() {
    const obj = this.state.link
    let table = []
    console.log(obj)
      // Outer loop to create parent
    for (let flat of obj.listing) {

        //Inner loop to create children
          // <Marker lat={this.state.center.lat} lng={this.state.center.lng} />
    table.push(
      <ListGroup.Item>
        <Card border="dark" style={{ width: '25rem' }} className={"bg-light text-dark"}>
          <Card.Body>
            <Card.Title>
              {flat.displayable_address}
            </Card.Title>
            <Card.Text>
              £{flat.rental_prices.per_week} per week
            </Card.Text>
            <Card.Img variant="top" src={flat.image_645_430_url} />
          </Card.Body>
        </Card>
      </ListGroup.Item>
      )
    }
      return (<ListGroup variant="flush">{table}</ListGroup>);
    };


  findFlats(p) {
    this.setState({...this.state, spin: true});
    const link = "https://api.zoopla.co.uk/api/v1/property_listings.json?latitude=" + this.state.resp[this.state.idx].lat +  "&longitude=" + this.state.resp[this.state.idx].long + "&api_key=r69gx65afduas4x328vhqhf3&radius=5&listing_status=rent";
    fetch(link)
    .then(resp => resp.json())
    .then(resp => this.setState({
      ...this.state,
      link: resp,
      spin:false
    }))
  }

  handleSubmit(e){
    e.preventDefault();
    fetch("http://whereshouldwelive.herokuapp.com/find", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
    })
      .then(response => {return response.json();})
      .then(response => {
        this.setState({
          ...this.state,
          resp: response.postcodes,
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
        {!this.state.page1  && (
          <div className="page2">
            <div className="header-wrapper">

              <img className="image" src={logo} alt=""/>

              <h1 className="title">
                WhereShouldWeLive.com
                <form className="form"  onSubmit={this.handleSubmit}>
                <Button type="submit" variant="contained" color="secondary">
                  Find flats!!
                </Button>
              </form>
              </h1>
            </div>
            <div className="wrapper">
            <div className="map">
              <GoogleMapReact
                bootstrapURLKeys={{key:"AIzaSyBUajMUOmaG_OFJFtVI-Fb2rtTQkeWzbUg"}}
                defaultCenter={this.state.center}
                defaultZoom={12}
              >
              {this.state.resp && this.state.resp[0] && (<Marker click={() => this.hoverMarker(0)} lat={this.state.resp[0].lat} lng={this.state.resp[0].long} />)}
              {this.state.resp && this.state.resp[1] && (<Marker click={() => this.hoverMarker(1)} lat={this.state.resp[1].lat} lng={this.state.resp[1].long} />)}
              {this.state.resp && this.state.resp[2] && (<Marker click={() => this.hoverMarker(2)} lat={this.state.resp[2].lat} lng={this.state.resp[2].long} />)}
              {this.state.resp && this.state.resp[3] && (<Marker click={() => this.hoverMarker(3)} lat={this.state.resp[3].lat} lng={this.state.resp[3].long} />)}
              {this.state.resp && this.state.resp[4] && (<Marker click={() => this.hoverMarker(4)} lat={this.state.resp[4].lat} lng={this.state.resp[4].long} />)}

              </GoogleMapReact>
            </div>
              {(this.state.page2 == 0) && (
                <div className="sidebar">
                  Sup bro
                </div>)}
              {(this.state.page2 == 1) && (
                <div className="sidebar sidebar1">
                  <Card border="dark"  className={"card bg-light text-dark"}>
                    <Card.Header>
                      Information for flats at {this.state.resp[this.state.idx].code}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        Average price: £{this.state.resp[this.state.idx].price}
                      </Card.Text>
                      <Card.Text>
                      Distance from A: {this.state.resp[this.state.idx].distances[0]}min
                    </Card.Text>
                      <Card.Text>
                        Distance from B: {this.state.resp[this.state.idx].distances[1]}min
                      </Card.Text>
                      <Card.Text>
                        Distance from C: {this.state.resp[this.state.idx].distances[2]}min
                      </Card.Text>
                      <Button onClick={() => this.findFlats(this.state)} variant="primary">Flats</Button>
                    </Card.Body>
                  </Card>
                  {this.state.spin && (<div className="spinner"><CircularProgress /></div>)}
                  {this.state.link && this.getFlatInfo()}
                </div>)}
                {(this.state.page2 == 2)  && (<div className="sidebar2">
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
                )}
            </div>
          </div>
        )}
        {false && !this.state.page1 && !this.state.page2 && (
            <div>
            <div className="header-wrapper">
                <img src={logo} alt=""/>
              <h1 className="title">
                WhereShouldWeLive.com
                <form className="form"  onSubmit={this.handleSubmit}>
                <Button type="submit" variant="contained" color="secondary">
                  Find flats
                </Button>
              </form>
              </h1>
            </div>
              <div className="wrapper">


              </div>
            </div>
        )}
      </div>
    );
  }
}

export default App;
