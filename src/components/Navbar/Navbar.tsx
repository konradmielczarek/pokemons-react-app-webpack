import React, { Component } from 'react';

// REACTSTRAP
import { Collapse, Form, Input, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';

interface IProps {
  handleSearchFn: any;
}

interface IState {
  isOpen: boolean;
}

class NavBar extends Component<IProps, IState> {
  state = {
    isOpen: false
  };

  toggleNavbar = () => this.setState(
    prevState => ({ isOpen: !prevState.isOpen })
  )

  render() {
    return (
      <Navbar className="navbar-expand-sm" color="primary" dark>
        <NavbarBrand href="/">
          <img src={'http://localhost:3000/images/pokemon-logo.png'} alt="Pokemons" className="logo" />
        </NavbarBrand >
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Form inline onSubmit={e => e.preventDefault()} className="my-2 my-lg-0 ml-auto">
            <Input
              type="search"
              placeholder="Search"
              onChange={this.props.handleSearchFn}
            />
          </Form>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
