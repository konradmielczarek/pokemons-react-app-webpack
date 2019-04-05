import React, { Component } from 'react';

// COMPONENTS
import CustomModal from '../CustomModal/CustomModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import PokemonModalBody from '../CustomModal/ModalsBodies/PokemonModalBody';
import PokemonItem from '../PokemonItem/PokemonItem';

// REACTSTRAP
import { Row } from 'reactstrap';

// MOBX
import { inject, observer } from 'mobx-react';

// TYPES
import { IAppStore } from '../../stores/AppStore';
import { IPokemonItemStore } from '../../stores/PokemonItemStore';

interface IProps {
  appStore?: IAppStore;
  pokemonItemStore?: IPokemonItemStore;
}

interface IState {
  isPokemonModalOpen: boolean;
}

class PokemonsList extends Component<IProps, IState> {
  state = {
    isPokemonModalOpen: false
  };

  togglePokemonModal = () => this.setState(
    prevState => ({ isPokemonModalOpen: !prevState.isPokemonModalOpen })
  )

  getPokemonOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const { pokemonItemStore } = this.props;
    const id: number = parseInt(e.currentTarget.dataset.id!, 10);

    pokemonItemStore!.setPokemonId(id);
  }

  render() {
    const { pokemons } = this.props.appStore!;
    const { isPokemonModalOpen } = this.state;
    const { pokemonData, isLoading } = this.props.pokemonItemStore!;

    return (
      <>
        <CustomModal
          header={!isLoading ? `#${pokemonData.num} ${pokemonData.name}` : ''}
          body={isLoading ? <div className="d-flex justify-content-center p-5"><LoadingSpinner/></div> : <PokemonModalBody pokemon={pokemonData}/>}
          isPokemonModalOpen={isPokemonModalOpen}
          toggle={this.togglePokemonModal}
        />
        <Row>
          {pokemons.map(pokemon  => (
            <PokemonItem
              key={pokemon.id}
              pokemon={pokemon}
              toggleModalFn={this.togglePokemonModal}
              onClickFn={this.getPokemonOnClick}
            />
          ))}
        </Row>
      </>
    );
  }
}

export default inject('appStore', 'pokemonItemStore')(observer(PokemonsList));
