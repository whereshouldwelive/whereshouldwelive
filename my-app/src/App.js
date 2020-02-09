import React from 'react';
// import logo from './logo.svg';
import { Input, CircularProgress, TextField} from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Slider from "@material-ui/core/Slider";
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleMapReact from 'google-map-react';
import logo from './wswl-logo.png';
import bluelogo from './blue_logo.png';
import PrimarySearchAppBar from "./NavBar";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import rotate from './rotate.png';
import plus from './plus_button.png';
import { shadows } from '@material-ui/system';
import submit from './submit_button.png';

import './App.css';

const Marker = props => {
  return <>
    <div style={{opacity: props.op}} className="pin" onMouseEnter={() => props.click()}></div>
  </>
}

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];



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
      page1: 2,
      center: {
        lat:51.5074,
        lng:-0.1278
      },
      page2: 0,
      spin: false,
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSubmit2 = this.handleSubmit2.bind(this);
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
      link: null,
      idx: p
    });
  };

  getFlatInfo() {
    const obj = this.state.link
    let table = []
    console.log(obj)
      // Outer loop to create parent
    for (let flat of obj.listing) {
      if (flat.displayable_address.includes('parking') || flat.displayable_address.includes('Parking')) {
        continue;
      }
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
              £{flat.rental_prices.per_month} per month
            </Card.Text>
            <a href={flat.details_url}>
              <Card.Img variant="top" src={flat.image_645_430_url} />
            </a>
          </Card.Body>
        </Card>
      </ListGroup.Item>
      )
    }
      return (<ListGroup variant="flush">{table}</ListGroup>);
    };


  findFlats(p) {
    this.setState({...this.state, spin: true});
    const link = "https://api.zoopla.co.uk/api/v1/property_listings.json?latitude=" + this.state.resp[this.state.idx].lat +  "&longitude=" + this.state.resp[this.state.idx].lon + "&api_key=9kqv4jsv6cw3y27jdpdrz7ve&radius=1&listing_status=rent&maximum_beds=3&order_by=price&ordering=ascending";
    fetch(link)
    .then(resp => resp.json())
    .then(resp => this.setState({
      ...this.state,
      link: resp,
      spin:false
    }))
  }
  handleSubmit2(e) {
    e.preventDefault();
    this.handleSubmit()
  }
  handleSubmit(){
    // e.preventDefault();
    this.setState({
      ...this.state,
      page1:1,
    });
    fetch("http://whereshouldwelive.herokuapp.com/find?loc1=" +
        this.state.loc1 + "&loc2=" + this.state.loc2 + "&loc3=" + this.state.loc3, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
    })
      .then(response => {return response.json();})
      .then(response => {
        this.setState({
          ...this.state,
          resp: response.Postcodes,
          coords: response.usr_input,
          page1: 0
        });
        console.log(response)
      })
  }

  render() {
    return (
      <div className="App">

        {(this.state.page1 == 2) && (
          <header className="App-header">
              <img className={"bluelogo"} src={bluelogo} alt=""/>
              <div className="bigWrapper">
              <p className={"ourtitle"}><strong>
              where should we live</strong>
              </p>
              <div className="allTheText">
              <div>
                <div>
                  <div className={"details ourtitle"}>No. of bedrooms </div>
                  <TextField placeholder={3} inputProps={{ style: {textAlign: 'center'} }} InputProps={{disableUnderline:true}}  className="smallfield"/>
                </div>
              </div>
              <div >
                <div className={"details ourtitle"}>Work locations</div>
                <div className={"locs"}>
                  <TextField name="loc1" value={this.state.loc1} onChange={this.handleChange} inputProps={{ style: {textAlign: 'center'} }} InputProps={{disableUnderline:true}} className="bigfield"/>
                  <TextField
                  name="loc2"
                  onChange={this.handleChange}
                  value={this.state.loc2}
                  inputProps={{ style: {textAlign: 'center'} }}
                  InputProps={{disableUnderline:true}} className="bigfield"/>
                  <TextField name="loc3" onChange={this.handleChange} value={this.state.loc3} inputProps={{ style: {textAlign: 'center'} }} InputProps={{disableUnderline:true}} className="bigfield"/>
                  <TextField disabled inputProps={{ style: {fontSize: '20px', color: 'gray', textAlign: 'center'} }} InputProps={{disableUnderline:true}} className="smallfield" defaultValue="+" />
                </div>
                <Button id="submit-button" type="submit" onClick={() => {this.setState({
                  ...this.state,
                  page1: 0,
                });
                  this.handleSubmit();}}><img src={submit} alt ="submit"/></Button>
              </div>
              </div>
              </div>
              {
            // <form className="form"  onSubmit={this.handleSubmit}>
            //   <Input name="loc1" placeholder="Placeholder" inputProps={{ 'aria-label': 'description' }} value={this.state.loc1} onChange={this.handleChange}/>
            //   <Input name="loc2" placeholder="Post code" inputProps={{ 'aria-label': 'description' }} value={this.state.loc2} onChange={this.handleChange}/>
            //   <Input name="loc3" placeholder="Post code" inputProps={{ 'aria-label': 'description' }} value={this.state.loc3} onChange={this.handleChange}/>
            //   <Button type="submit" variant="contained" color="secondary" onClick={() => this.setState({
            //       ...this.state,
            //       page1: false,
            //   })}>
            //     Search
            //   </Button>
            // </form>
          }
        </header>)}
        {(this.state.page1 == 0) && (
          <div className="page2">
            <div className="header-wrapper">
                <PrimarySearchAppBar onButtonClick={() => this.handleSubmit()} loadHomePage={() => this.setState({
                    ...this.state,
                    page1: 2,
                })}/>

            </div>
            <div className="wrapper">
            <div className="map">
              <GoogleMapReact
                bootstrapURLKeys={{key:"AIzaSyBUajMUOmaG_OFJFtVI-Fb2rtTQkeWzbUg"}}
                defaultCenter={this.state.center}
                defaultZoom={12}
              >
              {this.state.resp && this.state.resp.map((value, index) =>
                <Marker op={1 - (parseInt(value.price.replace(',','')) - 1500)/1000} key={index.toString()} click={() => this.hoverMarker(index)} lat={value.lat} lng={value.lon} />
              )}
              </GoogleMapReact>
            </div>
              {(this.state.page2 == 0) && (
                <div className="sidebar">
                  {/*Sup bro*/}
                </div>)}
              {(this.state.page2 == 1) && (
                <div className="sidebar sidebar1">
                  <ListGroup.Item>
                  <Card border="dark"  className={"card bg-light text-dark"}>
                    <Card.Header>
                      Information for flats at {this.state.resp[this.state.idx].code}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        Average price: <strong>£{this.state.resp[this.state.idx].price}</strong>
                      </Card.Text>
                      <Card.Text>
                      Distance from <strong>{this.state.loc1}</strong>: <strong>{this.state.resp[this.state.idx].travel_time[0]}</strong>
                    </Card.Text>
                      <Card.Text>
                        Distance from <strong>{this.state.loc2}</strong>: <strong>{this.state.resp[this.state.idx].travel_time[1]}</strong>
                      </Card.Text>
                      <Card.Text>
                        Distance from <strong>{this.state.loc3}</strong>: <strong>{this.state.resp[this.state.idx].travel_time[2]}</strong>
                      </Card.Text>
                      <Button onClick={() => this.findFlats(this.state)} variant="primary">Flats</Button>
                    </Card.Body>
                  </Card>
                  </ListGroup.Item>

                  {this.state.spin && (<div className="spinner"><CircularProgress /></div>)}
                  {this.state.link && this.getFlatInfo()}
                </div>)}
                {(this.state.page2 == 2)  && (<div className="sidebar2">
                    <CardDeck>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Card border="dark" style={{ width: '25rem' }} className={"card bg-light text-dark"}>
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
        {this.state.page1 == 1 && (
            <div>
            <LinearProgress variant="query" />
            <img src={rotate} className="App-logo" alt="logo" />
            </div>
        )}
        {false && (this.state.page1 == 0) && !this.state.page2 && (
            <div>
            <div className="header-wrapper">
                <img src={bluelogo} alt=""/>
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
